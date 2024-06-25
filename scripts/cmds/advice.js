const axios = require('axios');
const srod = require('srod-v2');

module.exports = {
  config: {
    name: 'نصيحة',
    version: '1.0',
    author: 'AceGun',
    countDown: 5,
    role: 0,
    shortDescription: '',
    longDescription: {
      en: 'قم بالحصول على النصائح من البوت.',
    },
    category: 'خدمات',
    guide: {
      en: '{prefix} <نصيحة>',
    },
  },

  onStart: async function ({ api, event, args, message }) {
    try {
      const adviceResult = await srod.GetAdvice();
      const advice = adviceResult.embed.description;

      let translatedAdvice = await translateAdvice(advice);

      let messageToSend = `❏ النصيحة: ${translatedAdvice}`;

      return api.sendMessage(messageToSend, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
    }
  },
};

async function translateAdvice(advice) {
  try {
    const response = await axios.get(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ar&dt=t&q=${encodeURIComponent(advice)}`
    );
    const translations = response.data[0];
    const translatedAdvice = translations.reduce((accumulator, translation) => {
      if (translation[0]) {
        accumulator += translation[0];
      }
      return accumulator;
    }, '');
    return translatedAdvice;
  } catch (error) {
    console.error(error);
    return ' ❌ | حدث خطأ أثناء الترجمة .';
  }
}