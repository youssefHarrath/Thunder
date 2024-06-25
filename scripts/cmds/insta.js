const axios = require('axios')
module.exports = {
	config: {
		name: "إنستغرام",
		aliases: ["إنستجرام"],
		version: "1.0",
		author: "Munem",
		countDown: 2,
		role: 0,
		shortDescription: "غيديوهانت من الإنستجرام",
		longDescription: "قم بتحميل فيديوهات من الإنساجرام",
		category: "وسائط",
		guide: "{pn} {{<الرابط>}}"
	},

	onStart: async function ({ message, args }) {
		const name = args.join(" ");
		if (!name)
			return message.reply(`الرجاء إدخال رابط الفيديو`);
		else {
			const BASE_URL = `https://www.nguyenmanh.name.vn/api/igDL?url=${encodeURIComponent(name)}=&apikey=SyryTUZn`;

 await message.reply("جاري تنزيل الفيديو لك");

 
			try {
				let res = await axios.get(BASE_URL)

 
 let title = res.data.result.title
			
				let img = res.data.result.video[0].url;

				const form = {
					body: `${title}`
				};
		 if (img)
					form.attachment = await global.utils.getStreamFromURL(img);
				message.reply(form); 
			} catch (e) { message.reply(`ðŸ¥º غير معثور عليه`)
 console.log(e);
 }

		}
	}
};