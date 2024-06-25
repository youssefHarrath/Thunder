const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "أنميات",
    aliases: ["أنيمي_الجمالية"],
    author: "Kshitiz",
    version: "1.0",
    cooldowns: 5,
    role: 0,
    shortDescription: "قم بالحصول على أنمي جميل ومؤثر",
    longDescription: "قم بتنزيف وغسل عينيك بمقاطع الأنمي الهادئة والجميلة.",
    category: "أنمي",
    guide: "{p}أنميات",
  },

  onStart: async function ({ api, event, args, message }) {
    api.setMessageReaction("🕐", event.messageID, (err) => {}, true);

    try {
      const response = await axios.get(`https://lofi-anime.onrender.com/kshitiz`, { responseType: "stream" });

      const tempVideoPath = path.join(__dirname, "cache", `${Date.now()}.mp4`);

      const writer = fs.createWriteStream(tempVideoPath);
      response.data.pipe(writer);

      writer.on("finish", async () => {
        const stream = fs.createReadStream(tempVideoPath);

        message.reply({
          body: `تمتع بجمالية المقطع 🤩`,
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