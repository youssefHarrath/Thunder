const axios = require("axios");
const fs = require("fs-extra");
const execSync = require("child_process").execSync;
const dirBootLogTemp = `${__dirname}/tmp/rebootUpdated.txt`;

module.exports = {
	config: {
		name: "تحديث",
		version: "1.5",
		author: "Chat GPT, NTKhang",
		role: 2,
		description: {
			en: "قم بتفقد أي تحديثات أو قم بتنزيلها.",
			vi: "Kiểm tra và cài đặt phiên bản mới nhất của chatbot trên GitHub."
		},
		category: "المالك",
		guide: {
			en: "   {pn}",
			vi: "   {pn}"
		}
	},

	langs: {
		vi: {
			noUpdates: "✅ | Bạn đang sử dụng phiên bản mới nhất của GoatBot V2 (v%1).",
			updatePrompt: "💫 | Bạn đang sử dụng phiên bản %1. Hiện tại đã có phiên bản %2. Bạn có muốn cập nhật chatbot lên phiên bản mới nhất không?"
				+ "\n\n⬆️ | Các tệp sau sẽ được cập nhật:"
				+ "\n%3%4"
				+ "\n\nℹ️ | Xem chi tiết tại https://github.com/ntkhang03/Goat-Bot-V2/commits/main"
				+ "\n💡 | Thả cảm xúc bất kỳ vào tin nhắn này để xác nhận",
			fileWillDelete: "\n🗑️ | Các tệp/thư mục sau sẽ bị xóa:\n%1",
			andMore: " ...và %1 tệp khác",
			updateConfirmed: "🚀 | Đã xác nhận, đang cập nhật...",
			updateComplete: "✅ | Cập nhật thành công, bạn có muốn khởi động lại chatbot ngay bây giờ không (phản hồi tin nhắn với nội dung \"yes\" hoặc \"y\" để xác nhận).",
			updateTooFast: "⭕ Vì bản cập nhật gần nhất được thực phát hành cách đây %1 phút %2 giây nên không thể cập nhật. Vui lòng thử lại sau %3 phút %4 giây nữa để cập nhật không bị lỗi.",
			botWillRestart: "🔄 | Bot sẽ khởi động lại ngay!"
		},
		en: {
			noUpdates: "✅ | أنت تستخدم الإصدار الأخير من نظام بوت الماعز (الجوت) (v%1).",
			updatePrompt: "💫 | أنت تستخدم النظام القديم من نظام الماعز رقم %1. هناك تحديث جديد %2. هل تريد تحديثه إلى آخر إصدار ؟"
				+ "\n\n⬆️ | الملفات التالية ستتم تحديثها تلقائيا :"
				+ "\n%3%4"
				+ "\n\nℹ️ | قم برؤية التفاصيل في https://github.com/ntkhang03/Goat-Bot-V2/commits/main"
				+ "\n💡 | تفاعل مع الرسالة بإيموحي من أجل التأكيد",
			fileWillDelete: "\n🗑️ | الملفات التالية /سيتم حذف المجلدات:\n%1",
			andMore: " ...و %1 مزيد من الملفات",
			updateConfirmed: "🚀 | تم التأكيد جاري التحديث....",
			updateComplete: "✅ | تم إكتمال التحديث ، هل تريد إعادة تشغيل البوت  (قم بالرد ب  \"نعم\" أو \"لا\" من أجل التأكيد ) ؟",
			updateTooFast: "⭕ |نظرًا لأنه تم إصدار آخر تحديث منذ %1 دقيقة و%2 ثانية، فلا يمكنك التحديث الآن. الرجاء المحاولة مرة أخرى بعد %3 دقيقة %4 ثانية لتجنب الأخطاء.",
			botWillRestart: "🔄 | يتم إعادة تشغيل البوت الآن ❗"
		}
	},

	onLoad: async function ({ api }) {
		if (fs.existsSync(dirBootLogTemp)) {
			const threadID = fs.readFileSync(dirBootLogTemp, "utf-8");
			fs.removeSync(dirBootLogTemp);
			api.sendMessage(" ✅ | تم إعادة تشغيل البوت.", threadID);
		}
	},

	onStart: async function ({ message, getLang, commandName, event }) {
		// Check for updates
		const { data: { version } } = await axios.get("https://raw.githubusercontent.com/ntkhang03/Goat-Bot-V2/main/package.json");
		const { data: versions } = await axios.get("https://raw.githubusercontent.com/ntkhang03/Goat-Bot-V2/main/versions.json");

		const currentVersion = require("../../package.json").version;
		if (compareVersion(version, currentVersion) < 1)
			return message.reply(getLang("noUpdates", currentVersion));

		const newVersions = versions.slice(versions.findIndex(v => v.version == currentVersion) + 1);

		let fileWillUpdate = [...new Set(newVersions.map(v => Object.keys(v.files || {})).flat())]
			.sort()
			.filter(f => f?.length);
		const totalUpdate = fileWillUpdate.length;
		fileWillUpdate = fileWillUpdate
			.slice(0, 10)
			.map(file => ` - ${file}`).join("\n");

		let fileWillDelete = [...new Set(newVersions.map(v => Object.keys(v.deleteFiles || {}).flat()))]
			.sort()
			.filter(f => f?.length);
		const totalDelete = fileWillDelete.length;
		fileWillDelete = fileWillDelete
			.slice(0, 10)
			.map(file => ` - ${file}`).join("\n");

		// Prompt user to update
		message.reply(
			getLang(
				"updatePrompt",
				currentVersion,
				version,
				fileWillUpdate + (totalUpdate > 10 ? "\n" + getLang("andMore", totalUpdate - 10) : ""),
				totalDelete > 0 ? "\n" + getLang(
					"fileWillDelete",
					fileWillDelete + (totalDelete > 10 ? "\n" + getLang("andMore", totalDelete - 10) : "")
				) : ""
			), (err, info) => {
				if (err)
					return console.error(err);

				global.GoatBot.onReaction.set(info.messageID, {
					messageID: info.messageID,
					threadID: info.threadID,
					authorID: event.senderID,
					commandName
				});
			});
	},

	onReaction: async function ({ message, getLang, Reaction, event, commandName }) {
		const { userID } = event;
		if (userID != Reaction.authorID)
			return;

		const { data: lastCommit } = await axios.get('https://api.github.com/repos/ntkhang03/Goat-Bot-V2/commits/main');
		const lastCommitDate = new Date(lastCommit.commit.committer.date);
		// if < 5min then stop update and show message
		if (new Date().getTime() - lastCommitDate.getTime() < 5 * 60 * 1000) {
			const minutes = Math.floor((new Date().getTime() - lastCommitDate.getTime()) / 1000 / 60);
			const seconds = Math.floor((new Date().getTime() - lastCommitDate.getTime()) / 1000 % 60);
			const minutesCooldown = Math.floor((5 * 60 * 1000 - (new Date().getTime() - lastCommitDate.getTime())) / 1000 / 60);
			const secondsCooldown = Math.floor((5 * 60 * 1000 - (new Date().getTime() - lastCommitDate.getTime())) / 1000 % 60);
			return message.reply(getLang("updateTooFast", minutes, seconds, minutesCooldown, secondsCooldown));
		}

		await message.reply(getLang("updateConfirmed"));
		// Update chatbot
		execSync("node update", {
			stdio: "inherit"
		});
		fs.writeFileSync(dirBootLogTemp, event.threadID);

		message.reply(getLang("updateComplete"), (err, info) => {
			if (err)
				return console.error(err);

			global.GoatBot.onReply.set(info.messageID, {
				messageID: info.messageID,
				threadID: info.threadID,
				authorID: event.senderID,
				commandName
			});
		});
	},

	onReply: async function ({ message, getLang, event }) {
		if (['نعم', 'لا'].includes(event.body?.toLowerCase())) {
			await message.reply(getLang("botWillRestart"));
			process.exit(2);
		}
	}
};

function compareVersion(version1, version2) {
	const v1 = version1.split(".");
	const v2 = version2.split(".");
	for (let i = 0; i < 3; i++) {
		if (parseInt(v1[i]) > parseInt(v2[i]))
			return 1;
		if (parseInt(v1[i]) < parseInt(v2[i]))
			return -1;
	}
	return 0;
}
