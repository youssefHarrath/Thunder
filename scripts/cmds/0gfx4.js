
const axios = require('axios');

module.exports = {
  config: {
    name: "تصميم4",
    version: "1.0",
    author: "Samir.",
    countDown: 10,
    role: 0,
    shortDescription: "قم بإنشاء تصميم خاص بك",
    longDescription: "قم بتصميم خاص بك",
    category: "خدمات",
    guide: {
      en: "{p}{n} الإسم الشخصي | الإسم العائلي",
    }
  },

  onStart: async function ({ message, event, api }) {
    const info = event.body.slice(event.body.indexOf(' ') + 1);
    if (!info) {
      return message.reply(" ⚠️ | المرجو ادخال الأمر بهذه الطريقة :\nتصميم4  الإشم الشخصي | الإسم العائلي");
    }

    const [text, text1] = info.split("|").map((item) => item.trim());

    await message.reply(" ⏱️ | جاري معالجة طلبك المرجو الإنتظار...");

    const img = `https://tanjiro-api.onrender.com/gfx4?text=${text}&text2=${text1}&api_key=tanjiro`;
    const form = {
      body: " ✅ | تم إنشاء التصميم بنجاح",
      attachment: [await global.utils.getStreamFromURL(img)]
    };

    message.reply(form);
  }
};