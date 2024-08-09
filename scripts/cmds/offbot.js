const fs = require('fs');
const filePath = './shutdown.flag';

module.exports = {
  config: {
    name: "إطفاء",
    version: "1.0",
    author: "يوسف",
    countDown: 45,
    role: 2,
    shortDescription: "قم بإطفاء البوت",
    longDescription: "قم بإطفاء البوت",
    category: "المالك",
    guide: "{p}{n}"
  },
  onStart: async function ({event, api}) {
    // إنشاء الملف لإيقاف تشغيل البوت
    fs.writeFileSync(filePath, 'shutdown');
    api.sendMessage("════════ஜ۩۞۩ஜ════════\n\n📴تم إيقاف تشغيل نظام البوت بنجاح، أراكم قريبا يا رفاق ✅\n════════ஜ۩۞۩ஜ════════", event.threadID, () => process.exit(0));
  }
};
