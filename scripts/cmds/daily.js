const moment = require("moment-timezone");

const author = "NTKhang | Aesther";
const code = {
	name: "هدية",
	version: "1.1"
};

module.exports = {
	config: {
		name: code.name,
		version: code.version,
		author: author,
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "Nhận quà hàng ngày",
			en: "قم بإستقبال هدية كل يوم"
		},
		longDescription: {
			vi: "Nhận quà hàng ngày",
			en: "قم بإستقبال هدية بشكل يومي"
		},
		category: "متعة",
		guide: {
			vi: "   {pn}: Nhận quà hàng ngày"
				+ "\n   {pn} info: Xem thông tin quà hàng ngày",
			en: "   {pn}"
				+ "\n   {pn} معلومات: قم برؤية معلومات الهدية"
		},
		envConfig: {
			rewardFirstDay: {
				coin: 100,
				exp: 10
			}
		}
	},

	langs: {
		vi: {
			monday: "Thứ 2",
			tuesday: "Thứ 3",
			wednesday: "Thứ 4",
			thursday: "Thứ 5",
			friday: "Thứ 6",
			saturday: "Thứ 7",
			sunday: "Chủ nhật",
			alreadyReceived: "Bạn đã nhận quà rồi",
			received: "Bạn đã nhận được %1 coin và %2 exp"
		},
		en: {
			monday: "الإثنين",
			tuesday: "الثلاثاء",
			wednesday: "الأربعاء",
			thursday: "الخميس",
			friday: "الجمعة",
			saturday: "السبت",
			sunday: "الأحد",
			alreadyReceived: " ⚠️ | أنت بالفعل إستقبلت الهدية 🛍الهدية🛍\n\nヾ( ￣O￣)ツ💰",
			received: " ✅ | تم الحصول على الهدية بنجاح:\n◍ 💰الهدية-[%1💵]دولار \n◍ 🎲النقاط [%2⚔]\n➤قم بالعودة غدا🎣"
		}
	},

	onStart: async function ({ args, message, event, envCommands, usersData, commandName, getLang }) {
		const reward = envCommands[commandName].rewardFirstDay;
		if (args[0] == "معلومات") {
			let msg = "";
			for (let i = 1; i < 8; i++) {
				const getCoin = Math.floor(reward.coin * (1 + 20 / 100) ** ((i == 0 ? 7 : i) - 1));
				const getExp = Math.floor(reward.exp * (1 + 20 / 100) ** ((i == 0 ? 7 : i) - 1));
				const day = i == 7 ? getLang("sunday") :
					i == 6 ? getLang("saturday") :
						i == 5 ? getLang("friday") :
							i == 4 ? getLang("thursday") :
								i == 3 ? getLang("wednesday") :
									i == 2 ? getLang("tuesday") :
										getLang("monday");
				msg += `أنت لديك في هذا اليوم ${day} : ${getCoin} عملة, ${getExp} نقطة\n`;
			}
			return message.reply(msg);
		}

		const dateTime = moment.tz("Africa/Casablanca").format("DD/MM/YYYY");
		const date = new Date();
		const currentDay = date.getDay(); // 0: sunday, 1: monday, 2: tuesday, 3: wednesday, 4: thursday, 5: friday, 6: saturday
		const { senderID } = event;

		const userData = await usersData.get(senderID);
		if (userData.data.lastTimeGetReward === dateTime)
			return message.reply(getLang("alreadyReceived"));

		const getCoin = Math.floor(reward.coin * (1 + 20 / 100) ** ((currentDay == 0 ? 7 : currentDay) - 1));
		const getExp = Math.floor(reward.exp * (1 + 20 / 100) ** ((currentDay == 0 ? 7 : currentDay) - 1));
		userData.data.lastTimeGetReward = dateTime;
		await usersData.set(senderID, {
			money: userData.money + getCoin,
			exp: userData.exp + getExp,
			data: userData.data
		});
		message.reply(getLang("received", getCoin, getExp));
	}
};