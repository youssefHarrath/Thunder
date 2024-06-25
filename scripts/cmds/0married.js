const axios = require('axios');

module.exports = {
  config: {
    name: "توافق",
    version: "1.0",
    author: "RUBISH",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "Tính chỉ số tình cảm",
      en: "حساب نسبة الحب بين شخصين"
    },
    longDescription: {
      vi: "Sử dụng lệnh này để tính chỉ số tình cảm giữa hai người.",
      en: "يستخدم هذا الأمر لحساب نسبة التوافق بين شخصين."
    },
    category: "حب",
    guide: {
      vi: "Cú pháp: love [tên người thứ nhất] - [tên người thứ hai]",
      en: "⚠️ | بناء جملة خاطئ: إستخدم حب [إسم الشخص الأول] - [إسم الشخص الثاني]"
    }
  },

onStart: async function ({ api, args, message, event }) {
    try {
      const text = args.join(" ");
      const [fname, sname] = text.split('-').map(name => name.trim());

      if (!fname || !sname) {
        return message.reply("❌ | يرجى تقديم أسماء كلا الشخصين.");
      }

      const response = await axios.get('https://love-calculator.api-host.repl.co/love-calculator', {
        params: { fname, sname }
      });

      const result = response.data;

      let loveMessage = `💖 توافق حبيبين 💖\n\n${fname} ❤️ ${sname}\n\nالنسبة: ${result.percentage}%\n\n● ${result.result}\n`;

      const intervalMessages = {
        10: "مجرد البداية! استمرا في استكشاف مشاعركما.",
        20: "هناك إمكانات هنا. استمرا في تعزيز اتصالكما.",
        30: "أساس متين! حبكما ينموا إستمرا في العمل على ذالك.",
        40: "في منتصف الطريق هناك! علاقتكما ستزدهر.",
        50: "اتصال متوازن وواعد! نعتز بحبكما.",
        60: "حبكما يزداد قوة أكثر و أكثر ! رباطكما أصبح أكثر عمقا.",
        70: "على الطريق الصحيح لحب دائم! استمرا في البناء.",
        80: "رائع! أنتما لديكما حب مثالي! حبكما غير عادي.",
        90: "اوشكتم على الوصول! لهب المشاعر في قلبيكما قوية جدا وأنتما مقدران لبعضكما.",
        100: "تهانينا على الاتصال المثالي 🥳أنتما لن يفرق أي شيئ بينكما ✨!"
      };

      const interval = Math.floor(result.percentage / 10) * 10;
      const intervalMessage = intervalMessages[interval];

      if (intervalMessage) {
        loveMessage += `\n● ${intervalMessage} `;
      }

      message.reply(loveMessage);
    } catch (error) {
      console.error(error);
      message.reply("❌ | حدث خطأ أثناء حساب التوافق الحب. الرجاء معاودة المحاولة في وقت لاحق.");
    }
  }
};