module.exports = {
  config: {
    name: "سرقة_الأعضاء",
    aliases: [],
    author: "kshitiz",  
    version: "2.0",
    cooldowns: 5,
    role: 2,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: "سرق جميع أعضاء الدردشة الجماعية إلى supportgc"
    },
    category: "المجموعة",
    guide: {
      en: "{p}{n}"
    }
  },
  onStart: async function ({ api, args, message, event}) {
    const permission = ["100076269693499"];
    const supportGroupId = "6603400746415297"; // uid/tid of your support gc
    const threadID = event.threadID;
    
    if (!permission.includes(event.senderID)) {
      return api.sendMessage(
        "آسف سيدي، وحده من يمكنه استخدام هذا الأمر.",
        event.threadID,
        event.messageID
      );
    }
    
    api.setMessageReaction("✅", event.messageID, (err) => {}, true);
    
    api.sendMessage("حاضر يا سيدي 💂", event.threadID, event.messageID);

    const threadInfo = await api.getThreadInfo(threadID);
    const participantIDs = threadInfo.participantIDs;

    for (const memberID of participantIDs) {
      const supportThreadInfo = await api.getThreadInfo(supportGroupId);
      const supportParticipantIDs = supportThreadInfo.participantIDs;

      if (!supportParticipantIDs.includes(memberID)) {
        api.addUserToGroup(memberID, supportGroupId, (err) => {
          if (err) {
            console.error(" ❌ | فشلت عملية سرقة الأعضاء\nو إضافتهم إلى هذه المجموعة:", err);
          } else {
            console.log(`المستخدم ${memberID} تمت إضافته إلى المجموعة بنجاح ✅.`);
          }
        });
      }
    }
    
    api.sendMessage(" ✅ | كل الأعضاء تمت سرقتهم بنجاح \n هيا كلكم تفقدو الرسائل في الخاص ستجدونها في الرسائل التي تجتاج ل خوافقة أو السبام", event.threadID);
  },
};
