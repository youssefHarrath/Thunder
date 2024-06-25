const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: 'إيموجي_جيف',
    version: '1.0',
    author: 'Your Name',
    role: 0,
    longDescription: {
      en: 'تحويل إيموجي إلى صورة متحركة.',
    },
    shortDescription: {
      en: 'تحويل إيموجي إلى صورة متحركة.',
    },
    cooldown: 5000, // فترة تبريد بالمللي ثانية
    category: 'متعة',
  },

  onStart: async function ({ api, args, event }) {
    const emoji = args.join(' ');

    if (!emoji) {
      return api.sendMessage('ℹ️ | يرجى إدخال إيموجي لتحويله إلى صورة متحركة.', event.threadID, event.messageID);
    }

    try {
      const { threadID, messageID } = event;
      const gifPath = path.join(__dirname, '..', 'cache', 'animated_image.gif');

      api.sendMessage('🔄 | جارٍ تحويل الإيموجي إلى صورة متحركة، يرجى الانتظار...', threadID, messageID);

      const response = await axios.get(`https://apis-samir.onrender.com/egif?emoji=${encodeURIComponent(emoji)}`, { responseType: 'arraybuffer' });

      fs.writeFileSync(gifPath, Buffer.from(response.data, 'binary'));

      api.setMessageReaction('✅', messageID, (err) => {}, true);

      // استخدام global.utils.getStreamFromURL() للحصول على مرفق الصورة المتحركة
      const attachment = await global.utils.getStreamFromURL(`file://${gifPath}`);

      const message = {
        body: '✅ | تم تحويل الإيموجي إلى صورة متحركة بنجاح',
        attachment: attachment,
      };

      api.sendMessage(message, threadID, () => {
        fs.unlinkSync(gifPath);
      }, messageID);
    } catch (error) {
      console.error('Error generating GIF:', error);
      api.sendMessage('⚠️ | حدث خطأ أثناء تحويل الإيموجي إلى صورة متحركة. يرجى المحاولة مرة أخرى.', event.threadID, event.messageID);
    }
  },
};