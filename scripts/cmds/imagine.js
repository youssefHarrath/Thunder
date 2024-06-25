const fs = require('fs');
const moment = require("moment-timezone");
const axios = require('axios');

module.exports = {
  config: {
    name: "تخيل",
    version: "1.0.0",
    author: "حسين يعقوبي",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "Nhận quà hàng ngày",
      en: "Generate images using Emi"
    },
    longDescription: {
      vi: "Nhận quà hàng ngày",
      en: "Generate images using Emi"
    }
  },

  translateToEnglish: async function (text) {
    try {
      const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=ar&tl=en&dt=t&q=${encodeURIComponent(text)}`);
      return translationResponse?.data?.[0]?.[0]?.[0];
    } catch (error) {
      console.error(error);
      return "Translation not available";
    }
  },

  onStart: async function ({ api, event, args }) {
    async function sendMessage(msg) {
      api.sendMessage(msg, event.threadID, event.messageID);
    }

    if (!args[0]) return sendMessage(' ⚠️ | قم بإدخال وصف!');

    try {
      const startTime = moment();
      const translatedPrompt = await this.translateToEnglish(args.join(" "));
      const response = await axios.get(`https://apis-samir.onrender.com/imagine?prompt=${encodeURIComponent(translatedPrompt)}`, { responseType: 'arraybuffer' });
      const data = Buffer.from(response.data, "utf8");
      const filePath = __dirname + '/cache/emi.png';
      fs.writeFileSync(filePath, data);

      const endTime = moment();
      const executionTimeSeconds = endTime.diff(startTime, 'seconds');

      const dateString = startTime.format("YYYY-MM-DD");
      const timeString = startTime.format("HH:mm:ss");
      sendMessage({ attachment: fs.createReadStream(filePath, () => fs.unlinkSync(filePath)), body: `✿━━━━━━━━━━━━━━━━━✿\n ✅ | تم التنفيذ \n 📆 | ❏ التاريخ:  『${dateString}』\n 🕒 | الوقت: ${timeString}\n ⏱ | وقت التنفيذ بالثواني: ${executionTimeSeconds} ثانية\n✿━━━━━━━━━━━━━━━━━✿` });
    } catch (error) {
      sendMessage(error.message);
    }
  }
};