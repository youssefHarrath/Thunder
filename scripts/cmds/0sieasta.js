const axios = require('axios');

module.exports = {
  config: {
    name: "رمضان",
    version: "1.0",
    author: "tanvir",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: 'قم بالحصول على مواقيت رمضان'
    },
    longDescription: {
      en: "قم بالحصول على مواقيت رمضان لدولة عربية معينة"
    },
    category: "إسلام",
    guide: {
      en: "{pn} [إسم المدينة]"
    },
  },
  onStart: async function({ api, event, args, message }) {
    try {
      const q = args.join(" ");
      if (!q) {
        return message.reply("⚠ | المرجو إدخال إسم المدينة.");
      }
      const translatedQuery = await translateText(q, 'ar', 'en');
      const searchRes = await axios.get(`https://ramadan-ap-98285332150d.herokuapp.com/search?city=${encodeURIComponent(translatedQuery)}`);
      const results = searchRes.data;
      if (results.length === 0) {
        return message.reply("⚠ | لم يتم إيجاد الوقت بالنسبة لإسم المدينة المعطى .");
      }
      const resList = results.map((result, index) => `${index + 1}. ${result.name}, ${result.country}.`).join('\n');
      message.reply({
        body: `${resList}\n\n 👑 | قم بالرد على رقم الخدينة للخصول على وقت رمضان بتلك الدولة.`,
      }, async (err, info) => {
        const replyHandler = {
          commandName: this.config.name,
          messageID: info.messageID,
          results
        };
        global.GoatBot.onReply.set(info.messageID, replyHandler);
      });
    } catch (error) {
      console.error(error);
      message.reply(`✖ | حدث خطأ.`);
    }
  },
  onReply: async function({ api, event, Reply, args, message }) {
    try {
      const reply = args[0].toLowerCase();
      const { messageID, results } = Reply;
      if (!isNaN(reply) && reply >= 1 && reply <= results.length) {
        const chosenCity = results[reply - 1];
        message.unsend(Reply.messageID);
        const calendarRes = await axios.get(`https://ramadan-ap-98285332150d.herokuapp.com/get/result?id=${chosenCity.id}`);
        const calendarData = calendarRes.data;
        const processedCl = {
          city: calendarData.location,
          date: calendarData.date,
          sehri: calendarData.sehri,
          iftar: calendarData.iftar,
          sehriMessage: calendarData.sehri_message,
          iftarMessage: calendarData.iftar_message,
        };

        await sendMessage(processedCl, message, event, calendarData.image);
      }
    } catch (error) {
      console.error(error);
      message.reply(`❌ | Error occurred.`);
    }
  },
};

async function translateText(text, sourceLang, targetLang) {
  try {
    const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
    return translationResponse?.data?.[0]?.[0]?.[0];
  } catch (error) {
    console.error("Error translating text:", error);
    return text;
  }
}

async function sendMessage(processedCl, message, event, imageUrl) {
  message.reply({
    body: ` 💟 | مواقيت رمضان بالنسبة ل  ${processedCl.city}\n\n• التاريخ 📆: ${processedCl.date}\n• ${processedCl.sehriMessage}: ${processedCl.sehri}\n• ${processedCl.iftarMessage}: ${processedCl.iftar}`,
    attachment: await axios.get(imageUrl, { responseType: 'stream' }).then(response => response.data),
  });
}
