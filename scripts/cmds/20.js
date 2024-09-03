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
    var count = 0;

    if (isNaN(body) && body.indexOf("إلغاء") == 0 || body.indexOf("cancel") == 0) {
        const index = (body.slice(1, body.length)).split(/\s+/);
        for (const singleIndex of index) {
            if (isNaN(singleIndex) || singleIndex <= 0 || singleIndex > Reply.groups.length) return api.sendMessage(getLang("invaildNumber", singleIndex), threadID, messageID);
            api.removeUserFromGroup(api.getCurrentUserID(), Reply.groups[singleIndex - 1].threadID);
            count += 1;
        }
        return api.sendMessage(getLang("cancelSuccess", count), threadID, messageID);
    } else {
        const index = body.split(/\s+/);
        for (const singleIndex of index) {
            if (isNaN(singleIndex) || singleIndex <= 0 || singleIndex > Reply.groups.length) return api.sendMessage(getLang("invaildNumber", singleIndex), threadID, messageID);
            api.sendMessage(`╭────༺♡༻────╮\n ✅ | تم توصيل ميدوريا بنجاح 🫂🤍:\n==========💌==========\nأكتب ©أوامر من أجل القائمة\nاستمتع بالذكاء الاصطناعي مع ميدوريا\n==========💌==========\nقم بكتابة "أدخلني" من أجل أن تدخل إلى مجموعة ميدوريا إذا واجهت أي مشاكل 🔖\n╰────༺♡༻────╯`, Reply.groups[singleIndex - 1].threadID);
            count += 1;
        }
        return api.sendMessage(getLang("approveSuccess", count), threadID, messageID);
    }
  },

  onStart: async function({ api, event, getLang, commandName }) {
    const { threadID, messageID } = event;

    var msg = "", index = 1;

    try {
        // الحصول على جميع المجموعات التي البوت فيها
        var groups = await api.getThreadList(100, null, ["GROUP"]) || [];
    } catch (e) { return api.sendMessage(getLang("cantGetGroupsList"), threadID, messageID) }

    const list = groups.filter(group => group.isSubscribed && group.isGroup);

    for (const single of list) msg += `${index++}/ ${single.name}(${single.threadID})\n`;

    if (list.length != 0) return api.sendMessage(getLang("returnListGroups", list.length, msg), threadID, (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            groups: list
        });
    }, messageID);
    else return api.sendMessage(getLang("returnListClean"), threadID, messageID);
  }
	  }
