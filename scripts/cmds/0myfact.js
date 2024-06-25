const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");

module.exports = {
	config: {
		name: "حقائفي",
		version: "1.0",
		author: "Samir",
		countDown: 35,
		role: 0,
		shortDescription: "قم بصنع الحقائق الخاصة بك",
		longDescription: "قم بصنع النصوص كحقائق خاصة بك",
		category: "متعة",
		guide: "{pn}"
	},

	onStart: async function ({ message, args }) {
		const text = args.join(" ");
		if (!text) {
			return message.reply(`⚠️ |أرجوك قم بإدخال نص`);
		} else {
			const img = `https://api.popcat.xyz/facts?text=${encodeURIComponent(text)}`;		

								 const form = {
				body: ``
			};
				form.attachment = []
				form.attachment[0] = await global.utils.getStreamFromURL(img);
			message.reply(form);
				}
}};