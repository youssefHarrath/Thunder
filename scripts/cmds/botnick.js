module.exports = {
  config: {
    name: "لقب_البوت",
    aliases: ["botname"],
    version: "1.0",
    author: "unknown",
    countDown: 5,
    role: 2,
    shortDescription: {
      en: "قم بتغيير إسم البوت في جميع المجموعات"
    },
    longDescription: {
      en: "قم بتغيير لقب البوت في جميع مجموعات الدردشة"
    },
    category: "المالك",
    guide: {
      en: "{pn} <لقب جديد>"
    },
    envConfig: {
      delayPerGroup: 250
    }
  },

  langs: {
    en: {
      missingNickname: " ⚠️ | قم بإدخال الإسم الجديد للبوت",
      changingNickname: " ⚙️ | جاري البدأ في تغيير لقب البوت  '%1' في %2 مجموعة",
      errorChangingNickname: " ❌ | حدث خطأ أثناء تغيير إسم البوت بالنسبة ل %1 مجموعة :\n%2",
      successMessage: "✅ | تم تغيير إسم البوت في جميع مجموعات الدردشة إلى '%1'",
      sendingNotification: " ✓ | تم إرسال إشعار إلى  %1 مجموعة"
    }
  },

  onStart: async function({ api, args, threadsData, message, getLang }) {
    const newNickname = args.join(" ");

    if (!newNickname) {
      return message.reply(getLang("invalidInput"));
    }

    const allThreadID = (await threadsData.getAll()).filter(t => t.isGroup && t.members.find(m => m.userID == api.getCurrentUserID())?.inGroup);
    const threadIds = allThreadID.map(thread => thread.threadID);

    const nicknameChangePromises = threadIds.map(async threadId => {
      try {
        await api.changeNickname(newNickname, threadId, api.getCurrentUserID());
        return threadId;
      } catch (error) {
        console.error(`Failed to change nickname for thread ${threadId}: ${error.message}`);
        return null;
      }
    });

    const failedThreads = (await Promise.allSettled(nicknameChangePromises))
      .filter(result => result.status === "rejected")
      .map(result => result.reason.message);

    if (failedThreads.length === 0) {
      message.reply(getLang("successMessage", newNickname));
    } else {
      message.reply(getLang("partialSuccessMessage", newNickname, failedThreads.join(", ")));
    }
    message.reply(getLang("sendingNotification", allThreadID.length));
  }
};
