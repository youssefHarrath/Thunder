const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
  config: {
    name: "صورة",
    aliases: [],
    author: "kshitiz",
    version: "2.0",
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: "ابحث عن خلفيات استنادًا إلى كلمة مفتاح."
    },
    category: "صور",
    guide: {
      ar: "{p}ws <الكلمة المفتاحية> [الكمية]\nمثال: {p}ألبوم طبيعة 3"
    }
  },
  onStart: async function ({ api, event, args }) {
    if (args.length < 1) {
      api.sendMessage(' ⚠️ |يرجى توفير كلمة  للبحث عن البوم الصور.', event.threadID, event.messageID);
      return;
    }

    const keyword = await translateToEnglish(args[0]);
    let amount = args[1] || 1;

    amount = parseInt(amount);
    if (isNaN(amount) || amount <= 0) {
      api.sendMessage(' ⚠️ |يرجى توفير عدد صحيح إيجابي صحيح للكمية.', event.threadID, event.messageID);
      return;
    }

    try {
      await fs.ensureDir('cache');

      const response = await axios.get(`https://antr4x.onrender.com/get/searchwallpaper?keyword=${keyword}`);

      if (response.data.status && response.data.img.length > 0) {
        amount = Math.min(amount, response.data.img.length);

        const imgData = [];
        for (let i = 0; i < amount; i++) {
          const image = response.data.img[i];
          const imageName = `wallpaper_${i + 1}.jpg`;
          const imagePath = path.join('cache', imageName);

          try {
            const imageResponse = await axios.get(image, { responseType: 'arraybuffer' });
            await fs.writeFile(imagePath, Buffer.from(imageResponse.data, 'binary'));
            imgData.push(imagePath);
          } catch (error) {
            console.error("حدث خطأ أثناء تنزيل الصورة:", error);
            api.sendMessage('حدث خطأ أثناء تنزيل الصور. يرجى المحاولة مرة أخرى في وقت لاحق.', event.threadID, event.messageID);
            return;
          }
        }

        api.sendMessage({
          attachment: imgData.map(imgPath => fs.createReadStream(imgPath)),
          body: ` 💥 | تفضل البوم صور`,
        }, event.threadID, (err) => {
          if (err) console.error("حدث خطأ أثناء إرسال الصور:", err);

          imgData.forEach(imgPath => {
            fs.unlinkSync(imgPath);
          });
        });
      } else {
        api.sendMessage(' ❌ |لم يتم العثور على خلفيات للكلمة المفتاحية المعطاة.', event.threadID, event.messageID);
      }
    } catch (error) {
      console.error('حدث خطأ أثناء جلب صور الخلفيات:', error);
      api.sendMessage(' ⚠️ |يرجى تقديم كلمة مفتاح واحدة أو حاول مرة أخرى مع كلمات مفتاحية مختلفة.', event.threadID, event.messageID);
    }
  },
};

async function translateToEnglish(text) {
  const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=ar&tl=en&dt=t&q=${encodeURIComponent(text)}`);
  const translation = translationResponse.data[0][0][0];
  return translation;
}
