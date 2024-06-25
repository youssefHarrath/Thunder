const { findUid } = global.utils;
const regExCheckURL = /^(http|https):\/\/[^ "]+$/;

module.exports = {
	config: {
		name: "آيدي",
		version: "1.3",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		description: {
			vi: "Xem user id facebook của người dùng",
			en: "قم برؤية المعرف الخاص بمستخدم على فيسبوك"
		},
		category: "معلومات",
		guide: {
			vi: "   {pn}: dùng để xem id facebook của bạn"
				+ "\n   {pn} @tag: xem id facebook của những người được tag"
				+ "\n   {pn} <link profile>: xem id facebook của link profile"
				+ "\n   Phản hồi tin nhắn của người khác kèm lệnh để xem id facebook của họ",
			en: "   {pn}: قم بعرض الآيدي الخاص بك"
				+ "\n   {pn} @منشن: قم بعرض آيدي الخاص بالناس"
				+ "\n   {pn} <رابط الملف الشخصي>: قم بعرض الآيدي الحاص بذالك الشخص"
				+ "\n   قم بالرد على رسالة شخص ما لعرض الآيدي الخاص به"
		}
	},

	langs: {
		vi: {
			syntaxError: "Vui lòng tag người muốn xem uid hoặc để trống để xem uid của bản thân"
		},
		en: {
			syntaxError: " ⚠️ | قم بالرد على رسالة شخص ما او قم بعمل منشن له"
		}
	},

	onStart: async function ({ message, event, args, getLang }) {
		if (event.messageReply)
			return message.reply(event.messageReply.senderID);
		if (!args[0])
			return message.reply(event.senderID);
		if (args[0].match(regExCheckURL)) {
			let msg = '';
			for (const link of args) {
				try {
					const uid = await findUid(link);
					msg += `${link} => ${uid}\n`;
				}
				catch (e) {
					msg += `${link} (ERROR) => ${e.message}\n`;
				}
			}
			message.reply(msg);
			return;
		}

		let msg = "";
		const { mentions } = event;
		for (const id in mentions)
			msg += `${mentions[id].replace("@", "")}: ${id}\n`;
		message.reply(msg || getLang("syntaxError"));
	}
};