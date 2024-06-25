const fs = require("fs-extra");

module.exports = {
	config: {
		name: "تحميل_الإعدادات",
		aliases: ["loadcf"],
		version: "1.4",
		author: "NTKhang",
		countDown: 5,
		role: 2,
		description: {
			vi: "Load lại config của bot",
			en: "إعادة تحميل الإعدادات"
		},
		category: "المالك",
		guide: "{pn}"
	},

	langs: {
		vi: {
			success: "Config đã được load lại thành công"
		},
		en: {
			success: " ✅ | تم تحميل الإعدادات بنجاح"
		}
	},

	onStart: async function ({ message, getLang }) {
		global.GoatBot.config = fs.readJsonSync(global.client.dirConfig);
		global.GoatBot.configCommands = fs.readJsonSync(global.client.dirConfigCommands);
		message.reply(getLang("success"));
	}
};