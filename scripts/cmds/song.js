const axios = require("axios");
const fs = require("fs-extra");
const ytdl = require("ytdl-core");
const yts = require("yt-search");

module.exports = {
  config: {
    name: "أغنية2",
    version: "1.0",
    author: "JARiF",
    countDown: 5,
    role: 0,
    category: "وسائط"
  },

  onStart: async function({ event, api }) { 
    const input = event.body;
    const text = input.substring(12);
    const data = input.split(" ");

    if (data.length < 2) {
      return api.sendMessage("المرجو وضع إسم الأغنية", event.threadID);
    }

    data.shift();
    const song = data.join(" ");

    try {
      api.sendMessage(` ⏱️ |جاري البحث عن الأغتية المطلوبة"${song}". المرجو الإنتظار...`, event.threadID);

      const res = await axios.get(`https://api.heckerman06.repl.co/api/other/lyrics2?song=${encodeURIComponent(song)}`);
      const lyrics = res.data.lyrics || "غير معثور عليها!";
      const title = res.data.title || "غير معثور عليها!";
      const artist = res.data.artist || "غير معثور عليها!";

      const searchResults = await yts(song);
      if (!searchResults.videos.length) {
        return api.sendMessage("خطأ: طلب غير صالح.", event.threadID, event.messageID);
      }

      const video = searchResults.videos[0];
      const videoUrl = video.url;

      const stream = ytdl(videoUrl, { filter: "audioonly" });

      const fileName = `${event.senderID}.mp3`;
      const filePath = __dirname + `/cache/${fileName}`;

      stream.pipe(fs.createWriteStream(filePath));

      stream.on('response', () => {
        console.info('[DOWNLOADER]', 'جاري بدأ النزيل.......📩!');
      });

      stream.on('info', (info) => {
        console.info('[DOWNLOADER]', `تم التنزيل ✅ ${info.videoDetails.title} بواسطة ${info.videoDetails.author.name}`);
      });

      stream.on('end', () => {
        console.info('[DOWNLOADER] تم التنزيل ✅');

        if (fs.statSync(filePath).size > 26214400) {
          fs.unlinkSync(filePath);
          return api.sendMessage('[خطأ] لا يمكن إرسال الملف لأنه أكبر من 25ميغابايت.', event.threadID);
        }

        const message = {
          body: `استمتع بالموسيقى الخاصة بك مع ميدوريا UwU <3\n\nالعنوان: ${title}\nالفنان: ${artist}\n\nالكلمات: ${lyrics}`,
          attachment: fs.createReadStream(filePath)
        };

        api.sendMessage(message, event.threadID, () => {
          fs.unlinkSync(filePath);
        });
      });
    } catch (error) {
      console.error('[ERROR]', error);
      api.sendMessage('حدث خطأ أثناء معالجة الأمر.', event.threadID);
    }
  }
};