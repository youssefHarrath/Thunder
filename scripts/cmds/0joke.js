const axios = require('axios');

module.exports = {
  config: {
    name: 'نكتة',
    version: '1.0',
    author: 'JV',
    role: 0,
    category: 'متعة',
    shortDescription: {
      en: 'يقوم بإخبارك مجموعة من النكات.'
    },
    longDescription: {
      en: 'يحكي نكتة عشوائية تم جلبها من مصدر النكات.'
    },
    guide: {
      en: '{pn}'
    }
  },
  onStart: async function ({ api, event }) {
    try {
      const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent('إليك نكتة من أجلك :')}`);
      const translatedIntro = translationResponse.data[0][0][0];

      const response = await axios.get('https://official-joke-api.appspot.com/random_joke');

      if (response.status !== 200 || !response.data || !response.data.setup || !response.data.punchline) {
        throw new Error('Invalid or missing response from JokeAPI');
      }

      const setup = response.data.setup;
      const punchline = response.data.punchline;

      const translatedSetupResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(setup)}`);
      const translatedSetup = translatedSetupResponse.data[0][0][0];

      const translatedPunchlineResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(punchline)}`);
      const translatedPunchline = translatedPunchlineResponse.data[0][0][0];

      const message = `${translatedIntro}\n\n${translatedSetup}\n\n${translatedPunchline}`;

      const messageID = await api.sendMessage(message, event.threadID);

      if (!messageID) {
        throw new Error('Failed to send message with joke');
      }

      console.log(`Sent joke with message ID ${messageID}`);
    } catch (error) {
      console.error(`Failed to send joke: ${error.message}`);
      api.sendMessage(' ❌ |عذرًا، حدث خطأ ما أثناء محاولة إلقاء نكتة. الرجاء معاودة المحاولة في وقت لاحق.', event.threadID);
    }
  }
};
