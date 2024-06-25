module.exports = {
  config: {
    name: "أدخلني",
    version: "1.0",
    author: "Loid Butter",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "قم بأضافة مستخدم إلى المجموعة",
    },
    longDescription: {
      en: "يضيف هذا الأمر المستخدم إلى مجموعة مجمتمع_ربم_البوت التي يريدها المستخدم فقط.",
    },
    category: "المجموعة",
    guide: {
      en: "════════ஜ۩۞۩ஜ════════\n\nلاستخدام هذا الأمر، اكتب ببساطة © أدخلني من أجل الإنضمام إلى مجموعة الدعم.\n\n════════ஜ۩۞۩ஜ════════",
    },
  },

  // onStart is a function that will be executed when the command is executed
  onStart: async function ({ api, args, message, event }) {
    const supportGroupId = "6603400746415297"; // ID of the support group

    const threadID = event.threadID;
    const userID = event.senderID;

    // Check if the user is already in the support group
    const threadInfo = await api.getThreadInfo(supportGroupId);
    const participantIDs = threadInfo.participantIDs;
    if (participantIDs.includes(userID)) {
      // User is already in the support group
      api.sendMessage(
        "╔═════════ஜ۩۞۩ஜ═════════╗\n\n ⚠️ |أنت بالفعل في مجموعة البوت البوت إذا لم تجده، يرجى التحقق من طلبات الرسائل أو قائمة ااإنتظار.\n\n╚═════════ஜ۩۞۩ஜ═════════╝",
        threadID
      );
    } else {
      // Add user to the support group
api.setMessageReaction("🚫", event.messageID, (err) => {}, true);
      
      api.addUserToGroup(userID, supportGroupId, (err) => {
        if (err) {
          console.error("╔═════════ஜ۩۞۩ஜ═════════╗\n\n ❌ |فشلت إضافة مستخدم إلى مجموعة  مجتمع_ريم_البوت :\n\n╚═════════ஜ۩۞۩ஜ═════════╝", err);
          api.sendMessage("╔════════ஜ۩۞۩ஜ═══════╗\n\n ❌ |لا أستطيع إضافتك لأن هويتك   غير مسموح بها لطلب الرسائل أو أن حسابك خاص. الرجاء إضافتي ثم حاول مرة أخرى...\n\n╚═════════ஜ۩۞۩ஜ═════════╝", threadID);
        } else {
          
api.setMessageReaction("✅", event.messageID, (err) => {}, true);
          
          api.sendMessage(
            "╔═════════ஜ۩۞۩ஜ═════════╗\n\n.✅ |لقد تمت إضافتك إلى مجموعة ميدوريا البوت . إذا لم تجد الصندوق في صندوق الوارد الخاص بك، فيرجى التحقق من طلبات الرسائل أو صندوق البريد العشوائي.\n\n╚═════════ஜ۩۞۩ஜ═════════╝",
            threadID
          );
        }
      });
    }
  },
};
    