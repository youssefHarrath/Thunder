const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");

function getDomain(url) {
	const regex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n]+)/im;
	const match = url.match(regex);
	return match ? match[1] : null;
}

module.exports = {
	config: {
		name: "إدارة",
		version: "1.8",
		author: "NTKhang",
		countDown: 5,
		role: 2,
		shortDescription: {
			vi: "Quản lý command event",
			en: "قم بإدارة الأوامر"
		},
		longDescription: {
			vi: "Quản lý các tệp lệnh event của bạn",
			en: "إدارة ملفات أوامر الحدث الخاص بك"
		},
		category: "المالك",
		guide: {
			vi: "{pn} load <tên file lệnh>"
				+ "\n{pn} loadAll"
				+ "\n{pn} install <url> <tên file lệnh>: Tải về và load command event, url là đường dẫn tới file lệnh (raw)"
				+ "\n{pn} install <code> <tên file lệnh>: Tải về và load command event, code là mã của file lệnh (raw)",
			en: "{pn} تحميل <إسم المجلد>"
				+ "\n{pn} تحميل_الكل"
				+ "\n{pn} تثبيت <الرابط> <إسم المجلد>: أمر حدث التنزيل والتحميل، عنوان url هو المسار إلى مجلد الأمر (الخام)"
				+ "\n{pn} تثبيت <الشفرة> <إسم المجلد>: تنزيل وتحميل أمر ، الكود هو كود ملف الأمر (الخام)"
		}
	},

	langs: {
		vi: {
			missingFileName: "⚠️ | Vui lòng nhập vào tên lệnh bạn muốn reload",
			loaded: "✅ | Đã load event command \"%1\" thành công",
			loadedError: "❌ | Load event command \"%1\" thất bại với lỗi\n%2: %3",
			loadedSuccess: "✅ | Đã load thành công \"%1\" event command",
			loadedFail: "❌ | Load thất bại event command \"%1\"\n%2",
			missingCommandNameUnload: "⚠️ | Vui lòng nhập vào tên lệnh bạn muốn unload",
			unloaded: "✅ | Đã unload event command \"%1\" thành công",
			unloadedError: "❌ | Unload event command \"%1\" thất bại với lỗi\n%2: %3",
			missingUrlCodeOrFileName: "⚠️ | Vui lòng nhập vào url hoặc code và tên file lệnh bạn muốn cài đặt",
			missingUrlOrCode: "⚠️ | Vui lòng nhập vào url hoặc code của tệp lệnh bạn muốn cài đặt",
			missingFileNameInstall: "⚠️ | Vui lòng nhập vào tên file để lưu lệnh (đuôi .js)",
			invalidUrlOrCode: "⚠️ | Không thể lấy được mã lệnh",
			alreadExist: "⚠️ | File lệnh đã tồn tại, bạn có chắc chắn muốn ghi đè lên file lệnh cũ không?\nThả cảm xúc bất kì vào tin nhắn này để tiếp tục",
			installed: "✅ | Đã cài đặt event command \"%1\" thành công, file lệnh được lưu tại %2",
			installedError: "❌ | Cài đặt event command \"%1\" thất bại với lỗi\n%2: %3",
			missingFile: "⚠️ | Không tìm thấy tệp lệnh \"%1\"",
			invalidFileName: "⚠️ | Tên tệp lệnh không hợp lệ",
			unloadedFile: "✅ | Đã unload lệnh \"%1\""
		},
		en: {
			missingFileName: "⚠️ | الرجاء إدخال اسم الأمر الذي تريد إعادة تحميله",
			loaded: "✅ | تم تحميل الأمر \"%1\" بنجاح",
			loadedError: "❌ | تم تحميل الأمر \"%1\" اكنه فشل مع أخطاء\n%2: %3",
			loadedSuccess: "✅ | تم تحميل الملفات \"%1\"  بنجاح",
			loadedFail: "❌ | تم تحميل الملفات \"%1\" لكنه فشل\n%2",
			missingCommandNameUnload: "⚠️ | الرجاء إدخال اسم الأمر الذي تريد إلغاء تحميله",
			unloaded: "✅ | تم إلغاء تحميل الأمر \"%1\" بنجاح",
			unloadedError: "❌ | تم الغاء تحميل الأمر\"%1\" لكنه فشل مع أخطاء\n%2: %3",
			missingUrlCodeOrFileName: "⚠️ | الرجاء إدخال عنوان الرابط أو الشيفرة وإسم مجلد الأمر الذي تريد تثبيته",
			missingUrlOrCode: "⚠️ | الرجاء إدخال عنوان الرابط أو شيفرة مجلد الأمر الذي تريد تثبيته",
			missingFileNameInstall: "⚠️ | الرجاء إدخال اسم المجلد لحفظ الأمر (مع .js في الأخير)",
			invalidUrlOrCode: "⚠️ | غير قادر على الحصول على رمز الأمر",
			alreadExist: "⚠️ | ملف الأمر موجود بالفعل، هل أنت متأكد من أنك تريد الكتابة فوق مجلد الأمر القديم\nتفاعل مع هذه الرسالة إذا أردت المتابعة في حفظ الإسم فوق المجلد القديم",
			installed: "✅ | تم تثبيت الأمر \"%1\" بنجاح, تم حفظ المجلد في %2",
			installedError: "❌ | تم تحميل المجلد \"%1\" لكنه فشل مع أ\n%2: %3",
			missingFile: "⚠️ | المجلد \"%1\" لم يتم العثور عليه",
			invalidFileName: "⚠️ | إسم غير صالح",
			unloadedFile: "✅ | أمر لم تم إلغاء تحميله \"%1\""
		}
	},

	onStart: async ({ args, message, api, threadModel, userModel, dashBoardModel, globalModel, threadsData, usersData, dashBoardData, globalData, commandName, event, getLang }) => {
		const { configCommands } = global.GoatBot;
		const { log, loadScripts } = global.utils;

		if (args[0] == "تحميل" && args.length == 2) {
			if (!args[1])
				return message.reply(getLang("missingFileName"));
			const infoLoad = loadScripts("events", args[1], log, configCommands, api, threadModel, userModel, dashBoardModel, globalModel, threadsData, usersData, dashBoardData, globalData, getLang);
			infoLoad.status == "success" ?
				message.reply(getLang("loaded", infoLoad.name)) :
				message.reply(getLang("loadedError", infoLoad.name, infoLoad.error, infoLoad.message));
		}
		else if ((args[0] || "").toLowerCase() == "تحميل_الكل" || (args[0] == "تحميل" && args.length > 2)) {
			const allFile = args[0].toLowerCase() == "تحميل_الكل" ?
				fs.readdirSync(path.join(__dirname, "..", "events"))
					.filter(file =>
						file.endsWith(".js") &&
						!file.match(/(eg)\.js$/g) &&
						(process.env.NODE_ENV == "development" ? true : !file.match(/(dev)\.js$/g)) &&
						!configCommands.commandEventUnload?.includes(file)
					)
					.map(item => item = item.split(".")[0]) :
				args.slice(1);
			const arraySucces = [];
			const arrayFail = [];
			for (const fileName of allFile) {
				const infoLoad = loadScripts("events", fileName, log, configCommands, api, threadModel, userModel, dashBoardModel, globalModel, threadsData, usersData, dashBoardData, globalData, getLang);
				infoLoad.status == "success" ?
					arraySucces.push(fileName) :
					arrayFail.push(`${fileName} => ${infoLoad.error.name}: ${infoLoad.error.message}`);
			}
			let msg = "";
			if (arraySucces.length > 0)
				msg += getLang("loadedSuccess", arraySucces.length) + '\n';
			if (arrayFail.length > 0)
				msg += (msg ? '\n' : '') + getLang("loadedFail", arrayFail.length, "❗" + arrayFail.join("\n❗ "));
			message.reply(msg);
		}
		else if (args[0] == "إلغاء_التحميل") {
			if (!args[1])
				return message.reply(getLang("missingCommandNameUnload"));
			const infoUnload = global.utils.unloadScripts("events", args[1], configCommands, getLang);
			infoUnload.status == "success" ?
				message.reply(getLang("unloaded", infoUnload.name)) :
				message.reply(getLang("unloadedError", infoUnload.name, infoUnload.error.name, infoUnload.error.message));
		}
		else if (args[0] == "install") {
			let url = args[1];
			let fileName = args[2];
			let rawCode;

			if (!url || !fileName)
				return message.reply(getLang("missingUrlCodeOrFileName"));

			if (url.endsWith(".js")) {
				const tmp = fileName;
				fileName = url;
				url = tmp;
			}

			if (url.match(/(https?:\/\/(?:www\.|(?!www)))/)) {
				if (!fileName || !fileName.endsWith(".js"))
					return message.reply(getLang("missingFileNameInstall"));

				const domain = getDomain(url);
				if (!domain)
					return message.reply(getLang("invalidUrl"));

				if (domain == "pastebin.com") {
					const regex = /https:\/\/pastebin\.com\/(?!raw\/)(.*)/;
					if (url.match(regex))
						url = url.replace(regex, "https://pastebin.com/raw/$1");
					if (url.endsWith("/"))
						url = url.slice(0, -1);
				}
				else if (domain == "github.com") {
					const regex = /https:\/\/github\.com\/(.*)\/blob\/(.*)/;
					if (url.match(regex))
						url = url.replace(regex, "https://raw.githubusercontent.com/$1/$2");
				}

				rawCode = (await axios.get(url)).data;

				if (domain == "savetext.net") {
					const $ = cheerio.load(rawCode);
					rawCode = $("#content").text();
				}
			}
			else {
				if (args[args.length - 1].endsWith(".js")) {
					fileName = args[args.length - 1];
					rawCode = event.body.slice(event.body.indexOf('install') + 7, event.body.indexOf(fileName) - 1);
				}
				else if (args[1].endsWith(".js")) {
					fileName = args[1];
					rawCode = event.body.slice(event.body.indexOf(fileName) + fileName.length + 1);
				}
				else
					return message.reply(getLang("missingFileNameInstall"));
			}
			if (!rawCode)
				return message.reply(getLang("invalidUrlOrCode"));
			if (fs.existsSync(path.join(__dirname, "..", "events", fileName)))
				return message.reply(getLang("alreadExist"), (err, info) => {
					global.GoatBot.onReaction.set(info.messageID, {
						commandName,
						messageID: info.messageID,
						type: "تثبيت",
						author: event.senderID,
						data: {
							fileName,
							rawCode
						}
					});
				});
			else {
				const infoLoad = loadScripts("events", fileName, log, configCommands, api, threadModel, userModel, dashBoardModel, globalModel, threadsData, usersData, dashBoardData, globalData, getLang, rawCode);
				infoLoad.status == "success" ?
					message.reply(getLang("installed", infoLoad.name, path.join(__dirname, fileName).replace(process.cwd(), ""))) :
					message.reply(getLang("installedError", infoLoad.name, infoLoad.error.name, infoLoad.error.message));
			}
		}
		else
			message.SyntaxError();
	},

	onReaction: async function ({ Reaction, message, event, api, threadModel, userModel, dashBoardModel, globalModel, threadsData, usersData, dashBoardData, globalData, getLang }) {
		const { author, messageID, data: { fileName, rawCode } } = Reaction;
		if (event.userID != author)
			return;
		const { configCommands } = global.GoatBot;
		const { log, loadScripts } = global.utils;
		const infoLoad = loadScripts("cmds", fileName, log, configCommands, api, threadModel, userModel, dashBoardModel, globalModel, threadsData, usersData, dashBoardData, globalData, getLang, rawCode);
		infoLoad.status == "success" ?
			message.reply(getLang("installed", infoLoad.name, path.join(__dirname, '..', 'events', fileName).replace(process.cwd(), ""), () => message.unsend(messageID))) :
			message.reply(getLang("installedError", infoLoad.name, infoLoad.error.name, infoLoad.error.message, () => message.unsend(messageID)));
	}
};