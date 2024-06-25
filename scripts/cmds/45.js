const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "تطقيم",
    aliases: ["cdp"],
    version: "1.0",
    author: "حسين يعقوبي",
    role: 0,
    longDescription: "إزواج من الصور الأنمي",
    shortDescription: "إزواج من الصور الأنمي",
    cooldown: 5000, // فترة تبريد بالمللي ثانية
    category: "حب",
  },

  onStart: async function ({ api, event }) {
    try {
      const response = await axios.get("https://deku-rest-api.replit.app/cdp");

      if (!response.data.result || !response.data.result.one || !response.data.result.two) {
        throw new Error("لا توجد بيانات صالحة للصور");
      }

      const imageUrl1 = response.data.result.one;
      const imageUrl2 = response.data.result.two;

      const image1Response = await axios.get(imageUrl1, { responseType: "arraybuffer" });
      const image2Response = await axios.get(imageUrl2, { responseType: "arraybuffer" });

      const path1 = path.join(__dirname, "cache", "anime_pair_1.jpg");
      const path2 = path.join(__dirname, "cache", "anime_pair_2.jpg");

      fs.writeFileSync(path1, Buffer.from(image1Response.data, "binary"));
      fs.writeFileSync(path2, Buffer.from(image2Response.data, "binary"));

      const message = {
        body: '✿━━━━━━━━━━━━━━━━━✿\n\t\t「 إليك التطقيم الخاص بك ✨ 」\n✿━━━━━━━━━━━━━━━━━✿',
        attachment: [
          fs.createReadStream(path1),
          fs.createReadStream(path2)
        ],
      };

      await api.sendMessage(message, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("حدث خطأ أثناء جلب الصور.", event.threadID);
    }
  },
};