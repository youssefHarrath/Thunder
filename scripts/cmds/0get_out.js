module.exports = {
  config: {
    name: "خروج",
    version: "1.0",
    author: "لوفي",
    shortDescription: "يجعل البوت يغادر مجموعة محددة",
    longDescription: "استخدم هذا الأمر لإظهار قائمة المجموعات التي يكون فيها البوت، ثم اختيار المجموعة التي تريد أن يغادرها.",
    category: "المالك",  // تم تغيير الفئة هنا
  },

  langs: {
    en: {
      invaildNumber: "%1 ليس رقمًا صالحًا.",
      leaveSuccess: "تم مغادرة %1 من المجموعات بنجاح!",
      cantGetGroupsList: "لا يمكن الحصول على قائمة المجموعات!",
      returnListGroups: "»「المجموعات」«❮ عدد المجموعات التي البوت فيها هو: %1 مجموعة ❯\n\n%2",
      returnListClean: "البوت ليس في أي مجموعة."
    }
  },

  onReply: async function({ api, event, Reply, getLang }) {
    if (String(event.senderID) !== String(Reply.author)) return;
    const { body, threadID, messageID } = event;
    const groupNumber = parseInt(body.trim());

    if (isNaN(groupNumber) || groupNumber <= 0 || groupNumber > Reply.groups.length) {
      return api.sendMessage(getLang("invaildNumber", groupNumber), threadID, messageID);
    }

    const selectedGroup = Reply.groups[groupNumber - 1];
    api.sendMessage("وداعًا! سأغادر هذه المجموعة الآن.", selectedGroup.threadID, () => {
      api.removeUserFromGroup(api.getCurrentUserID(), selectedGroup.threadID, (err) => {
        if (err) {
          console.error("حدث خطأ أثناء محاولة مغادرة المجموعة:", err);
        } else {
          api.sendMessage(getLang("leaveSuccess", 1), threadID);
        }
      });
    });
  },

  onStart: async function({ api, event, getLang, commandName }) {
    const { threadID, messageID, senderID } = event;

    // تحقق أن المستخدم هو صاحب المعرف المحدد فقط
    if (String(senderID) !== "61556432954740") {
      return api.sendMessage("عذرًا، لا يمكنك استخدام هذا الأمر.", threadID);
    }

    var msg = "", index = 1;

    try {
      // الحصول على جميع المجموعات التي البوت فيها
      const groups = await api.getThreadList(100, null, ["INBOX"]) || [];
      const filteredGroups = groups.filter(group => group.isSubscribed && group.isGroup);

      if (filteredGroups.length === 0) {
        return api.sendMessage(getLang("returnListClean"), threadID, messageID);
      }

      for (const group of filteredGroups) {
        msg += `${index++}/ ${group.name} (${group.threadID})\n`;
      }

      api.sendMessage(getLang("returnListGroups", filteredGroups.length, msg), threadID, (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName,
          messageID: info.messageID,
          author: event.senderID,
          groups: filteredGroups
        });
      }, messageID);

    } catch (e) {
      return api.sendMessage(getLang("cantGetGroupsList"), threadID, messageID);
    }
  }
};
