const fs = require('fs');
const filePath = './shutdown.flag';

module.exports = {
  config: {
    name: "تشغيل",
    version: "1.0",
    author: "يوسف",
    countDown: 45,
    role: 2,
    shortDescription: "قم بتشغيل البوت",
    longDescription: "قم بتشغيل البوت",
    category: "المالك",
    guide: "{p}{n}"
  },
  onStart: async function ({event, api}) {
    if (fs.existsSync(filePath)) {
      // حذف الملف لإعادة تشغيل البوت
      fs.unlinkSync(filePath);
      api.sendMessage("════════ஜ۩۞۩ஜ════════\n\n🔌تم تشغيل البوت من جديد، أهلا بكم يا رفاق ✅\n════════ஜ۩۞۩ஜ════════", event.threadID);
    } else {
      api.sendMessage("💡 البوت يعمل بالفعل.", event.threadID);
    }
  }
};
