const axios = require('axios');
const { getStreamFromURL } = global.utils;

module.exports = {
	config: {
		name: "أڤتار",
		author: "NTKhang",
		version: "1.5",
		cooldowns: 5,
		role: 0,
		shortDescription: {
			vi: "tạo avatar anime",
			en: "إنشاء الصورة الرمزية أنيمي"
		},
		longDescription: {
			vi: "tạo avatar anime với chữ ký",
			en: "إنشاء الصورة الرمزية أنيمي مع التوقيع"
		},
		category: "صور",
		guide: {
			vi: "   {p}{n} <mã số nhân vật hoặc tên nhân vật> | <chữ nền> | <chữ ký> | <tên màu tiếng anh hoặc mã màu nền (hex color)>"
				+ "\n   {p}{n} help: xem cách dùng lệnh",
			en: "   {p}{n} <معرف الحرف أو اسم الحرف> | <نص الخلفية> | <إمضاء> | <اسم لون الخلفية أو اللون السداسي>"
				+ "\n   {p}{n} مساعدة: عرض كيفية استخدام هذا الأمر"
		}
	},

	langs: {
		vi: {
			initImage: "Đang khởi tạo hình ảnh, vui lòng chờ đợi...",
			invalidCharacter: "Hiện tại chỉ có %1 nhân vật trên hệ thống, vui lòng nhập id nhân vật nhỏ hơn",
			notFoundCharacter: "Không tìm thấy nhân vật mang tên %1 trong danh sách nhân vật",
			errorGetCharacter: "Đã xảy ra lỗi lấy dữ liệu nhân vật:\n%1: %2",
			success: "✅ Avatar của bạn\nNhân vật: %1\nMã số: %2\nChữ nền: %3\nChữ ký: %4\nMàu: %5",
			defaultColor: "mặc định",
			error: "Đã xảy ra lỗi\n%1: %2"
		},
		en: {
			initImage: "جارٍ تهيئة الصورة، يرجى الانتظار...",
			invalidCharacter: "حاليا لا يوجد سوى %1 من الشخصيات الموجودة على النظام، يرجى إدخال  آيدي الشخصية أقل من",
			notFoundCharacter: "لم يتم التعرف على  شخصية %1 لم يتم العثور عليها في قائمة الشخصيات",
			errorGetCharacter: "حدث خطأ أثناء الحصول على بيانات الشخصية:\n%1: %2",
			success: "✅ شخصيتك الإفتراضية\nشخصية: %1\nآيدي: %2\nنص الخلفية: %3\nإمضاء: %4\nلون: %5",
			defaultColor: "default",
			error: "حدث خطأ\n%1: %2"
		}
	},

	onStart: async function ({ args, message, getLang }) {
		const content = args.join(" ").split("|").map(item => item = item.trim());
		let idNhanVat, tenNhanvat;
		const chu_Nen = content[1];
		const chu_Ky = content[2];
		const colorBg = content[3];
		if (!args[0])
			return message.SyntaxError();
		message.reply(getLang("initImage"));
		try {
			const dataChracter = (await axios.get("https://goatbotserver.onrender.com/taoanhdep/listavataranime?apikey=ntkhang")).data.data;
			if (!isNaN(content[0])) {
				idNhanVat = parseInt(content[0]);
				const totalCharacter = dataChracter.length - 1;
				if (idNhanVat > totalCharacter)
					return message.reply(getLang("invalidCharacter", totalCharacter));
				tenNhanvat = dataChracter[idNhanVat].name;
			}
			else {
				const findChracter = dataChracter.find(item => item.name.toLowerCase() == content[0].toLowerCase());
				if (findChracter) {
					idNhanVat = findChracter.stt;
					tenNhanvat = content[0];
				}
				else
					return message.reply(getLang("notFoundCharacter", content[0]));
			}
		}
		catch (error) {
			const err = error.response.data;
			return message.reply(getLang("errorGetCharacter", err.error, err.message));
		}

		const endpoint = `https://goatbotserver.onrender.com/taoanhdep/avataranime`;
		const params = {
			id: idNhanVat,
			chu_Nen,
			chu_Ky,
			apikey: "ntkhangGoatBot"
		};
		if (colorBg)
			params.colorBg = colorBg;

		try {
			const avatarImage = await getStreamFromURL(endpoint, "avatar.png", { params });
			message.reply({
				body: getLang("success", tenNhanvat, idNhanVat, chu_Nen, chu_Ky, colorBg || getLang("defaultColor")),
				attachment: avatarImage
			});
		}
		catch (error) {
			error.response.data.on("data", function (e) {
				const err = JSON.parse(e);
				message.reply(getLang("error", err.error, err.message));
			});
		}
	}
};