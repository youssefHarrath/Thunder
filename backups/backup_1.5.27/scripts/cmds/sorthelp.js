module.exports = {
	config: {
		name: "فرز_القائمة",
		version: "1.1",
		author: "Tor Bap",
		countDown: 5,
		role: 2,
		shortDescription: {
			vi: "Sắp xếp danh sách help",
			en: "فرز قائمة المساعدة"
		},
		longDescription: {
			vi: "Sắp xếp danh sách help",
			en: "فرز قائمة المساعدة"
		},
		category: "النظام",
		guide: {
			en: "{pn} [الإسم | القئة]"
		}
	},

	langs: {
		vi: {
			savedName: "Đã lưu cài đặt sắp xếp danh sách help theo thứ tự chữ cái",
			savedCategory: "Đã lưu cài đặt sắp xếp danh sách help theo thứ tự thể loại"
		},
		en: {
			savedName: "تم حفظ الفرز للقائمة المساعدة بواسطة الأسماء",
			savedCategory: "تم حفظ الفرز للقائمة بواسطة الفئات"
		}
	},

	onStart: async function ({ message, event, args, threadsData, getLang }) {
		if (args[0] == "الإسم") {
			await threadsData.set(event.threadID, "name", "settings.sortHelp");
			message.reply(getLang("savedName"));
		}
		else if (args[0] == "الفئة") {
			threadsData.set(event.threadID, "category", "settings.sortHelp");
			message.reply(getLang("savedCategory"));
		}
		else
			message.SyntaxError();
	}
};