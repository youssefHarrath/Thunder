const axios = require('axios');

module.exports = {
  config: {
    name: "توليد",
    author: "ChatGPT",
    version: "4.1",
    shortDescription: "قم بتوليد صور من أونسبلاش",
    longDescription: "ابحث عن صور عالية الجودة باستخدام وجهة بىمجة التطبيقات لأونسبلاش وقم الحصول عدد محدد من النتائج.",
    category: "الذكاء الإصطناعي",
    guide: {
      vi: "",
      en: "{pn} إسم الصورة"
    }
  },

  onStart: async function({ args, message, getLang }) {
    try {
      const query = args.join(' ');
      const numResults = parseInt(args[0]) || 9; // Default to 5 if no number is provided

      // Translate query from Arabic to English
      const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=ar&tl=en&dt=t&q=${encodeURIComponent(query)}`);
      const translation = translationResponse.data[0][0][0];

      const url = `https://api.unsplash.com/search/photos?page=1&per_page=${numResults}&query=${translation}&client_id=oWmBq0kLICkR_5Sp7m5xcLTAdkNtEcRG7zrd55ZX6oQ`;

      const { data } = await axios.get(url);
      const results = data.results.map(result => result.urls.regular);

      const attachments = await Promise.all(results.map(url => global.utils.getStreamFromURL(url)));

      return message.reply({body: ` ✅ | إليك أفضل ${numResults} صور بحودة عالية بالنسبة للكلمة المحددة ل "${translation}" من أونسبلاش:`, attachment: attachments});
    } catch (error) {
      console.error(error);
      return message.reply(" ❌ |آسف، لم أتمكن من العثور على أي نتائج.");
    }
  }
}
