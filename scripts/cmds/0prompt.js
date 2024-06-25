const fs = require('fs');
const moment = require("moment-timezone");
const axios = require('axios');

module.exports = {
  config: {
    name: "أرسم",
    version: "1.1",
    author: "حسين يعقوبي",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "Nhận quà hàng ngày",
      en: "قم بخاا وصف من اجل توليد الصور"
    },
    longDescription: {
      vi: "Nhận quà hàng ngày",
      en: "قم بتوليد الصور بإستخدام الوصف"
    }
  },

  onStart: async function ({ api, event, args }) {
    async function sendMessage(msg) {
      api.sendMessage(msg, event.threadID, event.messageID);
    }
    
    api.setMessageReaction("⏱️", event.messageID, (err) => {}, true);
    const promptAndStyleList = `\t\t•——[النماذج المتاحة]——•\n\n1. سينيمائية\n2. فوتوغرافيه\n3. أنمي\n4. مانغا\n5. الفن الإفتراضي\n6. بيكسل فن\n7. الفن الفنتازي\n8. نيون بانك\n9. ثلاثي الأبعاد`;

    if (!args[0]) return sendMessage(promptAndStyleList);

    const [prompt, style] = args.join(" ").split("|").map(item => item.trim());

    if (!prompt) return sendMessage(' ⚠️ | قم بإخال وصف');
    if (!style) return sendMessage(` ⚠️ | نموذج غير صالح \n\n${promptAndStyleList}`);

    try {
      const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=ar&tl=en&dt=t&q=${encodeURIComponent(prompt)}`);
      const translatedQuery = translationResponse?.data?.[0]?.[0]?.[0];

      const response = await axios.get(`https://deku-rest-api.replit.app/sdxl?prompt=${translatedQuery}&styles=${style}`, { responseType: 'arraybuffer' });
      const data = Buffer.from(response.data, "utf8");
      const filePath = __dirname + '/cache/sdxl.png';
      fs.writeFileSync(filePath, data);

      api.setMessageReaction("✅", event.messageID, (err) => {}, true);
      return sendMessage({ attachment: fs.createReadStream(filePath, () => fs.unlinkSync(filePath)) });
    } catch (error) {
      return sendMessage(error.message);
    }
  }
};