const fs = require('fs');

module.exports = {
	config: {
		name: "أزياء",
		version: "1.0",
		author: "AceGun",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "",
			en: "ترسل مجموعة من صور أزياء للفتيات من الأنمي ."
		},
		longDescription: {
			vi: "",
			en: "مجموعة من صورة أزياء فتيات من الأنمي."
		},
		category: "متعة",
		guide: {
			en: "{pn}"
		},
		envConfig: {}
	},

	onStart: async function ({ message }) {
		const json = JSON.parse(fs.readFileSync('cosplay.json'));
		const data = json[Math.floor(Math.random() * json.length)];
		const link = data.link;
		message.reply({
			body: '「 هاهي ذي أزياء الفتيات من الإنمي 」', attachment: await global.utils.getStreamFromURL(link)
		});
	}
};