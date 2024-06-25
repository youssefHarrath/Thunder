const { getTime, drive } = global.utils;

if (!global.temp.welcomeEvent)
	global.temp.welcomeEvent = {};

module.exports = {
  config: {
    name: "welcome",
    version: "1.5",
    author: "NTKhang",
    category: "events",
  },

  langs: {
    // لغاتك هنا
    vi: {
			session1: "sáng",
			session2: "trưa",
			session3: "chiều",
			session4: "tối",
			welcomeMessage: "Cảm ơn bạn đã mời tôi vào nhóm!\nPrefix bot: %1\nĐể xem danh sách lệnh hãy nhập: %1help",
			multiple1: "bạn",
			multiple2: "các bạn",
			defaultWelcomeMessage: "Xin chào {userName}.\nChào mừng bạn đến với {boxName}.\nChúc bạn có buổi {session} vui vẻ!"
		},
		en: {
			session1:  "الصباح",
			session2: " الظهر",
			session3: " مابعد الظهر",
			session4: " المساء",
			welcomeMessage: "✨ مرحبًا بك في عالم السحر والتكنولوجيا! 🚀\n≼━━━━━⌬🌟🧿🌟⌬━━━━━━≽\n🤖 بادئة البوت : %1\n≼━━━━━⌬🌟🧿🌟⌬━━━━━━≽\n💫 **اكتشف السحر بكتابة** `%1مساعدة",
			multiple1: "بك",
			multiple2: "بكم يا أصدقاء",
			defaultWelcomeMessage: `┌────━━❖🧿❖━━─────┐\n⚜️الأسم : 『{userName}』.\n💮________༺🖤༻________💮\n⚜️إسم المجموعة  : 『{boxName}』\n💮________༺🖤༻________💮\n⚜️الوقت : 『{session}』  \n💮________༺🖤༻________💮\n🔖ولا تنسى يا 『{userName}』 اللفظ و إن ضاق بك الرد\n└────━━❖🧿❖━━─────┘` 
    }
  },

  onStart: async ({ threadsData, message, event, api, getLang }) => {
    if (event.logMessageType !== "log:subscribe") return;

    const hours = getTime("HH");
    const { threadID } = event;
    const { nickNameBot } = global.GoatBot.config;
    const prefix = global.utils.getPrefix(threadID);
    const dataAddedParticipants = event.logMessageData.addedParticipants;

    if (dataAddedParticipants.some((item) => item.userFbId === api.getCurrentUserID())) {
      if (nickNameBot) api.changeNickname(nickNameBot, threadID, api.getCurrentUserID());

      return message.send(getLang("welcomeMessage", prefix));
    }

    if (!global.temp.welcomeEvent[threadID]) {
      global.temp.welcomeEvent[threadID] = {
        joinTimeout: null,
        dataAddedParticipants: [],
      };
    }

    global.temp.welcomeEvent[threadID].dataAddedParticipants.push(...dataAddedParticipants);
    clearTimeout(global.temp.welcomeEvent[threadID].joinTimeout);

    global.temp.welcomeEvent[threadID].joinTimeout = setTimeout(async function () {
      const dataAddedParticipants = global.temp.welcomeEvent[threadID].dataAddedParticipants;
      const threadData = await threadsData.get(threadID);
      const dataBanned = threadData.data.banned_ban || [];

      if (threadData.settings.sendWelcomeMessage === false) return;

      const threadName = threadData.threadName;
      const userName = [];
      const mentions = [];
      let multiple = false;

      if (dataAddedParticipants.length > 1) multiple = true;

      for (const user of dataAddedParticipants) {
        if (dataBanned.some((item) => item.id === user.userFbId)) continue;
        userName.push(user.fullName);
        mentions.push({
          tag: user.fullName,
          id: user.userFbId,
        });
      }

      if (userName.length === 0) return;

      let { welcomeMessage = getLang("defaultWelcomeMessage") } = threadData.data;
      const form = {
        mentions: welcomeMessage.match(/\{userNameTag\}/g) ? mentions : null,
      };

      welcomeMessage = welcomeMessage
        .replace(/\{userName\}|\{userNameTag\}/g, userName.join(", "))
        .replace(/\{boxName\}|\{threadName\}/g, threadName)
        .replace(/\{multiple\}/g, multiple ? getLang("multiple2") : getLang("multiple1"))
        .replace(
          /\{session\}/g,
          hours <= 10
            ? getLang("session1")
            : hours <= 12
            ? getLang("session2")
            : hours <= 18
            ? getLang("session3")
            : getLang("session4")
        );

      form.body = welcomeMessage;

      // إضافة الصورة الرمزية للمستخدم
      if (threadData.data.welcomeAttachment) {
        const files = threadData.data.welcomeAttachment;
        const attachments = files.reduce((acc, file) => {
          acc.push(drive.getFile(file, "stream"));
          return acc;
        }, []);
        form.attachment = (await Promise.allSettled(attachments))
          .filter(({ status }) => status === "fulfilled")
          .map(({ value }) => value);
      }

      message.send(form);
      delete global.temp.welcomeEvent[threadID];
    }, 1500);
  },
};
