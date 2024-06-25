const axios = require('axios');
const fs = require('fs');
const path = require('path');

let cooldowns = {};

module.exports = {
  config: {
    name: 'الغرفة_الحمراء',
    version: '1.0',
    author: 'Your Name',
    countDown: 30,
    role: 2,
    shortDescription: {
      en: 'يقوم بإرسال مقطق منحرف',
    },
    longDescription: {
      en: 'يقوم بإرسال مقطع منحرف.',
    },
    category: 'إنحراف',
    guide: {
      en: 'قم بإرسال الأمر لإستقبال القيديو.',
    },
  },

  onStart: async function ({ api, event }) {
    if (!(event.body.indexOf("redroomv2") === 0 || event.body.indexOf("Redroomv2") === 0)) return;
  
    const args = event.body.split(/\s+/);
    args.shift();

    const userId = event.senderID;
    const cooldownTime = module.exports.config.countDown * 1000;

    if (cooldowns[userId] && Date.now() - cooldowns[userId] < cooldownTime) {
      const remainingTime = Math.ceil((cooldowns[userId] + cooldownTime - Date.now()) / 1000);
      api.sendMessage(`🕦 | المرجو الإنتظار ل ${remainingTime} ثانية.`, event.threadID, event.messageID);
      return;
    }

    try {
      api.sendMessage("📀 | جاري إرسال الفيديو...", event.threadID, event.messageID);

      const { data } = await axios.get("https://hazeyybold.replit.app/hazeyy", { responseType: "arraybuffer" });
      console.log('🔴 Red Room response:', data);

      api.sendMessage("⭐ | مذكر:\n\nسيتم إرسال الفيديو في بضع دقائق/ثواني.", event.threadID, event.messageID);

      const randomFileName = `${Math.floor(Math.random() * 99999999)}.mp4`;
      const filePath = path.join(__dirname, "cache", randomFileName);

      fs.writeFileSync(filePath, Buffer.from(data, 'binary'));

      const message = {
        body: "🎥 |إليك الفيديو الخاص بك.",
        attachment: fs.createReadStream(filePath),
      };

      api.sendMessage(message, event.threadID, (err, msgInfo) => {
        if (!err) {
        } else {
          console.error('🐱 Error sending video...', err);
          api.sendMessage('❌ | حدث خطأ.', event.threadID, event.messageID);
        }
      });

      cooldowns[userId] = Date.now();
    } catch (error) {
      console.error('🐱 Error sending or fetching video...', error);
      api.sendMessage('❌ | حدث خطأ', event.threadID, event.messageID);
    }
  },
};

module.exports.run = async function({api, event}) {};
