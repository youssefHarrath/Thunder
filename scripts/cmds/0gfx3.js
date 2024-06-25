
const axios = require('axios');

module.exports = {
  config: {
    name: "تصميم3",
    version: "1.0",
    author: "Samir.",
    countDown: 10,
    role: 0,
    shortDescription: "قم بإنشاء تصميم خاص بك",
    longDescription: "قم بإنشاء تصميم خاص بك",
    category: "خدمات",
    guide: {
      en: "{p}{n} الإسم الشخصي | الإسم العائلي",
    }
  },

  onStart: async function ({ message, event, api }) {
    const info = event.body.slice(event.body.indexOf(' ') + 1);
    if (!info) {
      return message.reply(" ⚠️ | أرجوك قم بإدخال الأمر بهذه الصيغة :\nتصميم3  الإسم الشخصي | الإسم العائلي");
    }

    const [text, text1] = info.split("|").map((item) => item.trim());

    await message.reply(" ⏱️ | جاري معالجة طلبك يرجى الإنتظار...");

    const img = `https://tanjiro-api.onrender.com/gfx3?text=${text}&text2=${text1}&api_key=tanjiro`;
    const form = {
      body: " ✅ | تم الإنتهاء من التصميم",
      attachment: [await global.utils.getStreamFromURL(img)]
    };

    message.reply(form);
  }
};