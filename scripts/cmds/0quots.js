const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "إقتباس_أنمي",
    aliases: ["aniquotes"],
    author: "Kshitiz",
    version: "1.0",
    cooldowns: 5,
    role: 0,
    shortDescription: "يرسل مقطع انمي مع إقتباس",
    longDescription: "قم بالحصول على فيديوهات من إقتباسات الأنمي",
    category: "أنمي",
    guide: "{p}إقتباس_أنمي",
  },

  onStart: async function ({ api, event, args, message }) {
    api.setMessageReaction("🕐", event.messageID, (err) => {}, true);

    try {
      const response = await axios.get(`https://aniquotes-vdo.onrender.com/kshitiz`, { responseType: "stream" });

      const tempVideoPath = path.join(__dirname, "cache", `${Date.now()}.mp4`);

      const writer = fs.createWriteStream(tempVideoPath);
      response.data.pipe(writer);

      writer.on("finish", async () => {
        const stream = fs.createReadStream(tempVideoPath);

        message.reply({
          body: `🌟 | إقتباس أنمي :`,
          attachment: stream,
        });

        api.setMessageReaction("✅", event.messageID, (err) => {}, true);
      });
    } catch (error) {
      console.error(error);
      message.reply("Sorry, an error occurred while processing your request.");
    }
  }
};