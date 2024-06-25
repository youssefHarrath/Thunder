const fs = require("fs");
const path = require("path");
const axios = require("axios");
const tinyurl = require('tinyurl');

module.exports = {
  config: {
    name: "بيكسر",
    aliases: [],
    version: "1.0",
    author: "Kshitiz",
    countDown: 20,
    role: 0,
    shortDescription: "صورة إلى صورة أخرى تماما",
    longDescription: "صورة إلى صورة",
    category: "خدمات",
    guide: {
      en: "{p}بيكسر رد على صورة"
    }
  },
  onStart: async function ({ message, event, args }) {
    try {
      const promptApiUrl = "https://www.api.vyturex.com/describe?url="; // api credit Jarif
      const pixartApiUrl = "https://ai-tools.replit.app/pixart";

      if (event.type !== "message_reply") {
        return message.reply("⚠️ | المرجو الرد على صورة.");
      }

      const attachment = event.messageReply.attachments[0];
      if (!attachment || !["photo", "sticker"].includes(attachment.type)) {
        return message.reply("⚠️ | يجب علىك الرد على صورة ليس شيئا آخر.");
      }

     
      const imageUrl = await tinyurl.shorten(attachment.url);

   
      const promptResponse = await axios.get(promptApiUrl + encodeURIComponent(imageUrl));
      let prompt = promptResponse.data;

     
      const [promptArg, styleArg] = args.join(" ").split("|").map(item => item.trim());

     
      if (promptArg) {
        prompt = promptArg;
      }

      
      let style = 3;
      if (styleArg) {
        style = parseInt(styleArg);
      }

      
      const pixartResponse = await axios.get(pixartApiUrl, {
        params: {
          prompt: prompt,
          styles: style
        },
        responseType: "arraybuffer"
      });

     
      const cacheFolderPath = path.join(__dirname, "/cache");
      if (!fs.existsSync(cacheFolderPath)) {
        fs.mkdirSync(cacheFolderPath);
      }
      const imagePath = path.join(cacheFolderPath, `${Date.now()}_generated_image.png`);
      fs.writeFileSync(imagePath, Buffer.from(pixartResponse.data, "binary"));

    
      const stream = fs.createReadStream(imagePath);
      message.reply({
        body: "",
        attachment: stream
      });

    } catch (error) {
      console.error("Error:", error);
      message.reply("❌ | حدث خطأ. الرجاء معاودة المحاولة في وقت لاحق.");
    }
  }
};