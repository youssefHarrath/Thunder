const fs = require('fs');
const moment = require("moment-timezone");
const axios = require('axios');

module.exports = {
  config: {
    name: "تخيل3",
    version: "1.0.0",
    author: "حسين يعقوبي",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "Nhận quà hàng ngày",
      en: "توليد صور بصور ثلاثية الأبعاد"
    },
    longDescription: {
      vi: "Nhận quà hàng ngày",
      en: "توليد الصور ثلاثي الابعاد"
    }
  },

  onStart: async function ({ api, event, args }) {
    async function sendMessage(msg) {
      api.sendMessage(msg, event.threadID, event.messageID);
    }
    
    api.setMessageReaction("⏱️", event.messageID, (err) => {}, true);

    
    if (!args[0]) return sendMessage(' ⚠️ | قم بإدخال وصف!');

    try {
      const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=ar&tl=en&dt=t&q=${encodeURIComponent(args.join(" "))}`);
      const translatedQuery = translationResponse?.data?.[0]?.[0]?.[0];

      const response = await axios.get(`https://deku-rest-api.replit.app/render?prompt=${encodeURIComponent(translatedQuery)}`, { responseType: 'arraybuffer' });
      const data = Buffer.from(response.data, "utf8");
      const filePath = __dirname + '/cache/render.png';
      fs.writeFileSync(filePath, data);

      api.setMessageReaction("✅", event.messageID, (err) => {}, true);

      return sendMessage({ attachment: fs.createReadStream(filePath, () => fs.unlinkSync(filePath)) });
    } catch (error) {
      return sendMessage(error.message);
    }
  }
};