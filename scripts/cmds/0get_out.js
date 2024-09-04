const fs = require('fs');
const path = require('path');

// تحديد مسار ملف mutedGroups.json بناءً على مجلد الكود الحالي
const mutedGroupsFilePath = path.join(__dirname, 'mutedGroups.json');

function getMutedGroups() {
  if (fs.existsSync(mutedGroupsFilePath)) {
    return JSON.parse(fs.readFileSync(mutedGroupsFilePath, 'utf8'));
  }
  return [];
}

function saveMutedGroups(groups) {
  fs.writeFileSync(mutedGroupsFilePath, JSON.stringify(groups, null, 2), 'utf8');
}

module.exports = {
  config: {
    name: "خروج",
    version: "1.1",
    author: "لوفي",
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
      api.removeUserFromGroup(api.getCurrentUserID(), selectedGroup.threadID, async (err) => {
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

  onCommand: async function({ api, event, getLang }) {
    const { body, threadID, senderID } = event;

    // تحقق أن المستخدم هو صاحب المعرف المحدد فقط
    if (String(senderID) !== "61556432954740") {
      return api.sendMessage("عذرًا، لا يمكنك استخدام هذا الأمر.", threadID);
    }

    const command = body.trim().split(' ');
    
    if (command[0] === '.خروج' && command.length === 2 && command[1] === 'off') {
      // إعادة تفعيل البوت في المجموعة
      const mutedGroups = getMutedGroups();
      const groupID = threadID;

      if (mutedGroups.includes(groupID)) {
        const index = mutedGroups.indexOf(groupID);
        mutedGroups.splice(index, 1);
        saveMutedGroups(mutedGroups);
        api.sendMessage(getLang("groupActivated"), threadID);
      } else {
        api.sendMessage(getLang("invalidCommand"), threadID);
      }
    }
  },

  onMessage: async function({ api, event }) {
    const { threadID } = event;
    const mutedGroups = getMutedGroups();

    // تحقق إذا كان البوت في مجموعة مكتمة
    if (mutedGroups.includes(threadID)) {
      // إذا كانت المجموعة مكتمة، توقف عن إرسال الرسائل
      return;
    }

    // هنا يمكن إضافة الكود الذي يعالج الرسائل التي يرسلها البوت
  }
};
