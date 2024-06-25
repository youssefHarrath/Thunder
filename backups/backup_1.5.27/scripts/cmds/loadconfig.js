const fs = require("fs-extra");

module.exports = {
	config: {
		name: "إعادة_التحميل",
		aliases: ["loadcf"],
		version: "1.3",
		author: "NTKhang",
		countDown: 5,
		role: 2,
		shortDescription: {
			vi: "Load lại config",
			en: "قم بإعادة تحميل الإعدادات"
		},
		longDescription: {
			vi: "Load lại config của bot",
			en: "قم بإعادة تحميل الإعدادات"
		},
		category: "المالك",
		guide: "{pn}"
	},

	langs: {
		vi: {
			success: "Config đã được load lại thành công"
		},
		en: {
			success: " ✅ |تم إعادة تحميل إعدادات البوت بنجاح"
		}
	},

	onStart: async function ({ message, getLang }) {
		global.GoatBot.config = fs.readJsonSync(global.client.dirConfig);
		global.GoatBot.configCommands = fs.readJsonSync(global.client.dirConfigCommands);
		message.reply(getLang("success"));
	}
};