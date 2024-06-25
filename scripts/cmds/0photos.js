const axios = require("axios");
const path = require("path");

module.exports = {
  config: {
    name: "صور",
    aliases: ["فوتو"],
    version: "1.0",
    author: "حسين يعقوبي",
    role: 0,
    countDown: 60,
    longDescription: {
      en: "يتيح لك هذا الأمر البحث عن الصور على بانتريس بناءً على استعلام محدد واسترداد عدد معين من الصور."
    },
    category: "وسائط",
    guide: {
      en: "{pn} <إسم كلمة البحث>\nمثال : {pn} قطة"
    }
  },

  onStart: async function ({ api, event, args }) {
    try {
      api.setMessageReaction("⏱️", event.messageID, (err) => {}, true);
      const fs = require("fs-extra");

      const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=ar&tl=en&dt=t&q=${encodeURIComponent(args.join(" "))}`);
      const translatedText = translationResponse.data[0][0][0];

      const keySearch = translatedText;

      const keySearchs = keySearch;
      const numberSearch = 20; // تحديد عدد الصور ليكون 12 تلقائيًا

      const apiUrl = `https://turtle-apis.onrender.com/api/pinterest?search=${encodeURIComponent(keySearchs)}&keysearch=${numberSearch}`;

      const res = await axios.get(apiUrl);
      const data = res.data.images;
      const imgData = [];

      for (let i = 0; i < Math.min(numberSearch, data.length); i++) {
        const imgResponse = await axios.get(data[i], {
          responseType: "arraybuffer"
        });
        const imgPath = path.join(__dirname, "cache", `${i + 1}.jpg`);
        await fs.outputFile(imgPath, imgResponse.data);

        api.setMessageReaction("✅", event.messageID, (err) => {}, true);
        imgData.push(fs.createReadStream(imgPath));
      }

      await api.sendMessage({
        attachment: imgData,
      }, event.threadID, event.messageID);

      await fs.remove(path.join(__dirname, "cache"));
    } catch (error) {
      console.error(error);
      return api.sendMessage(
        `An error occurred.`,
        event.threadID,
        event.messageID
      );
    }
  }
};
