module.exports = {
  config: {
    name: "طلبات",
    version: "1.0",
    author: "لوفي",
    countDown: 5,
    role: 2,
    shortDescription: {
      vi: "",
      en: "أنظر من في قائمة الإنتظار"
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

        cantGetPendingList: "لا يمكن الحصول على القائمة الإنتظار!",
        returnListPending: "»「الإنتظار」«❮ العدد الكامل للمجموعات التي سيتم الموافقة عليها هو: %1 من المجموعات ❯\n\n%2",
        returnListClean: "「الإنتظار」ليس هناك أي مجموعة في قائمة الإنتظار"
    }
  },

onReply: async function({ api, event, Reply, getLang, commandName, prefix }) {
    if (String(event.senderID) !== String(Reply.author)) return;
    const { body, threadID, messageID } = event;
    var count = 0;

    if (isNaN(body) && body.indexOf("إلغاء") == 0 || body.indexOf("cancel") == 0) {
        const index = (body.slice(1, body.length)).split(/\s+/);
        for (const singleIndex of index) {
            console.log(singleIndex);
            if (isNaN(singleIndex) || singleIndex <= 0 || singleIndex > Reply.pending.length) return api.sendMessage(getLang("invaildNumber", singleIndex), threadID, messageID);
            api.removeUserFromGroup(api.getCurrentUserID(), Reply.pending[singleIndex - 1].threadID);
            count+=1;
        }
        return api.sendMessage(getLang("cancelSuccess", count), threadID, messageID);
    }
    else {
        const index = body.split(/\s+/);
        for (const singleIndex of index) {
            if (isNaN(singleIndex) || singleIndex <= 0 || singleIndex > Reply.pending.length) return api.sendMessage(getLang("invaildNumber", singleIndex), threadID, messageID);
            api.sendMessage(`╭────༺♡༻────╮\n ✅ |تم توصيل ميدوريا بنجاح 🫂🤍:\n==========💌==========\nأكتب ©أوامر من أجل القائمة\nإستمتع بالذكاء الإصطناعي مع ميدوريا 😉\n==========💌==========\nقم بكتابة "أدخلني" من أجل أن تدخل إلى مجموعة ميدوريا إذا واجهت أي مشاكل 🔖\n╰────༺♡༻────╯`, Reply.pending[singleIndex - 1].threadID);
            count+=1;
        }
        return api.sendMessage(getLang("approveSuccess", count), threadID, messageID);
    }
},

onStart: async function({ api, event, getLang, commandName }) {
	const { threadID, messageID } = event;

    var msg = "", index = 1;

    try {
		var spam = await api.getThreadList(100, null, ["OTHER"]) || [];
		var pending = await api.getThreadList(100, null, ["PENDING"]) || [];
	} catch (e) { return api.sendMessage(getLang("cantGetPendingList"), threadID, messageID) }

	const list = [...spam, ...pending].filter(group => group.isSubscribed && group.isGroup);

    for (const single of list) msg += `${index++}/ ${single.name}(${single.threadID})\n`;

    if (list.length != 0) return api.sendMessage(getLang("returnListPending", list.length, msg), threadID, (err, info) => {
		global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            pending: list
        })
	}, messageID);
    else return api.sendMessage(getLang("returnListClean"), threadID, messageID);
}
      }
          