const axios = require('axios');

module.exports = {
  config: {
    name: "نص",
    version: "1.0",
    author: "Samir Œ",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "قم بإنشاء نص بطريقة صورة متحركة"
    },
    longDescription: {
      vi: "",
      en: "إنشاء نص بطريقة صورة متحركة"
    },
    category: "خدمات",
    guide: {
      vi: "{pn} < text >",
      en: "{pn} < نص"
    }
  },

  onStart: async function ({ api, event, args, message }) {
    const text = args.join(" ");
    if (!text) {
      return message.reply(" ⚠️ | أرجوك قم بإدخال نص.");
    }
   
    message.reply(" ⏱️ |جارٍ تهيئة الصورة، يرجى الانتظار...", async (err, info) => {
      let id = info.messageID;
      try {
        const API = `https://gif.samirzyx.repl.co/t2g?q=${encodeURIComponent(text)}`;
        const imageStream = await global.utils.getStreamFromURL(API);
        message.unsend(id);
        message.reply({
          body: `  `,
          attachment: imageStream
        }, async (err, info) => {
        });
      } catch (error) {
        console.error(error);
        api.sendMessage(` ❌ | خطأ: ${error}`, event.threadID);
      }
    });
  }
};