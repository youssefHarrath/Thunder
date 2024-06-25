const fs = require("fs-extra");

module.exports = {
	config: {
		name: "محتوى_الكوكيز",
		aliases: ["getstate","getcookie"],
		version: "1.2",
		author: "NTKhang",
		countDown: 5,
		role: 2,
		description: {
			vi: "Lấy fbstate hiện tại",
			en: "قم بالحصول على محتوى الكوكيز الحالي"
		},
		category: "المالك",
		guide: {
			en: "   {pn}: قم بالحصول على ملفات (الأوبستايت)\n"
				+ "   {pn} [كوكيو|كوكي|c]: قم بالحصول على الفيبستات على شكل الكوكيز\n"
				+ "   {pn} [سترينغ|سترينغ|s]: قم بالحصول على الفيبستات على شكل سترينغ\n",
			vi: "   {pn}: أحصل الفيبستات (أوبستايت)\n"
				+ "   {pn} [كوكيز|كوكي|c]: get fbstate dạng cookies\n"
				+ "   {pn} [string|str|s]: get fbstate dạng string\n"
		}
	},

	langs: {
		vi: {
			success: "Đã gửi fbstate đến bạn, vui lòng kiểm tra tin nhắn riêng của bot"
		},
		en: {
			success: " ✅ | تم إرسال ملف الفيبستات قم بتفقد الخاص"
		}
	},

	onStart: async function ({ message, api, event, args, getLang }) {
		let fbstate;
		let fileName;

		if (["كوكيز"].includes(args[0])) {
			fbstate = JSON.stringify(api.getAppState().map(e => ({
				name: e.key,
				value: e.value
			})), null, 2);
			fileName = "cookies.json";
		}
		else if (["سترينغ", "str","s"].includes(args[0])) {
			fbstate = api.getAppState().map(e => `${e.key}=${e.value}`).join("; ");
			fileName = "cookiesString.txt";
		}
		else {
			fbstate = JSON.stringify(api.getAppState(), null, 2);
			fileName = "appState.json";
		}

		const pathSave = `${__dirname}/tmp/${fileName}`;
		fs.writeFileSync(pathSave, fbstate);

		if (event.senderID != event.threadID)
			message.reply(getLang("success"));

		api.sendMessage({
			body: fbstate,
			attachment: fs.createReadStream(pathSave)
		}, event.senderID, () => fs.unlinkSync(pathSave));
	}
};