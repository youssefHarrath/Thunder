module.exports = {
	config: {
		name: "فرز",
		version: "1.2",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		description: {
			vi: "Sắp xếp danh sách help",
			en: "فرز قائمة الأوامر"
		},
		category: "خدمات",
		guide: {
			en: "{pn} [الأسماء | الفئات]"
		}
	},

	langs: {
		vi: {
			savedName: "Đã lưu cài đặt sắp xếp danh sách help theo thứ tự chữ cái",
			savedCategory: "Đã lưu cài đặt sắp xếp danh sách help theo thứ tự thể loại"
		},
		en: {
			savedName: " ✅ | تم فرز قائمة الأوامر بواسطة الأسماء",
			savedCategory: " ✅ | تم حفظ قائمة الأوامر بواسطة الفئات"
		}
	},

	onStart: async function ({ message, event, args, threadsData, getLang }) {
		if (args[0] == "الأسماء") {
			await threadsData.set(event.threadID, "name", "settings.sortHelp");
			message.reply(getLang("savedName"));
		}
		else if (args[0] == "الفئات") {
			threadsData.set(event.threadID, "category", "settings.sortHelp");
			message.reply(getLang("savedCategory"));
		}
		else
			message.SyntaxError();
	}
};