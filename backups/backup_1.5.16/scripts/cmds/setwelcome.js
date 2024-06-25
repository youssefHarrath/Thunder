const { drive, getStreamFromURL, getExtFromUrl, getTime } = global.utils;

module.exports = {
	config: {
		name: "ضبط_الترحيب",
		aliases: ["setwc"],
		version: "1.6",
		author: "NTKhang",
		countDown: 5,
		role: 1,
		shortDescription: {
			vi: "Chỉnh sửa nội dung tin nhắn chào mừng",
			en: "قم بتعديل رسالة الترحيب او قم بتعيين صورة أو فيديو مرفوقة ب الرسالة"
		},
		longDescription: {
			vi: "Chỉnh sửa nội dung tin nhắn chào mừng thành viên mới tham gia vào nhóm chat của bạn",
			en: "قم بتحرير محتوى رسالة الترحيب عندما ينضم عضو جديد إلى الدردشة الجماعية الخاصة بك"
		},
		category: "النظام",
		guide: {
			vi: {
				body: "   {pn} text [<nội dung> | reset]: chỉnh sửa nội dung văn bản hoặc reset về mặc định, với những shortcut có sẵn:"
					+ "\n  + {userName}: tên của thành viên mới"
					+ "\n  + {userNameTag}: tên của thành viên mới (tag)"
					+ "\n  + {boxName}:  tên của nhóm chat"
					+ "\n  + {multiple}: bạn || các bạn"
					+ "\n  + {session}:  buổi trong ngày"
					+ "\n\n   Ví dụ:"
					+ "\n    {pn} text Hello {userName}, welcome to {boxName}, chúc {multiple} một ngày mới vui vẻ"
					+ "\n"
					+ "\n   Reply (phản hồi) hoặc gửi kèm một tin nhắn có file với nội dung {pn} file: để thêm tệp đính kèm vào tin nhắn chào mừng (ảnh, video, audio)"
					+ "\n\n   Ví dụ:"
					+ "\n    {pn} file reset: xóa gửi file",
				attachment: {
					[`${__dirname}/assets/guide/setwelcome/setwelcome_vi_1.png`]: "https://i.ibb.co/vd6bQrW/setwelcome-vi-1.png"
				}
			},
			en: {
				body: "   {pn} الرسالة [<المحتوى> | إعادة_التعيين]: قم بالاعديل على الرسالة أو قم بإعادة تعيين رسالة الترحيب إلى الأصل:"
					+ "\n  + {userName}: إسم العضو الجديد"
					+ "\n  + {userNameTag}: إسم العضو الجديد (تاغ)"
					+ "\n  + {boxName}:  إسم للمجموعة"
					+ "\n  + {multiple}: أنت || أنتم"
					+ "\n  + {session}:  أيام الأسبوع"
					+ "\n\n   مثال :"
					+ "\n    {pn} رسالة أهلا {userName}, مرحبا بك في مجموعة {boxName},  {multiple}  أتمنى لك {session} سعيدا"
					+ "\n"
					+ "\n   قم بالرد على صورة او صورة متحركة أو فيديو أو صوت إستخدم {pn} ملف : من أجل إضافة مرفق مع الرسالة  (صورة,فيديو, صوت)"
					+ "\n\n   مثال :"
					+ "\n    {pn} ملف إعادة_التعيين: حذف المرفق",
				attachment: {
					[`${__dirname}/assets/guide/setwelcome/setwelcome_en_1.png`]: "https://i.ibb.co/vsCz0ks/setwelcome-en-1.png"
				}
			}
		}
	},

	langs: {
		vi: {
			turnedOn: "Đã bật chức năng chào mừng thành viên mới",
			turnedOff: "Đã tắt chức năng chào mừng thành viên mới",
			missingContent: "Vui lùng nhập nội dung tin nhắn",
			edited: "Đã chỉnh sửa nội dung tin nhắn chào mừng của nhóm bạn thành: %1",
			reseted: "Đã reset nội dung tin nhắn chào mừng",
			noFile: "Không có tệp đính kèm tin nhắn chào mừng nào để xóa",
			resetedFile: "Đã reset tệp đính kèm thành công",
			missingFile: "Hãy phản hồi tin nhắn này kèm file ảnh/video/audio",
			addedFile: "Đã thêm %1 tệp đính kèm vào tin nhắn chào mừng của nhóm bạn"
		},
		en: {
			turnedOn: " ✅ | تم تشغيل رسالة الترحيب",
			turnedOff: " ❌ | تم إيقاف رسالة الترحيب",
			missingContent: " ⚠️ | قم بإدخال محتوى الرسالة",
			edited: " ✅ | تم تعديل رسالة الترحيب في مجموعتك إلى : %1",
			reseted: " 🌟 | تم إعادة تعيين رسالة الترحيب في المجموعة إلى الأصل",
			noFile: " ⚠️ | لايوجد أي مرفق لحذفه",
			resetedFile: " ✅ | تمت إعادة تعيين المرفق بنجاح",
			missingFile: " ⚜️ | قم بالرد على الرسالة ب صورة/فيديو/ضوت ملف",
			addedFile: " ✅ | تمت إضافة  %1 كمرفق للرسالة الترحيب في المجموعة بنجاح"
		}
	},

	onStart: async function ({ args, threadsData, message, event, commandName, getLang }) {
		const { threadID, senderID, body } = event;
		const { data, settings } = await threadsData.get(threadID);

		switch (args[0]) {
			case "رسالة": {
				if (!args[1])
					return message.reply(getLang("missingContent"));
				else if (args[1] == "إعادة_التشغيل")
					delete data.welcomeMessage;
				else
					data.welcomeMessage = body.slice(body.indexOf(args[0]) + args[0].length).trim();
				await threadsData.set(threadID, {
					data
				});
				message.reply(data.welcomeMessage ? getLang("edited", data.welcomeMessage) : getLang("reseted"));
				break;
			}
			case "ملف": {
				if (args[1] == "إعادة_التشغيل") {
					const { welcomeAttachment } = data;
					if (!welcomeAttachment)
						return message.reply(getLang("noFile"));
					try {
						await Promise.all(data.welcomeAttachment.map(fileId => drive.deleteFile(fileId)));
						delete data.welcomeAttachment;
					}
					catch (e) { }
					await threadsData.set(threadID, {
						data
					});
					message.reply(getLang("resetedFile"));
				}
				else if (event.attachments.length == 0 && (!event.messageReply || event.messageReply.attachments.length == 0))
					return message.reply(getLang("missingFile"), (err, info) => {
						global.GoatBot.onReply.set(info.messageID, {
							messageID: info.messageID,
							author: senderID,
							commandName
						});
					});
				else {
					saveChanges(message, event, threadID, senderID, threadsData, getLang);
				}
				break;
			}
			case "تشغيل":
			case "إيقاف": {
				settings.sendWelcomeMessage = args[0] == "on";
				await threadsData.set(threadID, { settings });
				message.reply(settings.sendWelcomeMessage ? getLang("turnedOn") : getLang("turnedOff"));
				break;
			}
			default:
				message.SyntaxError();
				break;
		}
	},

	onReply: async function ({ event, Reply, message, threadsData, getLang }) {
		const { threadID, senderID } = event;
		if (senderID != Reply.author)
			return;

		if (event.attachments.length == 0 && (!event.messageReply || event.messageReply.attachments.length == 0))
			return message.reply(getLang("missingFile"));
		saveChanges(message, event, threadID, senderID, threadsData, getLang);
	}
};

async function saveChanges(message, event, threadID, senderID, threadsData, getLang) {
	const { data } = await threadsData.get(threadID);
	const attachments = [...event.attachments, ...(event.messageReply?.attachments || [])].filter(item => ["photo", 'png', "animated_image", "video", "audio"].includes(item.type));
	if (!data.welcomeAttachment)
		data.welcomeAttachment = [];

	await Promise.all(attachments.map(async attachment => {
		const { url } = attachment;
		const ext = getExtFromUrl(url);
		const fileName = `${getTime()}.${ext}`;
		const infoFile = await drive.uploadFile(`setwelcome_${threadID}_${senderID}_${fileName}`, await getStreamFromURL(url));
		data.welcomeAttachment.push(infoFile.id);
	}));

	await threadsData.set(threadID, {
		data
	});
	message.reply(getLang("addedFile", attachments.length));
}
