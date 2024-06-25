module.exports = {
	config: {
		name: "تيد",
		version: "1.1",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "Xem threadID",
			en: "عرض آيدي الموضوع"
		},
		longDescription: {
			vi: "Xem id nhóm chat của bạn",
			ar: "عرض آيدي الموضوع للدردشة الجماعية الخاصة بك"
		},
		category: "معلومات",
		guide: {
			ar: "{pn}تيد"
		}
	},

	onStart: async function ({ message, event }) {
		message.reply(event.threadID.toString());
	}
};