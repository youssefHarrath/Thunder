const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "شوتي",
    aliases: [],
    author: "Kshitiz",
    version: "1.0",
    cooldowns: 10,
    role: 0,
    shortDescription: "قم بالحصول على مجموعة من مقاطع شوتي  ",
    longDescription: "قم بالحصول على مجموعة من مقاطع شوتي ",
    category: "متعة",
    guide: "{p}شوتي",
  },

  onStart: async function ({ api, event, args, message }) {

    
    api.setMessageReaction("🕐", event.messageID, (err) => {}, true);

    try {
      const response = await axios.get(`https://wifey-97gf.onrender.com/kshitiz`, { responseType: "stream" });

      const tempVideoPath = path.join(__dirname, "cache", `${Date.now()}.mp4`);

      const writer = fs.createWriteStream(tempVideoPath);
      response.data.pipe(writer);

      writer.on("finish", async () => {
        const stream = fs.createReadStream(tempVideoPath);

        message.reply({
          body: ` 🌟 | مقطع شوتي | 🌟 `,
          attachment: stream,
        });

        api.setMessageReaction("✅", event.messageID, (err) => {}, true);
      });
    } catch (error) {
      console.error(error);
      message.reply(" ❌ |عذرا، حدث خطأ أثناء معالجة طلبك.");
    }
  }
};