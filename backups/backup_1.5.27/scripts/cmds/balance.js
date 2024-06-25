module.exports = {
	config: {
		name: "رصيدي",
		aliases: ["bal"],
		version: "1.1",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "xem số tiền của bạn",
			en: "عرض أموالك"
		},
		longDescription: {
			vi: "xem số tiền hiện có của bạn hoặc người được tag",
			en: "عرض أموالك أو أموال الشخص الذي تمت عمل تاغ له"
		},
		category: "إقتصاد",
		guide: {
			vi: "   {pn}: xem số tiền của bạn"
				+ "\n   {pn} <@tag>: xem số tiền của người được tag",
			en: "   {pn}: عرض أموالك"
				+ "\n   {pn} <@تاغ>: عرض أموال الشخص الذي تمت عمل تاغ له"
		}
	},

	langs: {
		vi: {
			money: "Bạn đang có %1$",
			moneyOf: "%1 đang có %2$"
		},
		en: {
			money: "أنت لديك %1$",
			moneyOf: "%1 لديه %2$"
		}
	},

	onStart: async function ({ message, usersData, event, getLang }) {
		if (Object.keys(event.mentions).length > 0) {
			const uids = Object.keys(event.mentions);
			let msg = "";
			for (const uid of uids) {
				const userMoney = await usersData.get(uid, "money");
				msg += getLang("moneyOf", event.mentions[uid].replace("@", ""), userMoney) + '\n';
			}
			return message.reply(msg);
		}
		const userData = await usersData.get(event.senderID);
		message.reply(getLang("money", userData.money));
	}
};