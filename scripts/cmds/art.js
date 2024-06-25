const axios = require("axios");

module.exports = {
  config: {
    name: "نكتة2",
    aliases: [],
    version: "1.0",
    author: "KSHITIZ",
    countDown: 5,
    role: 0,
    shortDescription: "الحصول على نكتة عشوائية",
    longDescription: {
      en: "",
    },
    category: "متعة",
    guide: {
      en: "{prefix} نكتة",
    },
  },

  onStart: async function ({ api, event }) {
    try {
      const response = await axios.get("https://api.popcat.xyz/joke");
      const { joke } = response.data;

      // ترجمة النكتة من الإنجليزية إلى العربية
      const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(joke)}`);
      const translatedJoke = translationResponse.data[0][0][0] || joke;

      const message = ` ${translatedJoke}`;
      return api.sendMessage(message, event.threadID);
    } catch (error) {
      console.error(error);
    }
  },
};
