const cheerio = require('cheerio');
const axios = require('axios');

module.exports = {
  config: {
    name: "جوجل",
    author: "luffy",
    version: "2.0",
    shortDescription: "البحث عن الصور باستخدام صور جوجل",
    longDescription: "ابحث عن الصور باستخدام صور جوجل وأرجع عددًا محددًا من النتائج.",
    category: "وسائط",
    guide: {
      vi: "",
      en: ""
    }
  },

  onStart: async function({ args, message, getLang }) {
    try {
      const query = args.join(' ');
      const encodedQuery = encodeURIComponent(query);
      const numResults = parseInt(args[0]) || 6; // Default to 6 if no number is provided
      const url = `https://www.google.com/search?q=${encodedQuery}&tbm=isch`;

      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      const results = [];
      $('img[src^="https://"]').each(function() {
        results.push($(this).attr('src'));
      });

      const attachments = await Promise.all(results.slice(0, numResults).map(url => global.utils.getStreamFromURL(url)));

      return message.reply({body: ` ✅ | إليك افضل  ${numResults} صورة ، نتيجة ل "${query}":`, attachment: attachments});
    } catch (error) {
      console.error(error);
      return message.reply(" ❌ |آسف، لم أتمكن من العثور على أي نتائج.");
    }
  }
}