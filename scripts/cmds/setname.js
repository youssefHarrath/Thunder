async function checkShortCut(nickname, uid, usersData) {
	try {
		/\{userName\}/gi.test(nickname) ? nickname = nickname.replace(/\{userName\}/gi, await usersData.getName(uid)) : null;
		/\{userID\}/gi.test(nickname) ? nickname = nickname.replace(/\{userID\}/gi, uid) : null;
		return nickname;
	}
	catch (e) {
		return nickname;
	}
}

module.exports = {
	config: {
		name: "الكنية",
		version: "1.4",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		description: {
			vi: "Đổi biệt danh của tất cả thành viên trong nhóm chat hoặc những thành viên được tag theo một định dạng",
			en: "Change nickname of all members in chat or members tagged by a format"
		},
		category: "المجموعة",
		guide: {
			vi: {
				body: "   {pn} <nick name>: thay đổi biệt danh của bản thân"
					+ "\n   {pn} @tags <nick name>: thay đổi biệt danh của những thành viên được tag"
					+ "\n   {pn} all <nick name>: thay đổi biệt danh của tất cả thành viên trong nhóm chat"
					+ "\n\n   Với các shortcut có sẵn:"
					+ "\n   + {userName}: tên của thành viên"
					+ "\n   + {userID}: ID của thành viên"
					+ "\n\n   Ví dụ: (xem ảnh)",
				attachment: {
					[`${__dirname}/assets/guide/setname_1.png`]: "https://i.ibb.co/gFh23zb/guide1.png",
					[`${__dirname}/assets/guide/setname_2.png`]: "https://i.ibb.co/BNWHKgj/guide2.png"
				}
			},
			en: {
				body: "   {pn} <الكنية>: قم بتغيير الكنية الخاصة بك"
					+ "\n   {pn} @تاغ <الكنية>: قم بتغيير الكنية الحاصة بالشحص اللي تمت منشنته"
					+ "\n   {pn} الكل <الكنية>: قم بتغيير الكنية للجميع أعضاء المجموعة"
					+ "\n\nمع طرق إضافية :"
					+ "\n   + {userName}: إسم العضو"
					+ "\n   + {userID}: معرف العضو"
					+ "\n\n   مثال : (قم برؤية الصورة لا)",
				attachment: {
					[`${__dirname}/assets/guide/setname_1.png`]: "https://i.ibb.co/gFh23zb/guide1.png",
					[`${__dirname}/assets/guide/setname_2.png`]: "https://i.ibb.co/BNWHKgj/guide2.png"
				}
			}
		}
	},

	langs: {
		vi: {
			error: "Đã có lỗi xảy ra, thử tắt tính năng liên kết mời trong nhóm và thử lại sau"
		},
		en: {
			error: " ❌ |حدث خطأ، حاول إيقاف ميزة رابط الدعوة في المجموعة وحاول مرة أخرى لاحقًا"
		}
	},

	onStart: async function ({ args, message, event, api, usersData, getLang }) {
		const mentions = Object.keys(event.mentions);
		let uids = [];
		let nickname = args.join(" ");

		if (args[0] === "الكل" || mentions.includes(event.threadID)) {
			uids = (await api.getThreadInfo(event.threadID)).participantIDs;
			nickname = args[0] === "all" ? args.slice(1).join(" ") : nickname.replace(event.mentions[event.threadID], "").trim();
		}
		else if (mentions.length) {
			uids = mentions;
			const allName = new RegExp(Object.values(event.mentions).join("|"), "g");
			nickname = nickname.replace(allName, "").trim();
		}
		else {
			uids = [event.senderID];
			nickname = nickname.trim();
		}

		try {
			const uid = uids.shift();
			await api.changeNickname(await checkShortCut(nickname, uid, usersData), event.threadID, uid);
		}
		catch (e) {
			return message.reply(getLang("error"));
		}

		for (const uid of uids)
			await api.changeNickname(await checkShortCut(nickname, uid, usersData), event.threadID, uid);
	}
};