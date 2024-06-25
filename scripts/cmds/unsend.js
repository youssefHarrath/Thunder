module.exports = {
	config: {
		name: "حذف",
		version: "1.2",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		description: {
			vi: "Gỡ tin nhắn của bot",
			en: "قم بحذف رسائل البوت"
		},
		category: "المجموعة",
		guide: {
			vi: "reply tin nhắn muốn gỡ của bot và gọi lệnh {pn}",
			en: "قم بالرد على الرسالة اللتي تريد حذفها {pn}"
		}
	},

	langs: {
		vi: {
			syntaxError: "Vui lòng reply tin nhắn muốn gỡ của bot"
		},
		en: {
			syntaxError: " ⚠️ | أرجوك قم بالرد على الرسالة اللتي تريد حذفها ولاتجرب حذف رسائل الآخرين فقط رسائل البوت"
		}
	},

	onStart: async function ({ message, event, api, getLang }) {
		if (!event.messageReply || event.messageReply.senderID != api.getCurrentUserID())
			return message.reply(getLang("syntaxError"));
		message.unsend(event.messageReply.messageID);
	}
};