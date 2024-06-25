const axios = require('axios');

module.exports = {
  config: {
    name: "إسمي_باليابانية",
    aliases: ["jpname"],
    author: "August Quinn/kira", // hindi ito collab, ako kasi nag convert :>
    version: "69",
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: "تحويل إسمك إلى إسم ياباني",
    },
    longDescription: {
      en: "تغيير إسم إلى إسم يتباني",
    },
    category: "متعة",
    guide: {
      en: "{p}{n} [الإسم]",
    },
  },

  onStart: async function ({ api, event, args }) {
    try {
      const arabicName = args.join(' ');
      const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=ar&tl=en&dt=t&q=${encodeURIComponent(arabicName)}`);
      const translatedName = translationResponse.data[0][0][0];
      const name = translatedName || arabicName;

      if (!name) {
        return api.sendMessage(' ⚠️ | أرجوك قم بإدخال إسم من اجل تحويله إلى اليابانية', event.threadID, event.messageID);
      }

      const apiUrl = `https://japanese-name-converter.august-api.repl.co/convertName?name=${encodeURIComponent(name)}`;
      const response = await axios.get(apiUrl);

      if (response.data.convertedName) {
        api.sendMessage(`✅ | "${name}" تم تحويله بنجاح إلى :\n\n${response.data.convertedName}`, event.threadID, event.messageID);
      } else {
        api.sendMessage(' ❌ |حدث خطأ أثناء تحويل الاسم. الرجاء معاودة المحاولة في وقت لاحق.', event.threadID, event.messageID);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      api.sendMessage(' ❌ |حدث خطأ أثناء تحويل الاسم. الرجاء معاودة المحاولة في وقت لاحق.', event.threadID, event.messageID);
    }
  }
};
