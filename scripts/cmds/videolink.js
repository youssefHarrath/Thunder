const axios = require("axios");
const cheerio = require("cheerio");

module.exports = {
	config: {
		name: "رابط_فيديو",
		version: "1.2",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "Tải video từ facebook",
			en: "قم بتحميل فيديوهات من الفايسبوك"
		},
		longDescription: {
			vi: "Tải video/story từ facebook (công khai)",
			en: "قم بتحميل فيديو أو قصة من فيسبوك "
		},
		category: "وسائط",
		guide: {
			en: "   {pn} <رابط فيديو/قصة>: من أجل تحميله من فيسبوك"
		}
	},

	langs: {
		vi: {
			missingUrl: "Vui lòng nhập url video/story facebook (công khai) bạn muốn tải về",
			error: "Đã xảy ra lỗi khi tải video",
			downloading: "Đang tiến hành tải video cho bạn",
			tooLarge: "Rất tiếc không thể tải video cho bạn vì dung lượng lớn hơn 83MB"
		},
		en: {
			missingUrl: "الرجاء إدخال عنوان الرابط للفيديو أو القصة (العامة) على فيسبوك الذي تريد تنزيله",
			error: "حدث خطأ أثناء تنزيل الفيديو",
			downloading: "🕣 | يتم التحميل يرجى الانتظار.......",
			tooLarge: "عذرًا، لا يمكننا تنزيل الفيديو لك نظرًا لأن حجمه أكبر من 83 ميجابايت قم بجلب رابط فيديو آخر و أعد المحاولة"
		}
	},

	onStart: async function ({ args, message, getLang }) {
		if (!args[0])
			return message.reply(getLang("missingUrl"));
		const response = await fbDownloader(args[0]);
		if (response.success === false)
			return message.reply(getLang("error"));

		let success = false;
		const msgSend = message.reply(getLang("downloading"));

		for (const item of response.download) {
			const res = await axios({
				url: item.url,
				responseType: 'stream'
			});
			if (res.headers['content-length'] > 87031808)
				continue;
			res.data.path = global.utils.randomString(10) + '.mp4';
			message.reply({
				attachment: res.data
			}, async () => message.unsend((await msgSend).messageID));
			success = true;
			break;
		}

		if (!success) {
			message.unsend((await msgSend).messageID);
			return message.reply(getLang("tooLarge"));
		}
	}
};


async function fbDownloader(url) {
	try {
		const response1 = await axios({
			method: 'POST',
			url: 'https://snapsave.app/action.php?lang=vn',
			headers: {
				"accept": "*/*",
				"accept-language": "vi,en-US;q=0.9,en;q=0.8",
				"content-type": "multipart/form-data",
				"sec-ch-ua": "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Microsoft Edge\";v=\"110\"",
				"sec-ch-ua-mobile": "?0",
				"sec-ch-ua-platform": "\"Windows\"",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-origin",
				"Referer": "https://snapsave.app/vn",
				"Referrer-Policy": "strict-origin-when-cross-origin"
			},
			data: {
				url
			}
		});

		let html;
		const evalCode = response1.data.replace('return decodeURIComponent', 'html = decodeURIComponent');
		eval(evalCode);
		html = html.split('innerHTML = "')[1].split('";\n')[0].replace(/\\"/g, '"');

		const $ = cheerio.load(html);
		const download = [];

		const tbody = $('table').find('tbody');
		const trs = tbody.find('tr');

		trs.each(function (i, elem) {
			const trElement = $(elem);
			const tds = trElement.children();
			const quality = $(tds[0]).text().trim();
			const url = $(tds[2]).children('a').attr('href');
			if (url != undefined) {
				download.push({
					quality,
					url
				});
			}
		});

		return {
			success: true,
			video_length: $("div.clearfix > p").text().trim(),
			download
		};
	}
	catch (err) {
		return {
			success: false
		};
	}
          }