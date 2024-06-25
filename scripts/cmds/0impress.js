const axios = require('axios');

module.exports = {
  config: {
    name: 'إعجاب',
    version: '2.0',
    author: 'kshitiz',
    countDown: 5,
    role: 0,
    category: 'حب',
    shortDescription: {
      en: 'يخبرك بخطوط تعجب لإقناع شخص.'
    },
    longDescription: {
      en: 'استخدم هذا الأمر لإقناع الفتيات'
    },
    guide: {
      en: '{pn} إعجاب @منشن'
    }
  },
  onStart: async function ({ api, event, args }) {
    try {
      const mention = Object.keys(event.mentions);

      if (mention.length !== 1) {
        api.sendMessage(' ⚠️ |الرجاء عمل منشن لفتاة من أجل الإعجاب بها.', event.threadID, event.messageID);
        return;
      }

      const mentionName = event.mentions[mention[0]].replace('@', '');

      const response = await axios.get('https://vinuxd.vercel.app/api/pickup');

      if (response.status !== 200 || !response.data || !response.data.pickup) {
        throw new Error('Invalid or missing response from pickup line API');
      }

      const pickupline = response.data.pickup.replace('{name}', mentionName);

      // هنا يتم ترجمة النص إلى الإنجليزية
      const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(pickupline)}`);
      const translatedText = translationResponse.data[0][0][0];

      const message = `${mentionName}, ${translatedText} 💐`;

      const attachment = await api.sendMessage({
        body: message,
        mentions: [{
          tag: event.senderID,
          id: event.senderID,
          fromIndex: message.indexOf(mentionName),
          toIndex: message.indexOf(mentionName) + mentionName.length,
        }],
      }, event.threadID, event.messageID);

      if (!attachment || !attachment.messageID) {
        throw new Error('Failed to send message ');
      }

      console.log(`Sent  line as a reply with message ID ${attachment.messageID}`);
    } catch (error) {
      console.error(`Failed to send rizz line: ${error.message}`);
      api.sendMessage(' ‼️ |عذرًا، حدث خطأ ما أثناء محاولة قول سطر. الرجاء معاودة المحاولة في وقت لاحق.', event.threadID);
    }
  }
};
