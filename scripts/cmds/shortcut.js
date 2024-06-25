const { getExtFromUrl, drive, getStreamFromURL } = global.utils;

module.exports = {
	config: {
		name: 'الردود',
		aliases: ['short'],
		version: '1.13',
		author: 'NTKhang',
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: 'Thêm một phím tắt cho bạn',
			en: 'قم بإضافة ردود للبوت'
		},
		longDescription: {
			vi: 'Thêm một phím tắt cho tin nhắn trong nhóm chat của bạn',
			en: 'قم بإضافة ردود للمجموعة الخاصة بك'
		},
		category: 'خدمات',
		guide: {
			vi: '   {pn} add <word> => <content>: thêm một phím tắt cho bạn (có thể gửi kèm hoặc phản hồi một tin nhắn có file để thêm tệp đính kèm)'
				+ '\n   Ví dụ:\n    {pn} add hi => Xin chào mọi người'
				+ '\n'
				+ '\n   {pn} del <word>: xóa một phím tắt'
				+ '\n   Ví dụ:\n    {pn} del hi'
				+ '\n'
				+ '\n   {pn} [remove | reset]: xóa bỏ tất cả các phím tắt trong nhóm chat của bạn'
				+ '\n'
				+ '\n   {pn} list: xem danh sách tất cả các phím tắt của bạn'
				+ '\n   {pn} list start <keyword>: xem danh sách các phím tắt của bạn bắt đầu bằng từ khóa <keyword>'
				+ '\n   {pn} list end <keyword>: xem danh sách các phím tắt của bạn kết thúc bằng từ khóa <keyword>'
				+ '\n   {pn} list contain <keyword>: xem danh sách các phím tắt của bạn có chứa từ khóa <keyword>',
			en: '   {pn} إضافة <الكلمة => <المحتوى>: قم بإضافة رد من أجلك (يمكن أن يكون فيديو او أغنية)'
				+ '\n   مثال :\n    {pn} إضافة السلام عليكم => وعليكم السلام ورحمة الله وبركاته'
				+ '\n'
				+ '\n   {pn} حذف <الكلمة>: قم بحذف الرد'
				+ '\n   مثال :\n    {pn} حذف أهلا'
				+ '\n'
				+ '\n   {pn} إزالة : قم بإزالة جميع الردود في مجموعتك'
				+ '\n'
				+ '\n   {pn} قائمة : قم برؤية قائمة الردود الخاصة بك'
				+ '\n   {pn} قائمة بدأ <كلمة>: قم بالبدأ بقائمة الردود  الخاصة ب <الكلمة>'
				+ '\n   {pn} القائمة النهاية <الكلمة>: قم برؤية نهاي  الردود للكلمة <الكلمة>'
				+ '\n   {pn} قائمة محتوى <الكلمة>: قم برؤية قائمة محتوى الردود لل <الكلمة>'
		}
	},

	langs: {
		vi: {
			missingContent: 'Vui lòng nhập nội dung tin nhắn',
			shortcutExists: 'Shortcut %1 đã tồn tại, thả cảm xúc bất kì vào tin nhắn này để thay thế nội dung của shortcut',
			shortcutExistsByOther: 'Shortcut %1 đã được thêm vào bởi thành viên khác, vui lòng thử từ khóa khác',
			added: 'Đã thêm shortcut %1 => %2',
			addedAttachment: ' với %1 tệp đính kèm',
			missingKey: 'Vui lòng nhập từ khóa của shortcut muốn xóa',
			notFound: 'Không tìm thấy shortcut nào cho từ khóa %1 trong nhóm chat của bạn',
			onlyAdmin: 'Chỉ quản trị viên mới có thể xóa shortcut của người khác',
			deleted: 'Đã xóa shortcut %1',
			empty: 'Nhóm chat của bạn chưa thêm shortcut nào',
			message: 'Tin nhắn',
			attachment: 'Tệp đính kèm',
			list: 'Danh sách các shortcut của bạn',
			listWithTypeStart: 'Danh sách các shortcut của nhóm bạn (bắt đầu bằng "%1")',
			listWithTypeEnd: 'Danh sách các shortcut của nhóm bạn (kết thúc bằng "%1")',
			listWithTypeContain: 'Danh sách các shortcut của nhóm bạn (chứa "%1")',
			listWithTypeStartNot: 'Nhóm bạn không có shortcut nào bắt đầu bằng "%1"',
			listWithTypeEndNot: 'Nhóm bạn không có shortcut nào kết thúc bằng "%1"',
			listWithTypeContainNot: 'Nhóm bạn không có shortcut nào chứa "%1"',
			onlyAdminRemoveAll: 'Chỉ quản trị viên mới có thể xóa tất cả các shortcut trong nhóm chat',
			confirmRemoveAll: 'Bạn có chắc muốn xóa tất cả các shortcut trong nhóm chat này không? (thả cảm xúc vào tin nhắn này để xác nhận)',
			removedAll: 'Đã xóa tất cả các shortcut trong nhóm chat của bạn'
		},
		en: {
			missingContent: ' ⚠️ | قم بإدخال محتوى الرسالة ',
			shortcutExists: ' ⚠️ | الرد "%1" هو موجود بالفعل تفاعل مع الرسالة بإيموحي من أجل مكان الرد القديم بالجديد',
			shortcutExistsByOther: '⚠️ | الرد %1 تمت إضافة من قبل عضو سابقا جرب شيئا آخر',
			added: ' ✅ | تمت إضافة الرد %1 => %2 بنجاح',
			addedAttachment: ' ⁉️ | مع %1 من المرافق',
			missingKey: ' ⚠️ | قم بإدخال إسم الرد',
			notFound: ' ⚠️ | لم يتم إيجاد أي رد بالنسبة للكلمة %1 في مجموعتك',
			onlyAdmin: ' ❌ | فقط آدمن المجموعة يمكنهم حذف ردود الآخرين إن لم تعجبعهم',
			deleted: ' ✅ | تم حذف الرد %1 بنجاح',
			empty: '⚠️ | لم تقم مجموعتكم بإضافة أي رد',
			message: 'الرسالة',
			attachment: 'مرفق',
			list: 'قائمة الردود الخاصة بك',
			listWithTypeStart: ' 🌟 | قائمة الردود الخاصة بك (اللتي تبدأ ب "%1")',
			listWithTypeEnd: ' 🌟 | قائمة الردود الخاصة بك (اللتي تنتهي ب "%1")',
			listWithTypeContain: ' ⚜️ | قائمة الردود الخاصة بك (المحتوى "%1")',
			listWithTypeStartNot: ' ⁉️ | مجموعتك ليس بها أي رد يبدأ ب "%1"',
			listWithTypeEndNot: ' ❌ | مجموعتك ليس بها أي رد ينتهي ب "%1"',
			listWithTypeContainNot: ' ⁉️ |  مجموعتك ليس لها اي رد يحتوى على ردود ل "%1"',
			onlyAdminRemoveAll: ' ❌ | فقط آدمن المجموعة يمكنهم إزالة جميع الردود في المجموعة',
			confirmRemoveAll: ' ⚠️ |هل أنت متأكد أنك تريد إزالة جميع الردود في هذه المجموعة ؟ \n 🌟 | (تفاعل مع هذه الرسالة للتأكيد)',
			removedAll: ' ✅ | تم إزالة جميع الردود في المجموعة بنجاح'
		}
	},

	onStart: async function ({ args, threadsData, message, event, role, usersData, getLang, commandName }) {
		const { threadID, senderID, body } = event;
		const shortCutData = await threadsData.get(threadID, 'data.shortcut', []);

		switch (args[0]) {
			case 'إضافة': {
				const split = body.split(' ').slice(2).join(' ').split('=>');
				const attachments = [
					...event.attachments,
					...(event.messageReply?.attachments || [])
				].filter(item => ["photo", 'png', "animated_image", "video", "audio"].includes(item.type));

				let key = split[0];
				let content = split.slice(1).join('=>');

				if (!key || !content && attachments.length === 0)
					return message.reply(getLang('missingContent'));

				key = key.trim().toLowerCase();
				content = (content || "").trim();

				const alreadyExists = shortCutData.find(item => item.key == key);
				if (alreadyExists) {
					if (alreadyExists.author == senderID)
						return message.reply(getLang('shortcutExists', key), async (err, info) => {
							if (err)
								return;
							global.GoatBot.onReaction.set(info.messageID, {
								commandName,
								messageID: info.messageID,
								author: senderID,
								type: 'replaceContent',
								newShortcut: await createShortcut(key, content, attachments, threadID, senderID)
							});
						});
					else
						return message.reply(getLang('shortcutExistsByOther'));
				}

				const newShortcut = await createShortcut(key, content, attachments, threadID, senderID);
				shortCutData.push(newShortcut);
				await threadsData.set(threadID, shortCutData, 'data.shortcut');
				let msg = `${getLang('added', key, content)}\n`;
				if (newShortcut.attachments.length > 0)
					msg += getLang('addedAttachment', newShortcut.attachments.length);
				message.reply(msg);
				break;
			}
			case 'حذف':
			case 'مسح': {
				const key = args.slice(1).join(' ')?.trim()?.toLowerCase();
				if (!key)
					return message.reply(getLang('missingKey'));
				const index = shortCutData.findIndex(x => x.key === key);
				if (index === -1)
					return message.reply(getLang('notFound', key));
				if (senderID != shortCutData[index].author && role < 1)
					return message.reply(getLang('onlyAdmin'));
				shortCutData.splice(index, 1);
				await threadsData.set(threadID, shortCutData, 'data.shortcut');
				message.reply(getLang('deleted', key));
				break;
			}
			case 'قائمة': {
				if (shortCutData.length === 0)
					return message.reply(getLang('empty'));
				let shortCutList = shortCutData;
				let stringType = getLang('list');

				if (args[1]) {
					const type = args[1];
					const keyword = args.slice(2).join(' ');

					if (type == "start") {
						shortCutList = shortCutData.filter(x => x.key.startsWith(keyword));
						stringType = getLang('listWithTypeStart', keyword);
					}
					else if (type == "end") {
						shortCutList = shortCutData.filter(x => x.key.endsWith(keyword));
						stringType = getLang('listWithTypeEnd', keyword);
					}
					else if (["contain", "has", "have", "include", "in"].includes(type)) {
						shortCutList = shortCutData.filter(x => x.key.includes(keyword));
						stringType = getLang('listWithTypeContain', keyword);
					}
					else {
						shortCutList = shortCutData.filter(x => x.key.startsWith(type));
						stringType = getLang('listWithTypeStart', type);
					}

					if (shortCutList.length === 0) {
						if (type == "start")
							return message.reply(getLang('listWithTypeStartNot', keyword));
						else if (type == "end")
							return message.reply(getLang('listWithTypeEndNot', keyword));
						else
							return message.reply(getLang('listWithTypeContainNot', keyword));
					}
				}

				const list = (
					await Promise.all(
						shortCutList.map(async (x, index) =>
							`[${index + 1}] ${x.key} => ${x.content ? 1 : 0} ${getLang("message")}, ${x.attachments.length} ${getLang('attachment')} (${await usersData.getName(x.author)})`
						)
					)
				).join('\n');
				message.reply(stringType + '\n' + list);
				break;
			}
			case 'إزالة':
			case '-rm':
			case 'إعادة_التعيين':
			case 'rm': {
				if (threadID != senderID && role < 1)
					return message.reply(getLang('onlyAdminRemoveAll'));
				message.reply(getLang('confirmRemoveAll'), (err, info) => {
					if (err)
						return;
					global.GoatBot.onReaction.set(info.messageID, {
						commandName,
						messageID: info.messageID,
						author: senderID,
						type: 'removeAll'
					});
				});
				break;
			}
			default:
				message.SyntaxError();
				break;
		}
	},

	onReaction: async function ({ event, message, threadsData, getLang, Reaction }) {
		const { author } = Reaction;
		const { threadID, userID } = event;
		if (author != userID)
			return;
		if (Reaction.type == 'removeAll') {
			await threadsData.set(threadID, [], "data.shortcut");
			return message.reply(getLang('removedAll'));
		}
		else if (Reaction.type == 'replaceContent') {
			const shortCutData = await threadsData.get(threadID, 'data.shortcut', []);
			const index = shortCutData.findIndex(x => x.key === Reaction.newShortcut.key);
			if (index == -1)
				shortCutData.push(Reaction.newShortcut);
			else
				shortCutData[index] = Reaction.newShortcut;
			await threadsData.set(threadID, shortCutData, 'data.shortcut');
			return message.reply(getLang('added', Reaction.newShortcut.key, Reaction.newShortcut.content) + (Reaction.newShortcut.attachments.length > 0 ? `\n${getLang('addedAttachment', Reaction.newShortcut.attachments.length)}` : ''));
		}
	},

	onChat: async ({ threadsData, message, event }) => {
		const { threadID } = event;
		const body = (event.body || '').toLowerCase();
		const dataShortcut = await threadsData.get(threadID, 'data.shortcut', []);
		const findShortcut = dataShortcut.find(x => x.key === body);
		let attachments = [];
		if (findShortcut) {
			if (findShortcut.attachments.length > 0) {
				for (const id of findShortcut.attachments)
					attachments.push(drive.getFile(id, 'stream', true));
				attachments = await Promise.all(attachments);
			}

			message.reply({
				body: findShortcut.content,
				attachment: attachments
			});
		}
	}
};

async function createShortcut(key, content, attachments, threadID, senderID) {
	let attachmentIDs = [];
	if (attachments.length > 0)
		attachmentIDs = attachments.map(attachment => new Promise(async (resolve) => {
			const ext = attachment.type == "audio" ? "mp3" : getExtFromUrl(attachment.url);
			const fileName = `${Date.now()}.${ext}`;
			const infoFile = await drive.uploadFile(`shortcut_${threadID}_${senderID}_${fileName}`, attachment.type == "audio" ? "audio/mpeg" : undefined, await getStreamFromURL(attachment.url));
			resolve(infoFile.id);
		}));
	return {
		key: key.trim().toLowerCase(),
		content,
		attachments: await Promise.all(attachmentIDs),
		author: senderID
	};
}