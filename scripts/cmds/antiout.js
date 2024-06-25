module.exports = {
  config: {
    name: "قفل",
    version: "1.0",
    author: "AceGun",
    countDown: 5,
    role: 0,
    shortDescription: "تفعيل أو تعكيل ميزة القفل",
    longDescription: "",
    category: "المجموعة",
    guide: "{pn} {{[تشغيل | إيقاف]}}",
    envConfig: {
      deltaNext: 5
    }
  },
  onStart: async function({ message, event, threadsData, args }) {
    let antiout = await threadsData.get(event.threadID, "settings.antiout");
    if (antiout === undefined) {
      await threadsData.set(event.threadID, true, "settings.antiout");
      antiout = true;
    }
    if (!["تشغيل", "إيقاف"].includes(args[0])) {
      return message.reply(" ⚠️ | المرجو إستخدام  'تشغيل' أو 'إيقاف' كحجة");
    }
    await threadsData.set(event.threadID, args[0] === "on", "settings.antiout");
    return message.reply(` ✅ | تم ${args[0] === "تشغيل" ? "تشغيل مود القفل ولن يتمكن أي أحد من الخروج" : "تعطيل مود القفل و يسمح للجميع الخروج"}.`);
  },
  onEvent: async function({ api, event, threadsData }) {
    const antiout = await threadsData.get(event.threadID, "settings.antiout");
    if (antiout && event.logMessageData && event.logMessageData.leftParticipantFbId) {
      // A user has left the chat, get their user ID
      const userId = event.logMessageData.leftParticipantFbId;

      // Check if the user is still in the chat
      const threadInfo = await api.getThreadInfo(event.threadID);
      const userIndex = threadInfo.participantIDs.indexOf(userId);
      if (userIndex === -1) {
        // The user is not in the chat, add them back
        const addUser = await api.addUserToGroup(userId, event.threadID);
        if (addUser) {
          console.log(` ✨ | تعالى يا  ${userId} إلى أين أنت ذاهب 💗`);
        } else {
          console.log(` ❌ | فشل إعادة ${userId} إلى المجموعة 😥.`);
        }
      }
    }
  }
};