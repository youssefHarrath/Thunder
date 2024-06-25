const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = " ✅  𝗠𝗜𝗗𝗢𝗨𝗥𝗜𝗬𝗔";
/** 
* @author NTKhang
* @author: do not delete it
* @message if you delete or edit it you will get a global ban
*/

module.exports = {
	config: {
		name: "مساعدة",
		version: "1.17",
		author: "Aesther",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "Xem cách dùng lệnh",
			en: "قم بالإطلاع على الأوامر الموجودة"
		},
		longDescription: {
			vi: "Xem cách sử dụng của các lệnh",
			en: "قم برؤية الأوامر الموحودة مع معرفة كيفية إستخدام ذالك الأمر"
		},
		category: "النظام",
		guide: {
			vi: "   {pn} [để trống | <số trang> | <tên lệnh>]"
				+ "\n   {pn} <command name> [-u | usage | -g | guide]: chỉ hiển thị phần hướng dẫn sử dụng lệnh"
				+ "\n   {pn} <command name> [-i | info]: chỉ hiển thị phần thông tin về lệnh"
				+ "\n   {pn} <command name> [-r | role]: chỉ hiển thị phần quyền hạn của lệnh"
				+ "\n   {pn} <command name> [-a | alias]: chỉ hiển thị phần tên viết tắt của lệnh",
			en: "{pn} [فارغ | <رقم الصفحة> | <إسم الأمر>]"
				+ "\n   {pn} <إسم الأمر> [-u | دليل | -g | مرشد]: يريك فقط كيفية إستخدام الأمر"
				+ "\n   {pn} <إسم الأمر> [-i | معلومات]: فقط يريك للمعلومات"
				+ "\n   {pn} <إسم الأمر> [-r | الصلاحية]: يريك فقط من يمكن استخدام الأمر"
				+ "\n   {pn} <إسم الأمر> [-a | الألقاب]: يريك فقط أسماء بديلة للأمر"
		},
		priority: 1
	},

	langs: {
		vi: {
			help: "╭─────────────✿\n『%1』\n├─────⭔\n│ Trang [ %2/%3 ]\n│ Hiện tại bot có %4 lệnh có thể sử dụng\n│ » Gõ %5help <số trang> để xem danh sách các lệnh\n│ » Gõ %5help để xem chi tiết cách sử dụng lệnh đó\n├────────❀\n│ %6\n╰─────────────✿",
			attechment:fs.createReadStream("anjarara.jpg"),
			help2: "%1├───────❀\n│ » Hiện tại bot có %2 lệnh có thể sử dụng\n│ » Gõ %3help <tên lệnh> để xem chi tiết cách sử dụng lệnh đó\n│ %4\n╰─────────────✿",
			commandNotFound: "Lệnh \"%1\" không tồn tại",
			getInfoCommand: "╭── NAME ────✿\n│ %1\n├── INFO\n│ Mô tả: %2\n│ Các tên gọi khác: %3\n│ Các tên gọi khác trong nhóm bạn: %4\n│ Version: %5\n│ Role: %6\n│ Thời gian mỗi lần dùng lệnh: %7s\n│ Author: %8\n├── Usage\n│%9\n├── Notes\n│ Nội dung bên trong <XXXXX> là có thể thay đổi\n│ Nội dung bên trong [a|b|c] là a hoặc b hoặc c\n╰──────❀",
			onlyInfo: "╭── INFO ────✿\n│ Tên lệnh: %1\n│ Mô tả: %2\n│ Các tên gọi khác: %3\n│ Các tên gọi khác trong nhóm bạn: %4\n│ Version: %5\n│ Role: %6\n│ Thời gian mỗi lần dùng lệnh: %7s\n│ Author: %8\n╰─────────────✿",
			onlyUsage: "╭── USAGE ────✿\n│%1\n╰─────────────✿",
			onlyAlias: "╭── ALIAS ────✿\n│ Các tên gọi khác: %1\n│ Các tên gọi khác trong nhóm bạn: %2\n╰─────────────✿",
			onlyRole: "╭── ROLE ────✿\n│%1\n╰─────────────✿",
			doNotHave: "Không có",
			roleText0: "0 (Tất cả người dùng)",
			roleText1: "1 (Quản trị viên nhóm)",
			roleText2: "2 (Admin bot)",
			roleText0setRole: "0 (set role, tất cả người dùng)",
			roleText1setRole: "1 (set role, quản trị viên nhóm)",
			pageNotFound: "Trang %1 không tồn tại"
		},
		en: {
			help: "┌────── ～🌺～ ──────┐\n『 ✨ قائمة الأوامر ✨ \n\n%1\nالصفحة [ %2/%3 ]\n➤🔖لدي حاليا 「 %4 」أمر يمكنك ان تستخدمه ✨ \n➤🔖 أكتب : %5مساعدة <رقم الصفحة> من أجل رؤية باقي الاوامر في الصفحات الأخرى\n🌟───────💮───────🌟\n➤🔖 » أكتب: %5مساعدة من أجل معرفة معلومات وتفاصيل كيفية إستخدام ذالك الأمر\n└────── ～🌺～ ──────┘",
			help2: "%1🌟─────💮─────🌟\n》🌸البوت لديه حوالي 〚%2〛 أمر يمكن إستخدامه🎐\n》🌸⊰⊹ أكتب: %3مساعدة 『إسم الأمر』 من أجل معرفة كيفية إستخدام ذالك الأمر\n🌟 ×º°”`˜”°º× البوت:\n%4\n☆♬○♩●♪♪●♩○♬☆",
			commandNotFound: " ⁉️ | الأمر \"『%1』\" لا يوجد",
			getInfoCommand: "╭── الإسم ────⭐\n %1\n├── معلومات\n│ الوصف : %2\n│ أسماء أخرى : %3\n│ أسماء أخرى في المجموعة : %4\n│ الإصدار : %5\n│ الصلاحية : %6\n│ وقت الإنتظار : %7 ثانية\n│ المؤلف : %8\n├── كيفية إستخدام\n%9\n├── ملاحظة\n│ المحتوى داخل <XXXXX> يمكن تغييرها\n│ المجتوى داخل [أ|ب|ت] يمكن ان يكون أ أو ب أو ت\n╰──────⭐",
			onlyInfo: "╭── معلومات ────⭐\n│ إسم الأمر : %1\n│ الوصف : %2\n│ أسماء أخرى : %3\n│ أسماء أخرى في مجموعتك : %4\n│ الإصدار : %5\n│ الصلاحية : %6\n│ وقت الإنتظار : %7 ثانية\n│ المؤلف : %8\n╰─────────────⭐",
			onlyUsage: "╭── الإستخدام ────⭐\n│%1\n╰─────────────⭐",
			onlyAlias: "╭── اللقب ────⭐\n│ أسماء أخرى : %1\n│ أسماء أخرى في مجموعتك : %2\n╰─────────────⭐",
			onlyRole: "╭── الصلاحية ────⭐\n│%1\n╰─────────────⭐",
			doNotHave: "لا يوجد",
			roleText0: "0 (كل المستخدمين)",
			roleText1: "1 (فقط الآدمنز)",
			roleText2: "2 (فقط المطور)",
			roleText0setRole: "0 (ضبط الإستخدام لكل الأعضاء)",
			roleText1setRole: "1 (ضبط الإستخدام لآدمن المجموعة فقط)",
			pageNotFound: " ⁉️ |الصفحة %1 غير موجودة"
		}
	},

	onStart: async function ({ message, args, event, threadsData, getLang, role }) {
		const langCode = await threadsData.get(event.threadID, "data.lang") || global.GoatBot.config.language;
		let customLang = {};
		const pathCustomLang = path.normalize(`${process.cwd()}/languages/cmds/${langCode}.js`);
		if (fs.existsSync(pathCustomLang))
			customLang = require(pathCustomLang);

		const { threadID } = event;
		const threadData = await threadsData.get(threadID);
		const prefix = getPrefix(threadID);
		let sortHelp = threadData.settings.sortHelp || "name";
		if (!["category", "name"].includes(sortHelp))
			sortHelp = "name";
		const commandName = (args[0] || "").toLowerCase();
		const command = commands.get(commandName) || commands.get(aliases.get(commandName));

		// ———————————————— LIST ALL COMMAND ——————————————— //
		if (!command && !args[0] || !isNaN(args[0])) {
			const arrayInfo = [];
			let msg = "";
			if (sortHelp == "name") {
				const page = parseInt(args[0]) || 1;
				const numberOfOnePage = 30;
				for (const [name, value] of commands) {
					if (value.config.role > 1 && role < value.config.role)
						continue;
					let describe = name;
					let shortDescription;
					const shortDescriptionCustomLang = customLang[name]?.shortDescription;
					if (shortDescriptionCustomLang != undefined)
						shortDescription = checkLangObject(shortDescriptionCustomLang, langCode);
					else if (value.config.shortDescription)
						shortDescription = checkLangObject(value.config.shortDescription, langCode);
					if (shortDescription)
						describe += `:\n 🎐  ${cropContent(shortDescription.charAt(0).toUpperCase() + shortDescription.slice(1))}`;
					arrayInfo.push({
						data: describe,
						priority: value.priority || 0
					});
				}

				arrayInfo.sort((a, b) => a.data - b.data); // sort by name
				arrayInfo.sort((a, b) => a.priority > b.priority ? -1 : 1); // sort by priority
				const { allPage, totalPage } = global.utils.splitPage(arrayInfo, numberOfOnePage);
				if (page < 1 || page > totalPage)
					return message.reply(getLang("pageNotFound", page));

				const returnArray = allPage[page - 1] || [];
				const startNumber = (page - 1) * numberOfOnePage + 1;
				msg += (returnArray || []).reduce((text, item, index) => text += `⬅️ ${index + startNumber}${index + startNumber < 10 ? " " : ""}.⊱─❊${item.data}\n`, '').slice(0, -1);
				await message.reply(getLang("help", msg, page, totalPage, commands.size, prefix, doNotDelete));
			}
			else if (sortHelp == "category") {
	let categoryCommands = new Map(); // Map to store commands by category

	for (const [name, value] of commands) {
		if (value.config.role > 1 && role < value.config.role) {
			continue; // Skip commands the user doesn't have permission for.
		}

		const categoryName = value.config.category || "No Category";
		const circularSymbol = "\n🌊"; // Add your desired circular symbol here

		if (!categoryCommands.has(categoryName)) {
			categoryCommands.set(categoryName, []);
		}

		categoryCommands.get(categoryName).push(`${circularSymbol} ${name}`);
	}

	for (const [category, commands] of categoryCommands) {
		msg += `》★─⊰【${category}】⊱✮\n▣「${commands.join(" ")}」\n\n`;
	}

	message.reply(getLang("help2", msg, commands.size, prefix, doNotDelete));
}
		}
		// ———————————— COMMAND DOES NOT EXIST ———————————— //
		else if (!command && args[0]) {
			return message.reply(getLang("commandNotFound", args[0]));
		}
		// ————————————————— INFO COMMAND ————————————————— //
		else {
			const formSendMessage = {};
			const configCommand = command.config;

			let guide = configCommand.guide?.[langCode] || configCommand.guide?.["en"];
			if (guide == undefined)
				guide = customLang[configCommand.name]?.guide?.[langCode] || customLang[configCommand.name]?.guide?.["en"];

			guide = guide || {
				body: ""
			};
			if (typeof guide == "string")
				guide = { body: guide };
			const guideBody = guide.body
				.replace(/\{prefix\}|\{p\}/g, prefix)
				.replace(/\{name\}|\{n\}/g, configCommand.name)
				.replace(/\{pn\}/g, prefix + configCommand.name);

			const aliasesString = configCommand.aliases ? configCommand.aliases.join(", ") : getLang("doNotHave");
			const aliasesThisGroup = threadData.data.aliases ? (threadData.data.aliases[configCommand.name] || []).join(", ") : getLang("doNotHave");

			let roleOfCommand = configCommand.role;
			let roleIsSet = false;
			if (threadData.data.setRole?.[configCommand.name]) {
				roleOfCommand = threadData.data.setRole[configCommand.name];
				roleIsSet = true;
			}

			const roleText = roleOfCommand == 0 ?
				(roleIsSet ? getLang("roleText0setRole") : getLang("roleText0")) :
				roleOfCommand == 1 ?
					(roleIsSet ? getLang("roleText1setRole") : getLang("roleText1")) :
					getLang("roleText2");

			const author = configCommand.author;
			const descriptionCustomLang = customLang[configCommand.name]?.longDescription;
			let description = checkLangObject(configCommand.longDescription, langCode);
			if (description == undefined)
				if (descriptionCustomLang != undefined)
					description = checkLangObject(descriptionCustomLang, langCode);
				else
					description = getLang("doNotHave");

			let sendWithAttachment = false ; // check subcommand need send with attachment or not

			if (args[1]?.match(/^-g|guide|-u|usage$/)) {
				formSendMessage.body = getLang("onlyUsage", guideBody.split("\n").join("\n│"));
				sendWithAttachment = true;
			}
			else if (args[1]?.match(/^-a|alias|aliase|aliases$/))
				formSendMessage.body = getLang("onlyAlias", aliasesString, aliasesThisGroup);
			else if (args[1]?.match(/^-r|role$/))
				formSendMessage.body = getLang("onlyRole", roleText);
			else if (args[1]?.match(/^-i|info$/))
				formSendMessage.body = getLang("onlyInfo", configCommand.name, description, aliasesString, aliasesThisGroup, configCommand.version, roleText, configCommand.countDown || 1, author || "");
			else {
				formSendMessage.body = getLang("getInfoCommand", configCommand.name, description, aliasesString, aliasesThisGroup, configCommand.version, roleText, configCommand.countDown || 1, author || "", `${guideBody.split("\n").join("\n│")}`);
				sendWithAttachment = true;
			}

			if (sendWithAttachment && guide.attachment) {
				if (typeof guide.attachment == "object" && !Array.isArray(guide.attachment)) {
					const promises = [];
					formSendMessage.attachment = [];

					for (const keyPathFile in guide.attachment) {
						const pathFile = path.normalize(keyPathFile);

						if (!fs.existsSync(pathFile)) {
							const cutDirPath = path.dirname(pathFile).split(path.sep);
							for (let i = 0; i < cutDirPath.length; i++) {
								const pathCheck = `${cutDirPath.slice(0, i + 1).join(path.sep)}${path.sep}`; // create path
								if (!fs.existsSync(pathCheck))
									fs.mkdirSync(pathCheck); // create folder
							}
							const getFilePromise = axios.get(guide.attachment[keyPathFile], { responseType: 'arraybuffer' })
								.then(response => {
									fs.writeFileSync(pathFile, Buffer.from(response.data));
								});

							promises.push({
								pathFile,
								getFilePromise
							});
						}
						else {
							promises.push({
								pathFile,
								getFilePromise: Promise.resolve()
							});
						}
					}

					await Promise.all(promises.map(item => item.getFilePromise));
					for (const item of promises)
						formSendMessage.attachment.push(fs.createReadStream(item.pathFile));
				}
			}

			return message.reply(formSendMessage);
		}
	}
};

function checkLangObject(data, langCode) {
	if (typeof data == "string")
		return data;
	if (typeof data == "object" && !Array.isArray(data))
		return data[langCode] || data.en || undefined;
	return undefined;
}

function cropContent(content, max) {
	if (content.length > max) {
		content = content.slice(0, max - 3);
		content = content + "...";
	}
	return content;
}