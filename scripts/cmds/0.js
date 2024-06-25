const fast = require('fast-speedtest-api');

module.exports = {
  config: {
    name: "إختبار_سرعة",
    aliases: ["speed"],
    version: "1.0",
    author: "Samir",
    countDown: 30,
    role: 2,
    shortDescription: "قم بتفقد سرعة النزام",
    longDescription: "التحقق من سرعة النظام",
    category: "المالك",
    guide: "{pn}"
  },

  onStart: async function ({ api, event }) {
    try {
      const speedTest = new fast({
        token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm",
        verbose: false,
        timeout: 10000,
        https: true,
        urlCount: 5,
        bufferSize: 8,
        unit: fast.UNITS.Mbps
      });

      console.log('تم البدأ في إختبار السرعة🔁...'); // Added for debugging purposes

      const result = await speedTest.getSpeed();
      console.log('إدإكتكل إختبار السرعة ✅:', result); // Added for debugging purposes

      const message = "تم اختبار سرعة معالجة البوت بنجاح." +
        "\n➠ النتيجة" +
        "\n⟿ السرعة: " + result + " ميغابايت في الثانية";

      console.log('جاري إرسال رسالة:', message); // Added for debugging purposes

      return api.sendMessage(message, event.threadID, event.messageID);
    } catch (error) {
      console.error('حدث خطأ:', error); // Added for debugging purposes
      return api.sendMessage("حدث خطأ أثناء اختبار السرعة.", event.threadID, event.messageID);
    }
  }
};