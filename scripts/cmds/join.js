module.exports = {
  config: {
    name: "إنضمام",
    aliases: ['ضفني', 'joinme'],
    version: "1.0",
    author: "Samir ",
    countDown: 5,
    role: 2,
    shortDescription: {
      en: "قم بالإنضمام إلى مجموعة التي يوحد بها البوت",
    },
    longDescription: {
      en: "يضيف هذا الأمر المستخدم إلى المجموعة التي يوجد بها البوت",
    },
    category: "المالك",
    guide: {
      en: "لاستخدام هذا الأمر، اكتب ببساطة !إضمام <المجموعة>.",
    },
  },

  onStart: async function ({ api, args, message, event }) {
    const supportGroupId = args[0];
    if (!supportGroupId) {
      api.sendMessage("يرجى تقديم آيدي مجموعة .", event.threadID);
      return;
    }
    const threadID = event.threadID;
    const userID = event.senderID;
    const threadInfo = await api.getThreadInfo(supportGroupId);
    const participantIDs = threadInfo.participantIDs;
    if (participantIDs.includes(userID)) {
      api.sendMessage(
        "أنت بالفعل في هذه المجموعة. إذا لم تجده، يرجى التحقق من طلبات الرسائل الخاصة بك .",
        threadID
      );
    } else {
      api.addUserToGroup(userID, supportGroupId, (err) => {
        if (err) {
          console.error("فشلت إضافة المستخدم إلى مجموعة الدعم:", err);
          api.sendMessage("لا أستطيع إضافتك لأن الآيدي الخاص بك غير مسموح بها لطلب الرسائل أو أن حسابك خاص. الرجاء إضافتي ثم حاول مرة أخرى...", threadID);
        } else {
          api.sendMessage(
            "لقد تمت إضافتك إلى هذه المجموعة. إذا لم تجد المجموعة في صندوق الوارد الخاص بك، فيرجى التحقق من طلبات الرسائل أو صندوق البريد العشوائي.",
            threadID
          );
        }
      });
    }
  },
};