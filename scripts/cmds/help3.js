const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "[ 🐐 | GoatBot V2 ]";

module.exports = {
	config: {
		name: "اوامر",
		version: "1.17",
		author: "NTKhang", // orginal author Kshitiz
		countDown: 5,
		role: 0,
		shortDescription: {
			en: "عرض استخدام الأوامر وسرد كافة الأوامر مباشرة",
		},
		longDescription: {
			en: "عرض استخدام الأوامر وسرد كافة الأوامر مباشرة",
		},
		category: "النظام",
		guide: {
			en: "{pn} / أوامر إسم الأمر ",
		},
		priority: 1,
	},

	onStart: async function ({ message, args, event, threadsData, role }) {
	const { threadID } = event;
	const threadData = await threadsData.get(threadID);
	const prefix = getPrefix(threadID);

	if (args.length === 0) {
			const categories = {};
			let msg = "";

			msg += `╔═══════════════╗\n💫 THUNDER LIST 💫\n╚═══════════════╝`;

			for (const [name, value] of commands) {
					if (value.config.role > 1 && role < value.config.role) continue;

					const category = value.config.category || "Uncategorized";
					categories[category] = categories[category] || { commands: [] };
					categories[category].commands.push(name);
			}
8
			Object.keys(categories).forEach(category => {
					if (category !== "info") {
							msg += `\n\n│『 ${category.toUpperCase()} 』`;

							const names = categories[category].commands.sort();
							for (let i = 0; i < names.length; i += 1) {
									const cmds = names.slice(i, i + 1).map(item => `│⚜️${item}`);
									msg += `\n${cmds.join(" ".repeat(Math.max(0, 5 - cmds.join("").length)))}`;
							}

							msg += `\n`;
					}
			});

			const totalCommands = commands.size;
			msg += `\nحاليا البوت لديه ${totalCommands} أمر يمكن إستخدامه\n`;
			msg += `أكتب ${prefix} أوامر من أجل أن ترى كيفية إستخدام ذالك الأمر\n`;
			msg += `🧿 | THUNDER`;


			const helpListImages = [
	
        "https://i.postimg.cc/3rXfkCCw/FB-IMG-1719261281834.jpg"
			];


			const helpListImage = helpListImages[Math.floor(Math.random() * helpListImages.length)];


			await message.reply({
					body: msg,
					attachment: await global.utils.getStreamFromURL(helpListImage)
			});
	} else {
			const commandName = args[0].toLowerCase();
			const command = commands.get(commandName) || commands.get(aliases.get(commandName));

			if (!command) {
				await message.reply(` ❓ | الأمر "${commandName}" لم يتم إيجاده.`);
			} else {
				const configCommand = command.config;
				const roleText = roleTextToString(configCommand.role);
				const author = configCommand.author || "Unknown";

				const longDescription = configCommand.longDescription ? configCommand.longDescription.en || "لا وصف" : "No description";

				const guideBody = configCommand.guide?.en || "لا يوجد إرشاد في هذا الأمر.";
				const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);

				const response = `╭── الإسم ────⭓
	│ ${configCommand.name}
	├── معلومات
	│ الوصف: ${longDescription}
	│ أسماء أخرى : ${configCommand.aliases ? configCommand.aliases.join(", ") : "لا أملك "}
	│ أسماء اخرى في مجموعتك لا أملك: لا أملك
	│ الإصدار : ${configCommand.version || "1.0"}
	│ الصلاحية : ${roleText}
	│ وقت الإنتظار : ${configCommand.countDown || 1} ثانية
	│ المؤلف : ${author}
	├── كيفية الاستخدام 
	│ ${usage}
	├── ملاحظة 
	│ المحتوى داخل المعقوفتين <XXXXX> يمكن تغييرها 
  │ المحتوى داخل [a|b|c] هو a أو b أو c
	╰━━━━━━━❖`;

				await message.reply(response);
			}
		}
	},
};

function roleTextToString(roleText) {
	switch (roleText) {
		case 0:
			return "0 (الجميع)";
		case 1:
			return "1 (فقط الآدمن)";
		case 2:
			return "2 (المطور)";
		default:
			return "مجهول";
	}
}