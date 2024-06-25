module.exports = {
  config: {
    name: "الأعلى_رتبة",
    version: "1.0",
    author: "Xemon—",
    role: 0,
    shortDescription: {
      en: "أفضل 10 مستخدمين من حيث  للخبرة"
    },
    longDescription: {
      en: ""
    },
    category: "مستوى",
    guide: {
      en: "{pn}"
    }
  },
  onStart: async function ({ api, args, message, event, usersData }) {
    const allUsers = await usersData.getAll();
    
    // Filter out users with no experience points
    const usersWithExp = allUsers.filter(user => user.exp > 0);

    if (usersWithExp.length < 10) {
      message.reply("لا يوجد عدد كافٍ من المستخدمين ذوي نقاط الخبرة لعرض العشرة الأوائل.");
      return;
    }
    
    const topExp = usersWithExp.sort((a, b) => b.exp - a.exp).slice(0, 10);
    
    const topUsersList = topExp.map((user, index) => `${index + 1}. ${user.name}: ${user.exp}`);
    
    const messageText = `أعلى 10 مستخدمين رتبة هم:\n${topUsersList.join('\n')}`;
    
    message.reply(messageText);
  }
};