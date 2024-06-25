const malScraper = require('mal-scraper');
const axios = require('axios');

module.exports = {
  config: {
    name: "أخبار_أنمي",
    aliases: ["animenews"],
    version: "1.0",
    author: "Samir",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "الحصول على أحدث أخبار الأنمي من MyAnimeList"
    },
    longDescription: {
      en: "الحصول على أحدث أخبار الأنمي من MyAnimeList"
    },
    category: "أنمي",
    guide: {
      en: "{p}أخبار_أنمي"
    }
  },
  onStart: async function ({ api, event }) {
    const nbNews = 5;

    malScraper.getNewsNoDetails(nbNews)
      .then(async (n) => {
        const translatedTitles = await Promise.all(n.map(news => translateToArabic(news.title)));
        const messageBody = "أهم 5 أخبار عن الأنمي" +
          `『 1 』${translatedTitles[0]}\n\n` +
          `『 2 』${translatedTitles[1]}\n\n` +
          `『 3 』${translatedTitles[2]}\n\n` +
          `『 4 』${translatedTitles[3]}\n\n` +
          `『 5 』${translatedTitles[4]}`;

        api.sendMessage(messageBody, event.threadID, event.messageID);
      })
      .catch((err) => {
        console.error(err);
        api.sendMessage(" ❌ |عذرًا، حدث خطأ ما أثناء جلب الأخبار.", event.threadID);
      });
  }
};

async function translateToArabic(query) {
  try {
    const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(query)}`);
    return translationResponse.data[0][0][0];
  } catch (error) {
    console.error("تعذر الترجمة:", error);
    return query;
  }
}
