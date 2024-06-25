const { findUid } = global.utils;
const regExCheckURL = /^(http|https):\/\/[^ "]+$/;

module.exports = {
	config: {
		name: "آيدي",
		version: "1.2",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "Xem uid",
			en: "قم برؤية الآيدي الخاص بك او الشخص اللذي تريد رؤية الآيدي الخاص به"
		},
		longDescription: {
			vi: "Xem user id facebook của người dùng",
			en: "قم برؤية المعرف الخاص بك عن أو معرف الأعضاء "
		},
		category: "النظام",
		guide: {
			vi: "   {pn}: dùng để xem id facebook của bạn"
				+ "\n   {pn} @tag: xem id facebook của những người được tag"
				+ "\n   {pn} <link profile>: xem id facebook của link profile"
				+ "\n   Phản hồi tin nhắn của người khác kèm lệnh để xem id facebook của họ",
			en: "   {pn}: يستخدم من أجل رؤية المعرف الخاص بك"
				+ "\n   {pn} @تاغ: من أجل معرف الأعضاء بالمجموعة"
				+ "\n   {pn} <رابط البروفايل>: قم برؤية آيدي مستخدم فيسبوك معين"
				+ "\n   قم بالرد على رسالى الشخص اللذي تريد أن ترى المعرف الخاصة به"
		}
	},

	langs: {
		vi: {
			syntaxError: "Vui lòng tag người muốn xem uid hoặc để trống để xem uid của bản thân"
		},
		en: {
			syntaxError: " ⚠️ | أرجوك قم بعمل منشن او رد على رسالة الشخص اللذي تريد رؤية المعرف الخاص به أو أتركه فارغا من أجل أن ترى المعرف الخاص بك"
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