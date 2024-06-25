const fs = require('fs');

module.exports = {
  config: {
    name: "سلاحي",
    author: "حسين يعقوبي",
    aliases: ["myweapon"],
    category: "متعة",
    shortDescription: {
      en: "إرسال رسالة.",
      tl: "Magpadala ng quote na may imahe."
    },
    longDescription: {
      en: "يقوم هذا الأمر بإرسال معلومات حول الحالة اللتي ستكون لها عندما يهجمون عليك الزومبي.",
      tl: "سيرسل هذا الأمر عرض أسعار عشوائيًا مع صورة."
    },
    guide: {
      en: "{p}سلاحي",
      tl: "{p}quote"
    }
  },
  onStart: async function ({ message }) {
    const json = JSON.parse(fs.readFileSync('weapons.json'));
    const data = json[Math.floor(Math.random() * json.length)];
    const link = data.link;

    const tle = Math.floor(Math.random() * 100) + 1; // توليد عدد زومبي عشوائي بين 1 و 100
    const tle1 = Math.floor(Math.random() * 50) + 1; // توليد عدد طلقات عشوائي بين 1 و 50
    const tle2 = Math.floor((tle1 / tle) * 100); // حساب نسبة البقاء على قيد الحياة

    // Send the message with image
    message.reply({
      body: `🌟 | الزومبي | 🌟 \n انت بمواجهة زومبي عددهم ${tle} وانت   لديك ${tle1} طلقات، نسبة بقائك على قيد الحياة هو  ${tle2}% وسلاحك هو :`,
      attachment: await global.utils.getStreamFromURL(link)
    });
  }
};
