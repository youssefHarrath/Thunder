const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "رفع",
    version: "1.0",
    author: "Your Name",
    role: 0,
    longDescription: {
      en: "رفع جودة الصور",
    },
    category: "Image Processing",
  },

  onStart: async function ({ api, event }) {
    const pathie = path.join(__dirname, "cache", "upscalate_photo.jpg");
    const { threadID, messageID } = event;

    const photoUrl = event.messageReply ? event.messageReply.attachments[0].url : event.args.join(" ");

    if (!photoUrl) {
      api.sendMessage("📸 |يرجى الرد على صورة أو تقديم عنوان URL للصورة للمعالجة والتحسين.", threadID, messageID);
      return;
    }

    try {
      api.sendMessage("🕟 | جاري رفع جودة الصورة ، يرجى الإنتظار...", threadID, messageID);

      const response = await axios.get(`https://for-devs.onrender.com/api/upscale?imageurl=${encodeURIComponent(photoUrl)}&apikey=api1`);
      const processedImageURL = response.data.hazescale;

      const imgResponse = await axios.get(processedImageURL, { responseType: "arraybuffer" });
      const imgBuffer = Buffer.from(imgResponse.data, 'binary');

      fs.writeFileSync(pathie, imgBuffer);

      api.sendMessage({
        body: "✅ | تم رفع جودة الصورة بنجاح",
        attachment: fs.createReadStream(pathie)
      }, threadID, () => fs.unlinkSync(pathie), messageID);
    } catch (error) {
      api.sendMessage(`Error processing image: ${error.message}`, threadID, messageID);
    }
  },
};