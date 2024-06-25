const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
	config: {
		name: "قل2",
		aliases: [],
		author: "Kshitiz",
		version: "1.0",
		cooldowns: 5,
		role: 0,
		shortDescription: {
			en: ""
		},
		longDescription: {
			en: "تحويل النص إلى كلام بواسطة الوحش"
		},
		category: "الذكاء الاصطناعي",
		guide: {
			en: "{p}الوحش [النص]"
		}
	},
	onStart: async function ({ api, event, args }) {
		try {
			const { createReadStream, unlinkSync } = fs;
			const { resolve } = path;

			const { messageID, threadID, senderID, body, mentions, type } = event;

			const name = "قل2";

			let chat = args.join(" ");


			const extractText = () => {
				if (type === "message_reply") {
					return event.messageReply.body;
				} else if (mentions.length > 0) {
					return mentions[0].body;
				} else {
					return chat;
				}
			};

			chat = extractText();

			if (!chat) return api.sendMessage(`الرجاء تقديم النص لتحويله إلى ملف صوتي.`, threadID, messageID);


			const text = encodeURIComponent(chat);

			const audioPath = resolve(__dirname, 'cache', `${threadID}_${senderID}_beast.mp3`);

			const audioApi = await axios.get(`https://www.api.vyturex.com/beast?query=${text}`);

			const audioUrl = audioApi.data.audio;

			await global.utils.downloadFile(audioUrl, audioPath);

			const att = createReadStream(audioPath);

			api.sendMessage({
				attachment: att,
				body: '', 
			}, threadID, null, messageID, () => unlinkSync(audioPath));
		} catch (error) {
			console.error(error);
			api.sendMessage("حدث خطأ أثناء معالجة طلبك.", threadID, messageID);
		}
	}
};
