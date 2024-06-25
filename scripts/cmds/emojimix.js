const axios = require("axios");

module.exports = {
	config: {
		name: "دمج",
		version: "1.4",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		description: {
			vi: "Mix 2 emoji lại với nhau",
			en: "قم بدمج إثنان من الإيموجي معا"
		},
		guide: {
			vi: "   {pn} <الإيموحي الأول> <الإيموجي الثاني>"
				+ "\n   Ví dụ:  {pn} 🤣 🥰",
			en: "   {pn} <الإيموجي الأول> <الإيموحي الثاني>"
				+ "\n   مثال:  {pn} 🤣 🥰"
		},
		category: "متعة"
	},

	langs: {
		vi: {
			error: "Rất tiếc, emoji %1 và %2 không mix được",
			success: "Emoji %1 và %2 mix được %3 ảnh"
		},
		en: {
			error: "⚠️ | عذرا لا يمكنك دمج الإيموحي %1 مع الإيموحي %2 جرب شيئا آخر",
			success: " ✅ | تم دمج %1 مع %2 الإندماج %3 صورة"
		}
	},
  
	onStart: async function ({ message, args, getLang }) {
		const readStream = [];
		const emoji1 = args[0];
		const emoji2 = args[1];

		if (!emoji1 || !emoji2)
			return message.SyntaxError();

		const generate1 = await generateEmojimix(emoji1, emoji2);
		const generate2 = await generateEmojimix(emoji2, emoji1);

		if (generate1)
			readStream.push(generate1);
		if (generate2)
			readStream.push(generate2);

		if (readStream.length == 0)
			return message.reply(getLang("error", emoji1, emoji2));

		message.reply({
			body: getLang("success", emoji1, emoji2, readStream.length),
			attachment: readStream
		});
	}
};



async function generateEmojimix(emoji1, emoji2) {
	try {
		const { data: response } = await axios.get("https://goatbotserver.onrender.com/taoanhdep/emojimix", {
			params: {
				emoji1,
				emoji2
			},
			responseType: "stream"
		});
		response.path = `emojimix${Date.now()}.png`;
		return response;
	}
	catch (e) {
		return null;
	}
}