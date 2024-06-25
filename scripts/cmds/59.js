const axios = require('axios');
const fs = require('fs');

module.exports = {
  config: {
    name: "أوشاكو",
    version: "1.0.0",
    author: "حسين يعقوبي",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "Nhận quà hàng ngày",
      en: "الاستفسارات بإستخدام الذكاء الاصطناعي"
    },
    longDescription: {
      vi: "Nhận quà hàng ngày",
      en: "الاستفسارات بإستخدام الذكاء الاصطناعي"
    }
  },

  onStart: async function ({ api, event, args }) {
    async function sendMessage(msg) {
      api.sendMessage(msg, event.threadID, event.messageID);
    }

    const content = encodeURIComponent(args.join(" "));
    const apiUrl = `https://aiapiviafastapiwithimagebyjonellmagallanes.replit.app/ai?content=${content}`;

    if (!content) return sendMessage(" ⚠️ |يرجى تقديم استفسارك.\n\nمثال: استفسر ما هو النظام الشمسي؟");

    try {
      sendMessage("🔍 | الذكاء الاصطناعي يبحث عن إجابتك. يرجى الانتظار...");

      const response = await axios.get(apiUrl);
      const { request_count, airesponse, image_url } = response.data;

      if (airesponse) {
        sendMessage(`${airesponse}\n\n📝 عدد الطلبات: ${request_count}`);

        if (image_url) {
          const imagePath = './image.jpg';
          const imageResponse = await axios.get(image_url, { responseType: 'arraybuffer' });
          fs.writeFileSync(imagePath, Buffer.from(imageResponse.data));

          sendMessage({ attachment: fs.createReadStream(imagePath) });

          fs.unlinkSync(imagePath);
        }
      } else {
        sendMessage("حدث خطأ أثناء معالجة طلبك.");
      }
    } catch (error) {
      console.error(error);
      sendMessage("🔨 | حدث خطأ أثناء معالجة طلبك من الخادم...");
    }
  }
};
