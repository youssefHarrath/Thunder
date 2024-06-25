const fs = require("fs").promises;
const animeCharacters = [
  "النار - قوة اللهب 🔥",
  "الهواء - قوة الرياح 🌪️",
  "الأرض - قوة الثبات 🌏",
  "الماء - قوة الحياة 🌊",
  "الأشجار - قوة الحماية 🌲",
  "الحجر - قوة الثبات ⛰️",
  "الشمس - قوة الضوء ☀️",
];

module.exports = {
  config: {
    name: "ايدي",
    version: "1.0",
    author: "حسين يعقوبي",
    countDown: 60,
    role: 0,
    shortDescription: "الحصول على معلومات المستخدم والصورة",
    longDescription: "احصل على معلومات المستخدم والصورة من خلال منشن",
    category: "معلومات",
  },

  onStart: async function ({ event, message, usersData, api, args, threadsData }) {
    try {
      const uid1 = event.senderID;
      const uid2 = Object.keys(event.mentions)[0];
      let uid;

      if (args[0]) {
        if (/^\d+$/.test(args[0])) {
          uid = args[0];
        } else {
          const match = args[0].match(/profile\.php\?id=(\d+)/);
          if (match) {
            uid = match[1];
          }
        }
      }

      if (!uid) {
        uid = event.type === "message_reply" ? event.messageReply.senderID : uid2 || uid1;
      }

      let bankData;
      try {
        bankData = JSON.parse(await fs.readFile("bank.json", "utf8")) || {};
      } catch (error) {
        console.error("Error reading bank.json:", error.message);
        bankData = {};
      }

      api.getUserInfo(uid, async (err, userInfo) => {
        if (err) {
          return message.reply("Failed to retrieve user information.");
        }

        const avatarUrl = await usersData.getAvatarUrl(uid);
        const messageCounts = await getMessageCounts(api, event.threadID);
        const rank = getRank(userInfo[uid].exp, messageCounts[uid]);
        const balance = bankData[uid]?.bank !== undefined && !isNaN(bankData[uid].bank)
          ? bankData[uid].bank
          : 0;
        const userIndex = animeCharacters.findIndex(character => character === userInfo[uid].name);
        const randomCharacter = animeCharacters[Math.floor(Math.random() * animeCharacters.length)];

        const genderText = userInfo[uid]?.gender === 1 ? "فتاة" : userInfo[uid]?.gender === 2 ? "ولد" : "🏳️‍🌈 شاذ";

        const members = await threadsData.get(event.threadID, "members");
        const memberCount = members && members.length > 0 ? members.length : 0;

        const userIsFriend = userInfo[uid].isFriend ? "✅ نعم" : "❌ لا";
        const isBirthdayToday = userInfo[uid].isBirthday ? "✅ نعم" : "❌ لا";

        const userInformation = `\t\t•——[معلومات]——•\n\n❏اسمك👤: 『${userInfo[uid].name}』\n❏جنسك♋: 『${genderText}』\n❏تصنيفك🧿: 『${rank}』\n❏البنك💰: 『${balance}💲』\n❏عدد الأعضاء 💐 : 『${memberCount}』\n❏عدد رسائلك 📩: 『${messageCounts[uid] || 0}』\n❏هل هو صديق✅ : 『${userIsFriend}』\n❏هل عيد ميلادك اليوم🎉 : 『${isBirthdayToday}』\n❏العنصر الخاص بك🌟: 『${userIndex !== -1 ? animeCharacters[userIndex] : randomCharacter}』`;


        message.reply({
          body: userInformation,
          attachment: await global.utils.getStreamFromURL(avatarUrl),
        });
      });

      const findMember = members.find(user => user.userID == uid);
      if (!findMember) {
        members.push({
          userID: uid,
          name: await usersData.getName(uid),
          nickname: null,
          inGroup: true,
          count: 1,
        });
      } else {
        findMember.count += 1;
      }
      await threadsData.set(event.threadID, members, "members");
    } catch (error) {
      console.error("حدث خطأ أثناء قراءة ملف bank.json:", error.message);
    }
  },

  onChat: async ({ usersData, threadsData, event }) => {
    try {
      const { senderID, threadID } = event;
      const members = await threadsData.get(threadID, "members");

      if (!members.some(member => member.userID === senderID)) {
        members.push({
          userID: senderID,
          name: await api.getProfile(senderID).name,
        });
      }

      await threadsData.set(threadID, members, "members");
    } catch (error) {
      console.error("حدث خطأ أثناء قراءة ملف bank.json:", error.message);
    }
  },
};

async function getMessageCounts(api, threadId) {
  try {
    const participants = await api.getThreadInfo(threadId, { participantIDs: true });
    const messageCounts = {};

    participants.participantIDs.forEach(participantId => {
      messageCounts[participantId] = 0;
    });

    const messages = await api.getThreadHistory(threadId, 1000);
    messages.forEach(message => {
      const messageSender = message.senderID;
      if (messageCounts[messageSender] !== undefined) {
        messageCounts[messageSender]++;
      }
    });

    return messageCounts;
  } catch (error) {
    console.error("Error fetching message counts:", error.message);
    return {};
  }
}

function getRank(exp, messageCount) {
  if (messageCount >= 10000) return 'خارق🥇';
  if (messageCount >= 5000) return '🥈عظيم';
  if (messageCount >= 3000) return '👑أسطوري';
  if (messageCount >= 2000) return 'نشط🔥 قوي';
  if (messageCount >= 1000) return '🌠نشط';
  if (messageCount >= 500) return 'متفاعل🏅 قوي';
  if (messageCount >= 300) return '🎖️متفاعل جيد';
  if (messageCount >= 200) return '🌟متفاعل';
  if (messageCount >= 100) return '✨لا بأس';
  if (messageCount >= 50) return '👾مبتدأ';
  if (messageCount >= 10) return '🗿صنم';
  return 'ميت⚰️';
}
