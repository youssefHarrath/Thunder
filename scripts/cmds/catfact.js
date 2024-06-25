const axios = require('axios');

module.exports = {
  config: {
    name: 'قطط',
    aliases: ['catfact'],
    version: '1.1',
    author: 'JV',
    role: 0,
    category: 'متعة',
    shortDescription: {
      en: 'يرسل مجموعة من الحقائق مرفوقة بصور'
    },
    longDescription: {
      en: 'يرسل صورة قطة عشوائية تم جلبها من واجهة لرمجة التطبيقات القطة بالإضافة إلى حقيقة قطة مثيرة للاهتمام.'
    },
    guide: {
      en: '{pn}'
    }
  },
  onStart: async function ({ api, event }) {
    try {
      const [imageResponse, factResponse] = await Promise.all([
        axios.get('https://api.thecatapi.com/v1/images/search'),
        axios.get('https://catfact.ninja/facts')
      ]);

      if (imageResponse.status !== 200 || !imageResponse.data || !imageResponse.data[0] || !imageResponse.data[0].url) {
        throw new Error('Invalid or missing response from CatAPI');
      }

      if (factResponse.status !== 200 || !factResponse.data || !factResponse.data.data || factResponse.data.data.length === 0) {
        throw new Error('Invalid or missing cat facts');
      }

      const imageURL = imageResponse.data[0].url;
      const facts = factResponse.data.data;

      const randomFactIndex = Math.floor(Math.random() * facts.length);
      const factText = facts[randomFactIndex].fact;

      // Translate the cat fact to Arabic
      const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(factText)}`);
      const translatedFact = translationResponse.data[0][0][0];

      const stream = await global.utils.getStreamFromURL(imageURL);

      if (!stream) {
        throw new Error('Failed to fetch image from URL');
      }

      const messageID = await api.sendMessage({
        body: translatedFact,
        attachment: stream
      }, event.threadID);

      if (!messageID) {
        throw new Error('Failed to send message with attachment');
      }

      console.log(`Sent cat image with message ID ${messageID}`);
    } catch (error) {
      console.error(`Failed to send cat image: ${error.message}`);
      api.sendMessage(' ❌ |عذرًا، حدث خطأ ما أثناء محاولة إرسال صورة قطة. الرجاء معاودة المحاولة في وقت لاحق.', event.threadID);
    }
  }
};
