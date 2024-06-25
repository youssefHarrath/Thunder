const fs = require("fs");
const path = require("path");
const axios = require("axios");
const tinyurl = require('tinyurl');

module.exports = {
  config: {
    name: "تلوين",
    aliases: [],
    version: "1.0",
    author: "Kshitiz",
    countDown: 20,
    role: 0,
    shortDescription: "قم بتوليد صور بإستخدام الوصف.",
    longDescription: "قم بتوليد صور الأنمي إنطلاقا من الوصف او رد على صورة",
    category: "الذكاء الإصطناعي",
    guide: {
      en: "{p}أرسم [الوصف] | [النموذج]"
    }
  },
  onStart: async function ({ message, event, args, api }) {
    try {
      let imageUrl = null;
      let prompt = '';

      if (event.type === "message_reply") {
        const attachment = event.messageReply.attachments[0];
        if (!attachment || !["photo", "sticker"].includes(attachment.type)) {
          return message.reply(" ⚠️ | قم بالرد على صورة ");
        }
        imageUrl = attachment.url;
      } else if (args.length > 0 && args[0].startsWith("http")) {
        imageUrl = args[0];
      } else if (args.length > 0) {
        const translatedPrompt = await translateToEnglish(args.join(" ").trim());
        prompt = translatedPrompt || args.join(" ").trim();
      } else {
        return message.reply(" ⚠️ |  قم بالرد على صورة");
      }

      if (imageUrl) {
        const shortUrl = await tinyurl.shorten(imageUrl);
        const promptResponse = await axios.get(`https://www.api.vyturex.com/describe?url=${encodeURIComponent(shortUrl)}`);
        prompt = promptResponse.data;
      }

      const promptApiUrl = `https://text2image-wine.vercel.app/kshitiz?prompt=${encodeURIComponent(prompt)}&model=1`;
      const response = await axios.get(promptApiUrl);
      const { task_id } = response.data;

      const progressApiUrl = `https://progress-black.vercel.app/progress?imageid=${task_id}`;

      let imgDownloadLink = null;

      while (!imgDownloadLink) {
        const progressResponse = await axios.get(progressApiUrl);
        const { status, imgs } = progressResponse.data.data;

        if (status === 2 && imgs && imgs.length > 0) {
          imgDownloadLink = imgs[0];
        }

        await new Promise(resolve => setTimeout(resolve, 5000));
      }

      const cacheFolderPath = path.join(__dirname, "/cache");
      if (!fs.existsSync(cacheFolderPath)) {
        fs.mkdirSync(cacheFolderPath);
      }
      const imagePath = path.join(cacheFolderPath, `${task_id}.png`);
      const writer = fs.createWriteStream(imagePath);
      const imageResponse = await axios({
        url: imgDownloadLink,
        method: 'GET',
        responseType: 'stream'
      });

      imageResponse.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });

      api.setMessageReaction("✅", event.messageID, (err) => {}, true);

      const stream = fs.createReadStream(imagePath);
      await message.reply({
        body: "✿━━━━━━━━━━━━━━━━━✿\n\t\t 🧿 | تفضل النتيجة  : \n✿━━━━━━━━━━━━━━━━━✿",
        attachment: stream
      });

    } catch (error) {
      console.error("Error:", error.message);
      message.reply("❌ | An error occurred. Please try again later.");
    }
  }
};

async function translateToEnglish(text) {
  try {
    const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=ar&tl=en&dt=t&q=${encodeURIComponent(text)}`);
    return translationResponse?.data?.[0]?.[0]?.[0];
  } catch (error) {
    console.error("Translation Error:", error.message);
    return null;
  }
}
