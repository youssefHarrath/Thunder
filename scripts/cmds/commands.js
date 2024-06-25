const axios = require("axios");

const config = {
  name: "نسخ",
  aliases: ["ts"],
  version: "1.1",
  author: "Samir Œ",
  countDown: 10,
  role: 0,
  shortDescription: {
    en: "نسخ الصوت إلى نص"
  },
  longDescription: {
    en: "يحول الكلام إلى نص باستخدام Google Cloud Speech-to-Text API."
  },
  category: "الذكاء الإصطناعي",
  guide: {
    en: "{pn} قم بالرد على أوديو أو فيديو"
  }
};

const onStart = async function({ event, api, message }) {
  try {
    if (!event.messageReply.attachments || event.messageReply.attachments.length === 0) {
      return message.reply(' ⚠️ | قم بالرد على فيديو أو أوديو من أجل النسخ');
    }

    const link = event.messageReply.attachments[0].url;
    const response = await axios.get(`https://api-samir.onrender.com/transcribe?url=${encodeURIComponent(link)}`);
    const text = response.data.transcript;

    if (text) {
      message.reply({
        body: text
      });
    } else {
      message.reply(" ❌ |فشل في نسخ الصوت أو الفيديو.");
    }
  } catch (error) {
    console.error(error);
    message.reply(" ❌ |حدث خطأ أثناء معالجة الطلب.");
  }
};

module.exports = {
  config,
  onStart
};