const fs = require("fs-extra");
const { utils } = global;

module.exports = {
	config: {
		name: "بادئة",
		version: "1.3",
		author: "NTKhang",
		countDown: 5,
		role: 2,
		shortDescription: "تغيير بادئة البوت",
		longDescription: "قم بتغيير علامة أمر الروبوت في مربع الدردشة الخاص بك أو نظام الروبوت بأكمله (فقط  مسؤول البوت)",
		category: "النظام",
		guide: {
			vi: "   {pn} <new prefix>: thay đổi prefix mới trong box chat của bạn"
				+ "\   Ví dụ:"
				+ "\    {pn} #"
				+ "\\   {pn} <new prefix> -g: thay đổi prefix mới trong hệ thống bot (chỉ admin bot)"
				+ "\   Ví dụ:"
				+ "\    {pn} # -g"
				+ "\\   {pn} reset: thay đổi prefix trong box chat của bạn về mặc định",
			en: "   {pn} <new prefix>: change new prefix in your box chat"
				+ "\   مثال:"
				+ "\    {pn} # بادئة"
				+ "\\   {pn} <بادئة جديدة> تغيير: تغيير البادئة الجديدة في نظام بوت (فقط مالك البوت)"
				+ "\   مثال:"
				+ "\    {pn} # تغيير"
				+ "\\   {pn} إعادة: تتم إستعادة البادئة القديمة تلتي كانت"
		}
	},

	langs: {
		vi: {
			reset: "Đã reset prefix của bạn về mặc định: %1",
			onlyAdmin: "Chỉ admin mới có thể thay đổi prefix hệ thống bot",
			confirmGlobal: "Vui lòng thả cảm xúc bất kỳ vào tin nhắn này để xác nhận thay đổi prefix của toàn bộ hệ thống bot",
			confirmThisThread: "Vui lòng thả cảm xúc bất kỳ vào tin nhắn này để xác nhận thay đổi prefix trong nhóm chat của bạn",
			successGlobal: "Đã thay đổi prefix hệ thống bot thành: %1",
			successThisThread: "Đã thay đổi prefix trong nhóm chat của bạn thành: %1",
			myPrefix: " Prefix của hệ thống: %1\🛸 Prefix của nhóm bạn: %2"
		},
		en: {
			reset: " ✅ |تمت إعادة تعيين البادئة الخاصة بك إلى الوضع الافتراضي: %1",
			onlyAdmin: " ⚠️ |يمكن للمطور فقط تغيير بادئة بوت النظام",
			confirmGlobal: " ⚠️ |يرجى الرد على هذه الرسالة لتأكيد تغيير بادئة نظام البوت",
			confirmThisThread: " ⚠️ |يرجى الرد على هذه الرسالة لتأكيد تغيير البادئة في المجموعة الخاصة بك",
			successGlobal: " ✅ |تم تغيير بادئة نظام البوت إلى: %1",
			successThisThread: " ✅ |تم تغيير البادئة في المجموعة الخاص بك إلى: %1",
			myPrefix: "✨أهلا صديقي!✨\n[هذه هي البادئة الخاصة بي [ %2 ]\\إليك بعض الأوامر التي قد تريد إستخدامها:\\©تيك <فيديو تيك توك>\%2ميدوريا  <إسأل ميدوريا >\%2هز> هز بروفايلك>\\شكرا على إستخدام البوت! 🧭✨"
		}
	},

	onStart: async function ({ message, role, args, commandName, event, threadsData, getLang }) {
		if (!args[0])
			return message.SyntaxError();

		if (args[0] == 'إعادة') {
			await threadsData.set(event.threadID, null, "data.prefix");
			return message.reply(getLang("reset", global.GoatBot.config.prefix));
		}

		const newPrefix = args[0];
		const formSet = {
			commandName,
			author: event.senderID,
			newPrefix
		};

		if (args[1] === "تغيير")
			if (role < 2)
				return message.reply(getLang("onlyAdmin"));
			else
				formSet.setGlobal = true;
		else
			formSet.setGlobal = false;

		return message.reply(args[1] === "-g" ? getLang("confirmGlobal") : getLang("confirmThisThread"), (err, info) => {
			formSet.messageID = info.messageID;
			global.GoatBot.onReaction.set(info.messageID, formSet);
		});
	},

	onReaction: async function ({ message, threadsData, event, Reaction, getLang }) {
		const { author, newPrefix, setGlobal } = Reaction;
		if (event.userID !== author)
			return;
		if (setGlobal) {
			global.GoatBot.config.prefix = newPrefix;
			fs.writeFileSync(global.client.dirConfig, JSON.stringify(global.GoatBot.config, null, 2));
			return message.reply(getLang("successGlobal", newPrefix));
		}
		else {
			await threadsData.set(event.threadID, newPrefix, "data.prefix");
			return message.reply(getLang("successThisThread", newPrefix));
		}
	},

	onChat: async function ({ event, message, getLang }) {
		if (event.body && event.body.toLowerCase() === "بادئة")
			return () => {
				return message.reply(getLang("myPrefix", global.GoatBot.config.prefix, utils.getPrefix(event.threadID)));
			};
	}
};