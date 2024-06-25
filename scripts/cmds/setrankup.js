const { drive, getStreamFromURL, getExtFromUrl, getTime } = global.utils;
const checkUrlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

module.exports = {
	config: {
		name: "ضبط_إشعار_تطور_المستوى",
		version: "1.1",
		author: "NTKhang",
		countDown: 0,
		role: 0,
		shortDescription: {
			vi: "Cấu hình rankup",
			en: "تكوين الترتيب"
		},
		longDescription: {
			vi: "Cấu hình rankup",
			en: "إعداد إشعار إرتفاع المستوى"
		},
		category: "المالك",
		guide: {
			vi: "   {pn} text <message>: Cấu hình tin nhắn khi thành viên thăng hạng trong box chat của bạn"
				+ "\n   Với các tham số sau:"
				+ "\n    + {userName}: Tên thành viên"
				+ "\n    + {userNameTag}: Tag tên thành viên"
				+ "\n    + {oldRank}: Rank cũ của thành viên"
				+ "\n    + {currentRank}: Rank hiện tại của thành viên"
				+ "\n   {pn} file <link>: Cấu hình file đính kèm khi thành viên thăng hạng trong box chat của bạn"
				+ "\n   {pn} reset: Đặt lại cấu hình mặc định",
			en: "   {pn} نص <رسالة>: قم بتكوين الرسالة عند ترتيب العضو في  مجموعتك"
				+ "\n   مع المعلمات التالية:"
				+ "\n    + {userName}: اسم الأعضاء"
				+ "\n    + {userNameTag}: اسم العضو العلامة"
				+ "\n    + {oldRank}: رتبة العضو القديمة"
				+ "\n    + {currentRank}: رتبة العضو الحالية"
				+ "\n   {pn} ملف <الرابط>: قم بتكوين الملف المرفق عند ترتيب العضو في ملفك عند المجموعة"
				+ "\n   {pn} إعادة: إعادة التعيين إلى التكوين الافتراضي"
		}
	},

	langs: {
		vi: {
			changedMessage: "Đã thay đổi tin nhắn rankup thành: %1",
			missingAttachment: "Bạn phải đính kèm ảnh để cấu hình ảnh rankup",
			changedAttachment: "Đã thêm %1 tệp đính kèm vào rankup thành công"
		},
		en: {
			changedMessage: "تم تغيير رسالة الترتيب إلى: %1",
			missingAttachment: "يجب عليك إرفاق صورة لتكوين صورة التصنيف",
			changedAttachment: "تمت إضافة %1 من المرفقات إلى التصنيف بنجاح"
		}
	},

	onStart: async function ({ args, message, event, threadsData, getLang }) {
		const { body, threadID, senderID } = event;
		switch (args[0]) {
			case "text": {
				const newContent = body.slice(body.indexOf("text") + 5);
				await threadsData.set(threadID, newContent, "data.rankup.message");
				return message.reply(getLang("changedMessage", newContent));
			}
			case "file":
			case "صورة":
			case "mp3":
			case "video": {
				const attachments = [...event.attachments, ...(event.messageReply?.attachments || [])].filter(item => ["صورة", 'png', "animated_image", "video", "audio"].includes(item.type));
				if (!attachments.length && !(args[1] || '').match(checkUrlRegex))
					return message.reply(getLang("missingAttachment", attachments.length));
				const { data } = await threadsData.get(threadID);
				if (!data.rankup)
					data.rankup = {};
				if (!data.rankup.attachments)
					data.rankup.attachments = [];

				for (const attachment of attachments) {
					const { url } = attachment;
					const ext = getExtFromUrl(url);
					const fileName = `${getTime()}.${ext}`;
					const infoFile = await drive.uploadFile(`setrankup_${threadID}_${senderID}_${fileName}`, await getStreamFromURL(url));
					data.rankup.attachments.push(infoFile.id);
				}
				await threadsData.set(threadID, {
					data
				});
				return message.reply(getLang("changedAttachment"));
			}
		}
	}
};

