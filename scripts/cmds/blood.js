const axios = require("axios");
const Tesseract = require("tesseract.js");

module.exports = {
  config: {
    name: "وصف",
    aliases: ["نص"],
    version: "1.0",
    author: "Allou Mohamed",
    category: "خدمات",
    shortDescription: {
      ar: "إستخراج نص من صورة.",
      en: "get text from photos."
    },
    guide: {
      en: "{pn} رد على صورة.",
      ar: "{pn} رد على صورة."
    }
  },
  langs: {
    en: {
      reply: "قم بالرد على صورة.",
      only: "قم بالرد على صورة."
    },
    ar: {
      reply: "رد على صورة.",
      only: "فقط الصور التي فيها نص إنجليزي."
    }
  },

  onStart: async function ({ message, event, getLang }) {
    try {
      if (!event.messageReply || !event.messageReply.attachments) {
        return message.reply(getLang('reply'));
      }
      const imageAttachment = event.messageReply.attachments[0];
      if (imageAttachment.type !== "photo") {
        return message.reply(getLang('reply'));
      }
      const imageUrl = imageAttachment.url;
      const imageResponse = await axios.get(imageUrl, { responseType: "arraybuffer" });
      const imageBuffer = Buffer.from(imageResponse.data, "binary");
      const { data } = await Tesseract.recognize(imageBuffer, "eng");
      const extractedText = data.text;

      // Translate the extracted text from English to Arabic
      const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(extractedText)}`);
      const translatedText = translationResponse.data[0][0][0];

      message.reply(`${translatedText}`);
    } catch (error) {
      console.error("OCR", error);
      message.reply(getLang('only'));
    }
  }
};
