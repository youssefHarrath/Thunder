const fs = require('fs');
const path = require('path');

const mutedGroupsFilePath = path.join(__dirname, 'mutedGroups.json');

// دالة لجلب قائمة المجموعات المكتومة
function getMutedGroups() {
  if (fs.existsSync(mutedGroupsFilePath)) {
    return JSON.parse(fs.readFileSync(mutedGroupsFilePath, 'utf8'));
  }
  return [];
}

// دالة لحفظ قائمة المجموعات المكتومة
function saveMutedGroups(groups) {
  fs.writeFileSync(mutedGroupsFilePath, JSON.stringify(groups, null, 2), 'utf8');
}

// دالة لعرض المجموعات التي يوجد فيها البوت
async function getGroupsList(api) {
  return new Promise((resolve, reject) => {
    api.getThreadList(100, null, ['INBOX'], (err, threads) => {
      if (err) {
        return reject(err);
      }
      resolve(threads);
    });
  });
}

module.exports = {
  config: {
    name: "خروج",
    version: "1.1",
    author: "يوسف",
    shortDescription: "يجعل البوت يغادر مجموعة محددة ويمنعه من التحدث فيها حتى يتم إعادة تفعيله",
    longDescription: "استخدم هذا الأمر لجعل البوت يغادر مجموعة محددة. البوت سيبقى صامتًا في المجموعة حتى يتم إعادة تفعيله باستخدام أمر معين.",
    category: "المالك",
  },

  langs: {
    en: {
      invalidNumber: "%1 ليس رقمًا صالحًا.",
      leaveSuccess: "تم مغادرة %1 من المجموعات بنجاح!",
      cantGetGroupsList: "لا يمكن الحصول على قائمة المجموعات!",
      returnListGroups: "»「المجموعات」«❮ عدد المجموعات التي البوت فيها هو: %1 مجموعة ❯\n\n%2",
      returnListClean: "البوت ليس في أي مجموعة.",
      groupMuted: "تم كتم البوت في هذه المجموعة.",
      groupActivated: "تم تفعيل البوت في هذه المجموعة.",
      invalidCommand: "الأمر غير صحيح. استخدم `.خروج \"المجموعة الفلانية\" off` لإعادة تفعيل البوت في مجموعة."
    }
  },

  onReply: async function({ api, event, Reply, getLang }) {
    if (String(event.senderID) !== String(Reply.author)) return;
    const { body, threadID, messageID } = event;
    const groupNumber = parseInt(body.trim());

    if (isNaN(groupNumber) || groupNumber <= 0 || groupNumber > Reply.groups.length) {
      return api.sendMessage(getLang("invalidNumber", groupNumber), threadID, messageID);
    }

    const selectedGroup = Reply.groups[groupNumber - 1];
    api.sendMessage("وداعًا! سأغادر هذه المجموعة الآن.", selectedGroup.threadID, () => {
      api.removeUserFromGroup(api.getCurrentUserID(), selectedGroup.threadID, (err) => {
        if (err) {
          console.error("حدث خطأ أثناء محاولة مغادرة المجموعة:", err);
        } else {
          // إضافة المجموعة إلى قائمة الكتم
          const mutedGroups = getMutedGroups();
          mutedGroups.push(selectedGroup.threadID);
          saveMutedGroups(mutedGroups);
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
      const groups = await getGroupsList(api);
      const filteredGroups = groups.filter(group => group.isSubscribed && group.isGroup);

      if (filteredGroups.length === 0) {
        return api.sendMessage(getLang("returnListClean"), threadID, messageID);
      }

      for (const group of filteredGroups) {
        msg += `${index++}. ${group.name} (${group.threadID})\n`;
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
  },

  onMessage: async function({ api, event }) {
    const { threadID } = event;
    const mutedGroups = getMutedGroups();

    // فحص إذا كان البوت مكتومًا في المجموعة
    if (mutedGroups.includes(threadID)) {
      // إذا كانت المجموعة مكتمة، لا يرسل البوت أي رسائل
      return;
    }

    // هنا يمكنك إضافة الكود الذي يعالج الرسائل التي يرسلها البوت في المجموعات غير المكتومة
  },

  // إضافة دالة لإلغاء كتم مجموعة معينة
  onCommand: async function({ api, event, getLang }) {
    const { body, threadID } = event;

    // التحقق من الأمر وإزالة كتم المجموعة
    if (body.endsWith(" off")) {
      const groupName = body.slice(0, -4).trim().replace(/^".*?"$/, '');
      const mutedGroups = getMutedGroups();
      const groupIndex = mutedGroups.indexOf(groupName);
      
      if (groupIndex > -1) {
        mutedGroups.splice(groupIndex, 1);
        saveMutedGroups(mutedGroups);
        return api.sendMessage(getLang("groupActivated"), threadID);
      } else {
        return api.sendMessage(getLang("invalidCommand"), threadID);
      }
    }
  }
};
