const fs = require("fs");
const path = require("path");
const axios = require("axios");
const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "أرسم2",
    aliases: [],
    author: "Vex-Kshitiz",
    version: "1.0",
    cooldowns: 20,
    role: 0,
    shortDescription: "توليد صور",
    longDescription: "توليد صور من خلال البرومبت",
    category: "الذكاء الإصطناعي",
    guide: "{p}أرسم2 <إستفسار>",
  },
  onStart: async function ({ message, args, api, event }) {
    api.setMessageReaction("⚙️", event.messageID, (err) => {}, true);
    try {
      const prompt = args.join(" ");
      
      // ترجمة النص من العربية إلى الإنجليزية
      const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=ar&tl=en&dt=t&q=${encodeURIComponent(prompt)}`);
      const translatedPrompt = translationResponse?.data?.[0]?.[0]?.[0] || prompt;

      const replicateApiUrl = `https://gen-img-two.vercel.app/replicate?prompt=${encodeURIComponent(translatedPrompt)}`;

      const response = await axios.get(replicateApiUrl);

      const imageUrl = response.data[0].url;

      const cacheFolderPath = path.join(__dirname, "/cache");
      if (!fs.existsSync(cacheFolderPath)) {
        fs.mkdirSync(cacheFolderPath);
      }

      const imagePath = path.join(cacheFolderPath, `image.png`);
      const imageStream = fs.createWriteStream(imagePath);

      const imageResponse = await axios.get(imageUrl, {
        responseType: "stream"
      });

      imageResponse.data.pipe(imageStream);

      imageStream.on("finish", () => {
        const dateString = moment().format("YYYY-MM-DD");
        const timeString = moment().format("HH:mm:ss");
        const executionTime = Math.floor(process.uptime());
        
api.setMessageReaction("✓", event.messageID, (err) => {}, true);


        message.reply({
          body: `✿━━━━━━━━━━━━━━━━━✿\n 🌸 | تفضل النتيجة \n 📅 | التاريخ: ${dateString} \n 🕒 | الوقت: ${timeString}\n ⏳ | وقت التنفيذ: ${executionTime} ثانية\n✿━━━━━━━━━━━━━━━━━✿`,
          attachment: fs.createReadStream(imagePath)
        });
      });
    } catch (error) {
      console.error("Error:", error);
      message.reply("❌ | حدث خطأ أثناء توليد الصورة.");
    }
  }
};