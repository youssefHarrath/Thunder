const axios = require("axios");

module.exports = {
  config: {
    name: "ميدو",
    version: "1.0",
    author: "Riley Nelson", // لا تغيير أو سأحرق الAPI
    countDown: 5,
    role: 0,
    shortDescription: {
      id: "Perintah untuk berinteraksi dengan AI Pemula",
      en: "أمر للتفاعل مع المبتدئين AI"
    },
    longDescription: {
      id: "Perintah ini mengirim pertanyaan atau kueri ke AI Pemula dan mengembalikan jawabannya.",
      en: "يرسل هذا الأمر سؤالاً أو استعلامًا إلى الذكاء الاصطناعي المبتدئ ويعيد الإجابة."
    },
    category: "الذكاء الإصطناعي ",
    guide: {
      id: "Penggunaan: !beginnerai [pertanyaan atau kueri]",
      en: "{p} ميدوريا [سؤال أو إستعلام]"
    }
  },

  onStart: async function ({ api, args, message, event, usersData }) {
    const userID = event.senderID;
    const userName = await usersData.getName(userID);

    const response = args.join(" ");

    if (args.length === 0) {
      message.reply(" ⚠️ | يمكنك طرح السؤال في الوقت الذي تريد وسأسعى جاهدا للأجابة عليه.");
      return;
    }

    const typingIndicator = api.sendTypingIndicator(event.threadID);

    try {
      const c = response;
      const { data } = await axios.get(`https://markdevs69-1efde24ed4ea.herokuapp.com/api/v3/gpt4?ask=${encodeURIComponent(c)}`);

      typingIndicator();

      const replyMessage = data.answer;
      message.reply(replyMessage);
    } catch (error) {
      console.error("❌ | حدث خطأ:", error.message);
      typingIndicator();
      message.reply(`❌ | حدث خطأ: ${error.message}`);
    }
  }
};
