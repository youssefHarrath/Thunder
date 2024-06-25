const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
  config: {
    name: "ميتا",
    version: "1.0",
    author: "حسين يعقوبي",
    role: 0,
    shortDescription: {
      en: "توليد صور بالإعتماد على مدخلاتك"
    },
    longDescription: {
      en: "توليد صور بإستخدام المدخلات الوصف"
    },
    category: "الذكاء الإصطناعي",
    guide: {
      en: "{pn} [الوصف]"
    }
  },

  onStart: async function ({ api, event, args }) {
    const prompt = args.join(" ");
    const translatedPrompt = await translateToEnglish(prompt);
    const w = await api.sendMessage("⏱️ | جاري تنفيذ طلبك من طرف ميتا يرجى الإنتظار....", event.threadID);
    const url = `https://all-image-genator-d1p.onrender.com/dipto/sdxl?prompt=${encodeURIComponent(translatedPrompt)}`;
    try {
      const response = await axios.get(url);
      const imageUrls = response.data.imageUrls;
      const imgPaths = [];
      for (let i = 0; i < imageUrls.length; i++) {
        const imgUrl = imageUrls[i];
        const imgResponse = await axios.get(imgUrl, { responseType: 'arraybuffer' });
        const imgPath = path.join(__dirname, 'cache', `${i + 1}.jpg`);
        await fs.outputFile(imgPath, imgResponse.data);
        imgPaths.push(imgPath);
      }
      await api.unsendMessage(w.messageID);
      await api.sendMessage({
        body: `✿━━━━━━━━━━━━━━━━━✿\n\t\t ✅ | تم التنفيذ بنجاح\n✿━━━━━━━━━━━━━━━━━✿`,
        attachment: imgPaths.map(imgPath => fs.createReadStream(imgPath))
      }, event.threadID, event.messageID);
      imgPaths.forEach(imgPath => fs.unlink(imgPath));
    } catch (error) {
      console.error(error);
      await api.sendMessage(`❌ | فشل توليد الصورة\nErro: ${error.message}`, event.threadID, event.messageID);
    }
  }
};

async function translateToEnglish(text) {
  try {
    const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=ar&tl=en&dt=t&q=${encodeURIComponent(text)}`);
    return translationResponse?.data?.[0]?.[0]?.[0];
  } catch (error) {
    console.error("Translation Error:", error.message);
    return text;
  }
}
