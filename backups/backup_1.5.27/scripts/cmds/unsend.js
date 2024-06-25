module.exports = {
	config: {
		name: "حذف",
		version: "1.1",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "Gỡ tin nhắn của bot",
			en: "قم بإلغاء إرسال رسالة الروبوت"
		},
		longDescription: {
			vi: "Gỡ tin nhắn của bot",
			en: "قم بإلغاء إرسال رسالة الروبوت"
		},
		category: "المجموعة",
		guide: {
			vi: "reply tin nhắn muốn gỡ của bot và gọi lệnh {pn}",
			en: "قم بالرد على الرسالة التي تريد إلغاء إرسالها واتصل بالأمر {pn}"
		}
	},

	langs: {
		vi: {
			syntaxError: "Vui lòng reply tin nhắn muốn gỡ của bot"
		},
		en: {
			syntaxError: "الرجاء الرد على الرسالة التي تريد إلغاء إرسالها"
		}
	},

	onStart: async function ({ message, event, api, getLang }) {
		if (!event.messageReply || event.messageReply.senderID != api.getCurrentUserID())
			return message.reply(getLang("syntaxError"));
		message.unsend(event.messageReply.messageID);
	}
};