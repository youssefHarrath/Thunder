module.exports = {
	config: {
		name: "تيد",
		version: "1.2",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		description: {
			vi: "Xem id nhóm chat của bạn",
			en: "قم بالتطلع على ايدي المجموعة"
		},
		category: "معلومات",
		guide: {
			en: "{pn}"
		}
	},

	onStart: async function ({ message, event }) {
		message.reply(event.threadID.toString());
	}
};