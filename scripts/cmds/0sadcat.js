const axios = require('axios');
const fs = require('fs');

module.exports = {
	config: {
		name: "قط_حزين",
		aliases: ["sc"],
		version: "1.1",
		author: "JV BARCENAS",
		countDown: 5,
		role: 0,
		shortDescription: "قط حزين مع نص",
		longDescription: "صور لقط حزين مع نص",
		category: "متعة",
		guide: {
			en: "   {pn} {اِسْتَدْعَى}"
		}
	},

	onStart: async function ({ event, message, usersData, args, getLang }) {
		const userPrompt = args.join(' ');

		try {
			// ترجمة النص من الإنجليزية إلى العربية
			const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(userPrompt)}`);
			const translatedPrompt = translationResponse.data[0][0][0];

			const response = await axios.get(`https://api.popcat.xyz/sadcat?text=${encodeURIComponent(translatedPrompt)}`, {
				responseType: 'arraybuffer'
			});

			const imageData = Buffer.from(response.data, 'binary');
			const pathSave = `${__dirname}/tmp/sadcat.png`;
			fs.writeFileSync(pathSave, imageData);

			message.reply({
				attachment: fs.createReadStream(pathSave)
			}, () => fs.unlinkSync(pathSave));
		} catch (error) {
			console.error(error);
			message.reply('حدث خطأ أثناء إنشاء الصورة.');
		}
	}
};
