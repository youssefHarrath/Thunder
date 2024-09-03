module.exports = {
  config: {
    name: "طلبات",
    version: "1.0",
    author: "لوفي",
    countDown: 5,
    role: 2,
    shortDescription: {
      vi: "",
      en: "أنظر من في قائمة المجموعات التي يكون فيها البوت"
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "المجموعة"
  },

  langs: {
    en: {
        invaildNumber: "%1 ليس رقما إنه غير صالح",
        cancelSuccess: "تم رفض %1 من المجموعات!",
        approveSuccess: "تمت الموافقة بنجاح على %1 من المجموعات!",
        cantGetGroupsList: "لا يمكن الحصول على قائمة المجموعات!",
        returnListGroups: "»「المجموعات」«❮ العدد الكامل للمجموعات التي البوت فيها هو: %1 من المجموعات ❯\n\n%2",
        returnListClean: "「المجموعات」ليس هناك أي مجموعة في قائمة المجموعات"
    }
  },

  onReply: async function({ api, event, Reply, getLang, commandName, prefix }) {
    if (String(event.senderID) !== String(Reply.author)) return;

    const { body, threadID, messageID } = event;
    let count = 0;
    const indexArray = body.split(/\s+/).map(Number);

    if (body.toLowerCase().startsWith("إلغاء") || body.toLowerCase().startsWith("cancel")) {
        for (const index of indexArray) {
            if (isNaN(index) || index <= 0 || index > Reply.groups.length) {
                return api.sendMessage(getLang("invaildNumber", index), threadID, messageID);
            }
            try {
                await api.removeUserFromGroup(api.getCurrentUserID(), Reply.groups[index - 1].threadID);
                count += 1;
            } catch (e) {
                console.error(e);
                return api.sendMessage("حدث خطأ أثناء محاولة إزالة البوت من المجموعة.", threadID, messageID);
            }
        }
        return api.sendMessage(getLang("cancelSuccess", count), threadID, messageID);
    } else {
        for (const index of indexArray) {
            if (isNaN(index) || index <= 0 || index > Reply.groups.length) {
                return api.sendMessage(getLang("invaildNumber", index), threadID, messageID);
            }
            try {
                await api.sendMessage(`✅ | تم توصيل البوت بنجاح إلى المجموعة: ${Reply.groups[index - 1].name}`, Reply.groups[index - 1].threadID);
                count += 1;
            } catch (e) {
                console.error(e);
                return api.sendMessage("حدث خطأ أثناء محاولة إرسال الرسالة إلى المجموعة.", threadID, messageID);
            }
        }
        return api.sendMessage(getLang("approveSuccess", count), threadID, messageID);
    }
  },

  onStart: async function({ api, event, getLang, commandName }) {
    const { threadID, messageID } = event;

    let msg = "", index = 1;

    try {
        // الحصول على جميع المجموعات التي البوت فيها
        const groups = await api.getThreadList(100, null, ["GROUP"]) || [];
        const list = groups.filter(group => group.isSubscribed && group.isGroup);

        if (list.length > 0) {
            for (const single of list) {
                msg += `${index++}/ ${single.name}(${single.threadID})\n`;
            }
            return api.sendMessage(getLang("returnListGroups", list.length, msg), threadID, (err, info) => {
                global.GoatBot.onReply.set(info.messageID, {
                    commandName,
                    messageID: info.messageID,
                    author: event.senderID,
                    groups: list
                });
            }, messageID);
        } else {
            return api.sendMessage(getLang("returnListClean"), threadID, messageID);
        }
    } catch (e) {
        console.error(e);
        return api.sendMessage(getLang("cantGetGroupsList"), threadID, messageID);
    }
  }
}
