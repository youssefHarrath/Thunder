const axios = require("axios");
const fs = require("fs-extra");

module.exports = {

  config: {
    name: 'إقتراح',
    version: '1.0',
    author: 'Kshitiz',
    countDown: 20,
    role: 0,
    shortDescription: 'توصيات أنمي حسب النوع',
    longDescription: '',
    category: 'وسائط',
    guide: {
      en: '{p}anime {genre}:- شونين | سينين | ايسيكاي',
    }
  },

  onStart: async function ({ api, event, message }) {
    const messageBody = event.body.toLowerCase().trim();
    if (messageBody === 'anime') {
      await message.reply('الرجاء تحديد النوع.\n{p}anime {genre}:- شونين | سينين | ايسيكاي');
      return;
    }

    let genre;
    if (messageBody.includes('شونين')) {
      genre = 'shonen';
    } else if (messageBody.includes('سينين')) {
      genre = 'seinen';
    } else if (messageBody.includes('ايسيكاي')) {
      genre = 'isekai';
    } else {
      await message.reply('الرجاء تحديد النوع.\n{p}anime {genre}:- شونين | سينين | ايسيكاي');
      return;
    }

    try {
      const loadingMessage = await message.reply('جاري تحميل توصيات الأنمي...');

      const apiUrl = `https://anime-reco.vercel.app/anime?genre=${genre}`;
      const response = await axios.get(apiUrl);

      if (response.data.anime && response.data.videoLink) {
        const animeName = response.data.anime;
        const videoUrl = response.data.videoLink;

        console.log(`${animeName}`);
        console.log(`${videoUrl}`);

        const cacheFilePath = __dirname + `/cache/anime_${Date.now()}.mp4`;
        await this.downloadVideo(videoUrl, cacheFilePath);

        if (fs.existsSync(cacheFilePath)) {
          await message.reply({
            body: `أنمي موصى به: ${animeName}`,
            attachment: fs.createReadStream(cacheFilePath),
          });

          fs.unlinkSync(cacheFilePath);
        } else {
          message.reply("حدث خطأ أثناء تحميل الفيديو.");
        }
      } else {
        message.reply("مشكلة في الواجهة البرمجية للتطبيق (API).");
      }

      await message.unsend(loadingMessage.messageID);
    } catch (err) {
      console.error(err);
      message.reply("حدث خطأ أثناء معالجة أمر الأنمي.");
    }
  },

  downloadVideo: async function (url, cacheFilePath) {
    try {
      const response = await axios({
        method: "GET",
        url: url,
        responseType: "stream"
      });

      const writer = fs.createWriteStream(cacheFilePath);
      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });
    } catch (err) {
      console.error(err);
    }
  },
};