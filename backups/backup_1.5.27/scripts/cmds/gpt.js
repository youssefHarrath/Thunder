
const axios = require("axios");
module.exports = {
	config: {
		name: 'إيزوكو',
		version: '2.1.0',
		author: 'KENLIEPLAYS',
		countDown: 5,
		role: 0,
		shortDescription: 'يمكنك سؤال ميدوريا أي شيء و سيجيبم',
		longDescription: {
			ar: 'إسأل ميدوريا عن ماتريد وسوف يجيبك عن كل سؤال تطرحه'
		},
		category: 'الذكاء الإصطناعي',
		guide: {
			en: '   {pn} <الكلمة>: قم بسؤال إيزوكو'
				+ '\n   Example:{pn} أهلا'
		}
	},

	langs: {
		ar: {
			chatting: 'انتظر من فضلك...',
			error: 'إذا كان هذا التقرير غير مرغوب فيه، فيرجى الاتصال بـ Kenlie Navacilla Jugarap'
		}
	},

	onStart: async function ({ args, message, event, getLang }) {
		if (args[0]) {
			const yourMessage = args.join(" ");
			try {
				const responseMessage = await getMessage(yourMessage);
				return message.reply(`${responseMessage}`);
			}
			catch (err) {
				console.log(err)
				return message.reply(getLang("error"));
			}
		}
	},

	onChat: async ({ args, message, threadsData, event, isUserCallCommand, getLang }) => {
		if (!isUserCallCommand) {
			return;
		}
		if (args.length > 1) {
			try {
				const langCode = await threadsData.get(event.threadID, "settings.lang") || global.GoatBot.config.language;
				const responseMessage = await getMessage(args.join(" "), langCode);
				return message.reply(`${responseMessage}`);
			}
			catch (err) {
				return message.reply(getLang("error"));
			}
		}
	}
};

async function getMessage(yourMessage, langCode) {
	try {
		const res = await axios.get(`https://api.kenliejugarap.com/gptgo/?text=${yourMessage}`);
		if (!res.data.response) {
			throw new Error('يرجى الاتصال بـ Kenlie Navacilla Jugarap إذا كان هذا الخطأ غير مرغوب فيه...');
		}
		return res.data.response;
	} catch (err) {
		console.error('حدث خطأ أثناء استلام الرسالة:', err);
		throw err;
	}
        }