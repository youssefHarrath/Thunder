const fetch = require("node-fetch");
const axios = require("axios");
const { getPrefix, getStreamFromURL } = global.utils;

module.exports = {
  config: {
    name: "جهاز",
    version: "1.0",
    author: "رشاد",
    countDown: 15,
    role: 0,
    shortDescription: {
      en: "قم بالحصول على معلومات حول جهاز معين.",
    },
    longDescription: {
      en: "استرداد معلومات مفصلة حول الجهاز المحدد.",
    },
    category: "خدمات",
    guide: {
      en: "{pn}جهاز (إسم الجهاز)",
    },
  },
  onStart: async function ({ api, args, event }) {
    const search = args.join(" ");

    if (!search) {
      api.sendMessage(" ⚠️ |يرجى تقديم اسم الجهاز الذي تريد البحث عنه.", event.threadID);
      return;
    }

    try {
      const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(search)}`);
      const translatedQuery = translationResponse?.data?.[0]?.[0]?.[0];

      const searchUrl = `https://for-devs.onrender.com/api/deviceinfo/search?query=${encodeURIComponent(translatedQuery)}&apikey=fuck`;

      api.setMessageReaction("⏱️", event.messageID, (err) => {}, true);

      const searchResponse = await fetch(searchUrl);
      const searchResults = await searchResponse.json();

      if (searchResults.results.length === 0) {
        api.sendMessage(`❌ | لم يتم إيجاد أي معلومات للجهاز '${search}'. أرجوك قم بإدخال إسم جهاز بطريقة مختلفة.`, event.threadID);
        return;
      }

      api.setMessageReaction("✅", event.messageID, (err) => {}, true);

      let replyMessage = "🔍 | نتائج البحث  :\n\n";
      for (let i = 0; i < searchResults.results.length; i++) {
        const device = searchResults.results[i];
        replyMessage += `${i + 1}. ${device.name}\n`;
      }
      replyMessage += "\n ⚜️ | قم بالرد على إسم الجهاز بالرقم من أجل الحصول على معلومات الجهاز المحدد .";

      const reply = await api.sendMessage(replyMessage, event.threadID);
      const replyMessageID = reply.messageID;

      global.GoatBot.onReply.set(replyMessageID, {
        commandName: "جهاز",
        author: event.senderID,
        messageID: replyMessageID,
        results: searchResults.results,
      });
    } catch (error) {
      console.error(error);
      api.sendMessage(" ❌ | حدث خطأ أثناء جلب معلومات الجهاز.", event.threadID);
    }
  },
  onReply: async function ({ api, event, Reply }) {
    const { author, messageID, results } = Reply;

    if (event.senderID !== author) return;

    const selectedNumber = parseInt(event.body);

    if (isNaN(selectedNumber) || selectedNumber <= 0 || selectedNumber > results.length) {
      api.sendMessage(" ❌ | قم بالرد بالرقم الصحيح المرة القادمة.", event.threadID);
      return;
    }

    const selectedDevice = results[selectedNumber - 1];
    const url = selectedDevice.url;
    const infoUrl = `https://for-devs.onrender.com/api/deviceinfo/info?url=${encodeURIComponent(url)}&apikey=fuck`;

    try {
      const infoResponse = await fetch(infoUrl);
      const deviceInfo = await infoResponse.json();

      if (deviceInfo.status === 200) {
        let infoMessage = `📱الجهاز : ${deviceInfo.result.title}\n`;
        infoMessage += `📅 تاريخ الإطلاق : ${deviceInfo.result.releaseDate}\n`;
        infoMessage += `📏 الأبعاد : ${deviceInfo.result.dimensions}\n`;
        infoMessage += `📱 النوع: ${deviceInfo.result.type}\n`;
        infoMessage += `💾 سعة التخزين : ${deviceInfo.result.storage}\n`;
        infoMessage += `🔍 معلومات الشاشة : ${deviceInfo.result.displayInfo}\n`;
        infoMessage += `📏 بوصة الشاشة : ${deviceInfo.result.displayInch}\n`;
        infoMessage += `📷 بيكسلات الكامرا : ${deviceInfo.result.cameraPixel}\n`;
        infoMessage += `🎥 بيكسلات الفيديو : ${deviceInfo.result.videoPixel}\n`;
        infoMessage += `🔒 حجم الذاكرة الحية : ${deviceInfo.result.ramSize}\n`;
        infoMessage += `🧰 معلومات حول الرقاقة : ${deviceInfo.result.chipsetInfo}\n`;
        infoMessage += `🔋 نوع البطارية : ${deviceInfo.result.batteryType}\n`;
        infoMessage += `🔌 العلامة التجارية للبطارية : ${deviceInfo.result.batteryBrand}\n`;

        const image = await getStreamFromURL(deviceInfo.result.thumbnailUrls[0]);

        const msgSend = await api.sendMessage(
          {
            body: infoMessage,
            attachment: image,
          },
          event.threadID
        );
      } else {
        api.sendMessage(" ❌ |عذرًا، لا يمكن استرداد معلومات الجهاز.", event.threadID);
      }
    } catch (error) {
      console.error(error);
      api.sendMessage(" ❌ |حدث خطأ أثناء جلب معلومات الجهاز.", event.threadID);
    }
  },
};
