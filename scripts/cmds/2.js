module.exports = {
  config: {
    name: "أحسب_الأعضاء",
    version: "1.0",
    author: "KSHITIZ",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "Đếm thành viên nhóm",
      en: "يقوم بحساب عدد الأعداء الموجودين في المجموعة"
    },
    longDescription: {
      vi: "Xem số lượng thành viên trong nhóm",
      en: "عرض عدد الأعضاء في المجموعة"
    },
    category: "المجموعة",
    guide: {
      vi: "   {pn}: dùng để xem số lượng thành viên trong nhóm",
      en: "   {pn}: يستخدم لعرض عدد الأعضاء في المجموعة"
    }
  },

  langs: {
    vi: {
      count: "Số lượng thành viên trong nhóm là:",
    },
    en: {
      count: "عدد الأعضاء الذي يتواجد في المجموعة هو:",
    }
  },

  onStart: async function ({ threadsData, message, event, api, commandName, getLang }) {
    const { threadID } = event;
    const threadData = await threadsData.get(threadID);
    const { members } = threadData;

    if (members && members.length > 0) {
      const memberCount = members.length;
      message.reply(`${getLang("count")} ${memberCount}`);
    } else {
      message.reply(getLang("count") + " 0");
    }
  },

  onChat: async ({ threadsData, event }) => {
    const { senderID, threadID } = event;
    const members = await threadsData.get(threadID, "members");
    
    if (!members.some(member => member.userID === senderID)) {
      members.push({
        userID: senderID,
        name: await api.getProfile(senderID).name,
      });
    }

    await threadsData.set(threadID, members, "members");
  }
};