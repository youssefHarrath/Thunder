const axios = require("axios");
const fs = require('fs-extra');
const path = require('path');
const { getStreamFromURL, shortenURL, randomString } = global.utils;
const ytdl = require("ytdl-core");
const yts = require("yt-search");

async function sing(api, event, args, message) {
   api.setMessageReaction("🕢", event.messageID, (err) => {}, true);
  try {
    let title = '';

  
    const extractShortUrl = async () => {
      const attachment = event.messageReply.attachments[0];
      if (attachment.type === "video" || attachment.type === "audio") {
        return attachment.url;
      } else {
        throw new Error("Invalid attachment type.");
      }
    };

   
    if (event.messageReply && event.messageReply.attachments && event.messageReply.attachments.length > 0) {
      const shortUrl = await extractShortUrl();
      const musicRecognitionResponse = await axios.get(`https://youtube-music-sooty.vercel.app/kshitiz?url=${encodeURIComponent(shortUrl)}`);
      title = musicRecognitionResponse.data.title;
    } else if (args.length === 0) {
      message.reply(" ⚠️ | أرجوك قم بإدخال إسم الأغنية");
      return;
    } else {
      title = args.join(" ");
    }

 
    const searchResults = await yts(title);
    if (!searchResults.videos.length) {
      message.reply(" ⚠️ | لم يتم إيجاد أغنية بالمسبة الكلمة المعطاة.");
      return;
    }

    const videoUrl = searchResults.videos[0].url;
    const stream = await ytdl(videoUrl, { filter: "audioonly" });

    const fileName = `lado.mp3`;
    const filePath = path.join(__dirname, "cache", fileName);
    const writer = fs.createWriteStream(filePath);

    stream.pipe(writer);

    writer.on('finish', () => {
      const audioStream = fs.createReadStream(filePath);
      message.reply({ body: `🎧 تشغيل : ${title}`, attachment: audioStream });
      api.setMessageReaction("✅", event.messageID, () => {}, true);
    });

    writer.on('error', (error) => {
      console.error("Error:", error);
      message.reply("error");
    });
  } catch (error) {
    console.error("Error:", error);
    message.reply("error");
  }
}

module.exports = {
  config: {
    name: "سبوتيفاي",
    version: "1.0",
    author: "Kshitiz",
    countDown: 10,
    role: 0,
    shortDescription: "قم بتشغيل أغاني عن طريق سبوتيفاي",
    longDescription: "قم بتشغيل أغانيك المفضلة عن كريقة سبوتيفاي",
    category: "وسائط",
    guide: "{p}سبوتيفاي {إسم الأغني } أو رد على أغنية او مقطع بإستخدام {p}سبوتيفاي"
  },
  onStart: function ({ api, event, args, message }) {
    return sing(api, event, args, message);
  }
};