const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "تيك",
    author: "حسين يعقوبي",
    version: "1.0",
    cooldowns: 20,
    role: 0,
    shortDescription: "البحث عن مقاطع التيك توك",
    longDescription: "البحث عن مقاطع في التيك توك",
    category: "وسائط",
    guide: "{p}تيك كلمة البحث",
  },
  onStart: async function ({ api, event, args, message }) {
    api.setMessageReaction("🕐", event.messageID, () => {}, true);

    try {
      const query = args.join(" ");
      const apiUrl = `https://hiroshi-api-hub.replit.app/tool/search?q=${encodeURIComponent(query)}`;
      const response = await axios.get(apiUrl);

      if (response.data.code === 0 && response.data.data.videos.length > 0) {
        const videoUrl = response.data.data.videos[0].play;
        const videoFileName = `${response.data.data.videos[0].video_id}.mp4`;

        const tempVideoPath = path.join(__dirname, "cache", videoFileName);
        const writer = fs.createWriteStream(tempVideoPath);

        const videoResponse = await axios.get(videoUrl, { responseType: "stream" });
        videoResponse.data.pipe(writer);

        writer.on("finish", () => {
          const videoStream = fs.createReadStream(tempVideoPath);
          message.reply({ attachment: videoStream });
          api.setMessageReaction("✅", event.messageID, () => {}, true);
        });
      } else {
        message.reply(" ⚠️ |لم يتم العثور على مقاطع فيديو TikTok للاستعلام المحدد.");
        api.setMessageReaction("❌", event.messageID, () => {}, true);
      }
    } catch (error) {
      console.error(error);
      message.reply(" ❌ |عذرا، حدث خطأ أثناء معالجة طلبك.");
  }
}
};