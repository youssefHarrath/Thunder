module.exports = {
	config: {
		name: "طرد",
		version: "1.2",
		author: "NTKhang",
		countDown: 5,
		role: 1,
		shortDescription: {
			vi: "Kick thành viên",
			en: "قم بطرد المستخدم"
		},
		longDescription: {
			vi: "Kick thành viên khỏi box chat",
			en: "طرد العضو من صندوق الدردشة"
		},
		category: "المجموعة",
		guide: {
			vi: "   {pn} @tag: dùng để kick những người được tag",
			en: "   {pn} @تاغ: تستخدم لطرد الأعضاء الذين تم وضع علامة عليهم"
		}
	},

	langs: {
		vi: {
			needAdmin: "Vui lòng thêm quản trị viên cho bot trước khi sử dụng tính năng này"
		},
		en: {
			needAdmin: "يرجى إضافة مسؤول للبوت قبل استخدام هذه الميزة"
		}
	},

	onStart: async function ({ message, event, args, threadsData, api, getLang }) {
		const adminIDs = await threadsData.get(event.threadID, "adminIDs");
		if (!adminIDs.includes(api.getCurrentUserID()))
			return message.reply(getLang("needAdmin"));
		async function kickAndCheckError(uid) {
			try {
				await api.removeUserFromGroup(uid, event.threadID);
			}
			catch (e) {
				message.reply(getLang("needAdmin"));
				return "ERROR";
			}
		}
		if (!args[0]) {
			if (!event.messageReply)
				return message.SyntaxError();
			await kickAndCheckError(event.messageReply.senderID);
		}
		else {
			const uids = Object.keys(event.mentions);
			if (uids.length === 0)
				return message.SyntaxError();
			if (await kickAndCheckError(uids.shift()) === "ERROR")
				return;
			for (const uid of uids)
				api.removeUserFromGroup(uid, event.threadID);
		}
	}
};