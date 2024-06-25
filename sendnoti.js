const { getStreamsFromAttachment, getTime } = global.utils;

module.exports = {
	config: {
		name: "إرسال_إشعار",
		version: "1.4",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "Tạo và gửi thông báo đến các nhóm",
			en: "إنشاء وإرسال إشعار إلى المجموعات"
		},
		longDescription: {
			vi: "Tạo và gửi thông báo đến các nhóm do bạn quản lý",
			en: "قم بإنشاء إشعار وإرساله إلى المجموعات التي تديرها"
		},
		category: "المجموعة",
		guide: {
			vi: "   {pn} create <groupName>: Tạo một group noti (notification) mới với tên gọi <groupName>"
				+ "\n   Ví dụ:\n    {pn} create TEAM1"
				+ "\n\n   {pn} add <groupName>: thêm box chat hiện tại vào group noti <groupName> (bạn phải là quản trị viên của box chat này)"
				+ "\n   Ví dụ:\n    {pn} add TEAM1"
				+ "\n\n   {pn} list: hiển thị danh sách các group noti bạn đang quản lý"
				+ "\n\n   {pn} info <groupName>: xem thông tin của group noti <groupName>"
				+ "\n\n   {pn} delete: xóa box chat hiện tại khỏi group noti <groupName> (bạn phải là người tạo group noti này)"
				+ "\n   Ví dụ:\n    {pn} delete TEAM1"
				+ "\n\n   {pn} send <groupName> | <message>: gửi thông báo tới tất cả các nhóm trong group noti <groupName> (bạn phải là quản trị viên của những box đó)"
				+ "\n   Ví dụ:\n    {pn} remove TEAM1"
				+ "\n\n   {pn} remove <groupName>: xóa group noti <groupName> (bạn phải là người tạo group noti <groupName>)"
				+ "\n   Ví dụ:\n    {pn} remove TEAM1",
			en: "   {pn} إنشاء <مجموعة الأسماء>: قم بإنشاء مجموعة إعلام جديدة بالاسم <إسم المجموعة>"
				+ "\n   مثال:\n    {pn} إنشاء فريق1"
				+ "\n\n   {pn} إضافة <إسم المجموعة>: إضافة مجموعة الدردشة الحالي إلى مجموعة الإشعارات <إسم المجموعة> (يجب أن تكون مسؤولاً عن هذه الدردشة الجماعية)"
				+ "\n   مثال:\n    {pn} إضافة فريق1"
				+ "\n\n   {pn} قائمة: إظهار قائمة مجموعات الإشعارات التي تديرها"
				+ "\n\n   {pn} معلومات <إسم المجموعة>: عرض معلومات مجموعة الإخطار <إسم المجموعة>"
				+ "\n\n   {pn} حذف: إزالة مجموعة الدردشة الحالية من مجموعة الإشعارات <إسم المجموعة> (يجب أن تكون منشئ هذه المجموعة)"
				+ "\n   مثال:\n    {pn} حذف فريق1"
				+ "\n\n   {pn} إرسال <إسم المجموعة> | <رسالة>: إرسال إشعار إلى جميع المجموعات في مجموعة الإعلام <إسم المجموعة> (يجب أن تكون مسؤولاً عن تلك المجموعات)"
				+ "\n   مثال:\n    {pn} إرسال فريق1 أريدكم جميعا هنا"
				+ "\n\n   {pn} إزالة <إسم المجموعة>: إزالة مجموعة الإشعارات <إسم المجموعة> (يجب أن تكون قد أنشأت مجموعة الإشعارات <إسم المجموعة>)"
				+ "\n   مثال:\n    {pn} إزالة فريق1"
		}
	},

	langs: {
		vi: {
			missingGroupName: "Vui lòng nhập tên groupNoti",
			groupNameExists: "Group send noti mang tên %1 đã được tạo trước đó bởi bạn rồi, vui lòng chọn tên khác",
			createdGroup: "Đã tạo group send noti thành công:\n- Name: %1\n- ID: %2",
			missingGroupNameToAdd: "Vui lòng nhập tên groupNoti bạn muốn thêm nhóm chat này vào",
			groupNameNotExists: "Hiện tại bạn chưa tạo/quản lý group noti nào mang tên: %1",
			notAdmin: "Bạn không phải là quản trị viên của nhóm chat này",
			added: "Đã thêm nhóm chat hiện tại vào group noti: %1",
			missingGroupNameToDelete: "Vui lòng nhập tên groupNoti bạn muốn xóa nhóm chat này khỏi danh sách",
			notInGroup: "Hiện tại nhóm chat này chưa có trong group noti %1",
			emptyList: "Hiện tại bạn chưa tạo/quản lý group noti nào",
			showList: "Danh sách các group noti bạn đang quản lý:\nHiển thị theo định dạng:\n<Tên groupNoti> - <Số lượng nhóm chat trong groupNoti>\n%1",
			deleted: "Đã xóa nhóm chat hiện tại khỏi group noti: %1",
			failed: "Đã xảy ra lỗi khi gửi thông báo đến %1 nhóm chat: \n%2",
			missingGroupNameToRemove: "Vui lòng nhập tên groupNoti bạn muốn xóa bỏ",
			removed: "Đã xóa bỏ group noti: %1",
			missingGroupNameToSend: "Vui lòng nhập tên groupNoti bạn muốn gủi tin nhắn",
			groupIsEmpty: "Hiện tại group noti \"%1\" chưa có nhóm chat nào trong danh sách",
			sending: "Đang gửi thông báo đến %1 nhóm chat",
			success: "Đã gửi thông báo đến %1 nhóm chat trong group noti \"%2\" thành công",
			notAdminOfGroup: "Bạn không phải là quản trị viên của nhóm này",
			missingGroupNameToView: "Vui lòng nhập tên groupNoti bạn muốn xem thông tin",
			groupInfo: "- Group Name: %1\n- ID: %2\n- Ngày tạo: %3\n%4 ",
			groupInfoHasGroup: "- Gồm các nhóm chat: \n%1",
			noGroup: "Hiện tại bạn chưa tạo/quản lý group noti nào"
		},
		en: {
			missingGroupName: "الرجاء إدخال اسم مجموعة الإشعارات",
			groupNameExists: "مجموعة الإشعارات بالاسم %1 تم إنشاؤه بواسطتك من قبل، يرجى اختيار اسم آخر",
			createdGroup: "تم إنشاء مجموعة الإشعارات بنجاح:\n- الإسم: %1\n- آيدي: %2",
			missingGroupNameToAdd: "الرجاء إدخال اسم مجموعةالإشعارات الذي تريد إضافة هذه الدردشة الجماعية إليه",
			groupNameNotExists: "لم تقم بإنشاء/إدارة أي مجموعة إعلام بالاسم: %1",
			notAdmin: "أنت لست مسؤولاً عن هذه الدردشة الجماعية",
			added: "تمت إضافة الدردشة الجماعية الحالية إلى مجموعة الإشعارات: %1",
			missingGroupNameToDelete: "الرجاء إدخال اسم الإشعارت للمجموعة التي تريد حذف هذه الدردشة الجماعية من القائمة",
			notInGroup: "الدردشة الجماعية الحالية ليست في مجموعة الإشعارات %1",
			emptyList: "لم تقم بإنشاء/إدارة أي مجموعة إعلام",
			showList: "قائمة مجموعات الإشعارات التي تديرها:\nعرض في الشكل:\n<اسم مجموعة الإشعارات> - <عدد المجموعات في مجموعة الإعلام>\n%1",
			deleted: "تم حذف الدردشة الجماعية الحالية من مجموعة الإشعارات: %1",
			failed: "فشل إرسال الإشعار إلى %1 محادثات جماعية: \n%2",
			missingGroupNameToRemove: "الرجاء إدخال اسم مجموعة الإشعارات الذي تريد إزالته",
			removed: "تمت إزالة مجموعة الإشعارات: %1",
			missingGroupNameToSend: "الرجاء إدخال اسم مجموعة الإشعارات الذي تريد إرسال الرسالة",
			groupIsEmpty: "مجموعة الإشعارات \"%1\" فارغ",
			sending: "إرسال الإخطار إلى %1 محادثات جماعية",
			success: "تم إرسال الإشعارات إلى %1 محادثات جماعية في مجموعة الإشعارات \"%2\" successfully",
			notAdminOfGroup: "أنت لست مسؤولاً عن هذه المجموعة",
			missingGroupNameToView: "الرجاء إدخال اسم المجموعة الذي تريد عرض المعلومات",
			groupInfo: "- أسم المجموعة: %1\n - آيدي: %2\n - أنشئت في: %3\n%4 ",
			groupInfoHasGroup: "- لديه محادثات جماعية: \n%1",
			noGroup: "لم تقم بإنشاء/إدارة أي مجموعة إعلام"
		}
	},

	onStart: async function ({ message, event, args, usersData, threadsData, api, getLang, role }) {
		const { threadID, senderID } = event;
		const groupsSendNotiData = await usersData.get(senderID, 'data.groupsSendNoti', []);

		switch (args[0]) {
			case "إنشاء": {
				const groupName = args.slice(1).join(' ');
				const groupID = Date.now();
				if (!groupName)
					return message.reply(getLang('missingGroupName'));

				const groupsSendNotiData = await usersData.get(senderID, 'data.groupsSendNoti', []);
				if (groupsSendNotiData.some(item => item.groupName === groupName))
					return message.reply(getLang('groupNameExists', groupName));

				groupsSendNotiData.push({
					groupName,
					groupID,
					threadIDs: []
				});
				await usersData.set(senderID, groupsSendNotiData, 'data.groupsSendNoti');
				message.reply(getLang('createdGroup', groupName, groupID));
				break;
			}
			case "إضافة": {
				const groupName = args.slice(1).join(' ');
				if (!groupName)
					return message.reply(getLang('missingGroupNameToAdd'));
				const getGroup = (groupsSendNotiData || []).find(item => item.groupName == groupName);

				if (!getGroup)
					return message.reply(getLang('groupNameNotExists', groupName));

				if (role < 1)
					return message.reply(getLang('notAdmin'));

				getGroup.threadIDs.push(threadID);
				await usersData.set(senderID, groupsSendNotiData, 'data.groupsSendNoti');

				message.reply(getLang('added', groupName));
				break;
			}
			case "قائمة": {
				if (!groupsSendNotiData.length)
					return message.reply(getLang('noGroup'));

				const msg = groupsSendNotiData.reduce((acc, item) => {
					acc += `+ ${item.groupName} - ${item.threadIDs.length}\n`;
					return acc;
				}, '');

				message.reply(getLang('showList', msg));
				break;
			}
			case "حذف": {
				const groupName = args.slice(1).join(' ');
				if (!groupName)
					return message.reply(getLang('missingGroupNameToDelete'));

				const getGroup = (groupsSendNotiData || []).find(item => item.groupName == groupName);
				if (!getGroup)
					return message.reply(getLang('groupNameNotExists', groupName));

				const findIndexThread = getGroup.threadIDs.findIndex(item => item == threadID);
				if (findIndexThread == -1)
					return message.reply(getLang('notInGroup', groupName));

				getGroup.threadIDs.splice(findIndexThread, 1);
				await usersData.set(senderID, groupsSendNotiData, 'data.groupsSendNoti');

				message.reply(getLang('deleted', groupName));
				break;
			}
			case "إزالة":
			case "-r": {
				const groupName = args.slice(1).join(' ');
				if (!groupName)
					return message.reply(getLang('missingGroupNameToRemove'));
				const findIndex = (groupsSendNotiData.threadIDs || []).findIndex(item => item.groupName == groupName);

				if (findIndex == -1)
					return message.reply(getLang('groupNameNotExists', groupName));

				groupsSendNotiData.splice(findIndex, 1);
				await usersData.set(senderID, groupsSendNotiData, 'data.groupsSendNoti');

				message.reply(getLang('removed', groupName));
				break;
			}
			case "إرسال": {
				const groupName = args.slice(1).join(' ').split('|')[0].trim();
				if (!groupName)
					return message.reply(getLang('missingGroupNameToSend'));

				const getGroup = (groupsSendNotiData || []).find(item => item.groupName == groupName);
				if (!getGroup)
					return message.reply(getLang('groupNameNotExists', groupName));
				if (getGroup.threadIDs.length == 0)
					return message.reply(getLang('groupIsEmpty', groupName));

				const messageSend = args.slice(2).join(' ').split('|').slice(1).join(' ').trim();
				const formSend = {
					body: messageSend
				};

				if (event.attachments.length || event.attachments.messageReply?.attachments.length)
					formSend.attachment = await getStreamsFromAttachment([...event.attachments, ...(event.messageReply?.attachments || [])].filter(item => ["photo", 'png', "animated_image", "video", "audio"].includes(item.type)));

				const success = [];
				const failed = [];
				const pendings = [];

				const { threadIDs } = getGroup;
				const msgSend = message.reply(getLang('sending', groupName, threadIDs.length));
				for (const tid of threadIDs) {
					await new Promise((r) => setTimeout(r, 1000));
					pendings.push(
						new Promise(async (resolve, reject) => {
							const { adminIDs, threadName } = await threadsData.get(tid);
							if (!adminIDs.includes(senderID))
								return reject({
									error: 'PERMISSION_DENIED',
									threadID: tid,
									threadName
								});
							api.sendMessage(formSend, tid, (err) => {
								if (err)
									reject({
										...err,
										threadID: tid,
										threadName
									});
								resolve({
									threadID: tid,
									threadName
								});
							});
						})
					);
				}

				for (const item of pendings) {
					try {
						await item;
						success.push({
							threadID: item.threadID,
							threadName: item.threadName
						});
					}
					catch (err) {
						failed.push({
							threadID: item.threadID,
							threadName: item.threadName,
							error: item.error
						});
					}
				}
				api.unsendMessage((await msgSend).messageID);
				let msg = "";
				if (success.length)
					msg += `${getLang('success', success.length, groupName)}\n`;
				if (failed.length)
					msg += getLang('failed', failed.length,
						failed.map(item => `\n- آيدي: ${item.threadID}`
							+ `\n- الإسم: ${item.threadName}`
							+ `\n- Error: ${item.error == 'PERMISSION_DENIED' ?
								getLang('notAdminOfGroup') :
								''}`
						).join('\n')
					);
				message.reply(msg);

				break;
			}
			case "معلومات": {
				const groupName = args.slice(1).join(' ');
				if (!groupName)
					return message.reply(getLang('missingGroupNameToView'));

				const getGroup = (groupsSendNotiData || []).find(item => item.groupName == groupName);
				if (!getGroup)
					return message.reply(getLang('groupNameNotExists', groupName));
				const { threadIDs } = getGroup;

				const allThreadData = await threadsData.getAll();

				const msg = threadIDs.reduce((acc, tid) => {
					const threadData = allThreadData.find(i => i.threadID == tid) || {};
					acc += ` + آيدي: ${tid}\n + الإسم: ${threadData.threadName || 'null'}\n\n`;
					return acc;
				}, '');

				message.reply(getLang('groupInfo', groupName, getGroup.groupID, getTime(getGroup.groupID, 'DD/MM/YYYY HH:mm:ss'), msg ? getLang('groupInfoHasGroup', msg) : getLang('groupIsEmpty', groupName)));
				break;
			}
			default: {
				return message.SyntaxError();
			}
		}
	}
};