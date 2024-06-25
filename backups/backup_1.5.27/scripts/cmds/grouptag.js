module.exports = {
	config: {
		name: "منشن_للمجموعة",
		aliases: ["grtag"],
		version: "1.4",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "Tag theo nhóm",
			en: "منشن من طرف المجموعة"
		},
		longDescription: {
			vi: "Tag thành viên theo nhóm",
			en: "قم بعمل منشن للأعضاء عن طريق المجموعة"
		},
		category: "معلومات",
		guide: {
			vi: "   {pn} add <groupTagName> <@tags>: dùng để thêm nhóm tag mới hoặc thêm thành viên vào nhóm tag đã có"
				+ "\n   Ví dụ:"
				+ "\n    {pn} add TEAM1 @tag1 @tag2"
				+ "\n\n   {pn} del <groupTagName> <@tags>: dùng để xóa các thành viên được tag khỏi nhóm tag <groupTagName>"
				+ "\n   Ví dụ:"
				+ "\n    {pn} del TEAM1 @tag1 @tag2"
				+ "\n\n   {pn} remove <groupTagName>: dùng để xóa nhóm tag"
				+ "\n   Ví dụ:"
				+ "\n    {pn} remove TEAM1"
				+ "\n\n	 {pn} tag <groupTagName>: dùng để tag nhóm tag"
				+ "\n\n   {pn} rename <groupTagName> | <newGroupTagName>: dùng để đổi tên nhóm tag"
				+ "\n\n   {pn} [list | all]: dùng để xem danh sách các nhóm tag trong nhóm chat của bạn"
				+ "\n\n   {pn} info <groupTagName>: dùng để xem thông tin của nhóm tag",
			en: "   {pn} إضافة <إسم المجموعة الممنشنة> <@تاغ>: تستخدم لإضافة علامة مجموعة جديدة أو إضافة أعضاء إلى علامة المجموعة"
				+ "\n   مثال:"
				+ "\n    {pn} إضافة الفريق1 @تاغ الأول @تاغ الثاني"
				+ "\n\n   {pn} حذف <إسم المجموعة الممنشنة> <@تاغ>: إستخدم من أجل إزالة مجموعة من المجموعة الممنشنة"
				+ "\n   مثال:"
				+ "\n    {pn} حذف الفريق1 @تاغ1الأول @تاغ الثاني"
				+ "\n\n   {pn} إزالة <groupTagName>: إستخدممن أجل إزالة المجموعة اللتي تمت منشنتها"
				+ "\n   مثال:"
				+ "\n    {pn} إزالة الفريق الأول"
				+ "\n\n	 {pn} تاغ <إسم المجموعة الممنشنة>: تستعمل من أجل عمل منشن للمجموعة ممنشنة"
				+ "\n\n   {pn} إعادة_التسمية <إسم المجموعة الممنشنة> | <إسم مجموعة ممنشنة جديدة>: تستعمل من أجل إعادة تسمية مجموعة ممنشة"
				+ "\n\n   {pn} [قائمة | الكل]: تستخدم لعرض قائمة المجموعة الممنشنة في الدردشة الجماعية الخاصة بك"
				+ "\n\n   {pn} معلومات <إسم_المجموعة_الممنشنة>: تستعمل من أجل عرض معلومات المجموعة الممنشنة"
		}
	},

	langs: {
		vi: {
			noGroupTagName: "Vui lòng nhập tên nhóm tag",
			noMention: "Bạn chưa tag thành viên nào để thêm vào nhóm tag",
			addedSuccess: "Đã thêm các thành viên sau vào nhóm tag \"%1\":\n%2",
			addedSuccess2: "Đã thêm nhóm tag \"%1\" với các thành viên sau:\n%2",
			existedInGroupTag: "Các thành viên sau:\n%1\nđã có trong nhóm tag \"%2\" từ trước",
			notExistedInGroupTag: "Các thành viên sau:\n%1\nkhông có trong nhóm tag \"%2\"",
			noExistedGroupTag: "Nhóm tag \"%1\" không tồn tại trong box chat của bạn",
			noExistedGroupTag2: "Box chat của bạn chưa thêm nhóm tag nào",
			noMentionDel: "Vui lòng tag thành viên muốn xóa khỏi nhóm tag \"%1\"",
			deletedSuccess: "Đã xóa các thành viên sau:\n%1\nkhỏi nhóm tag \"%2\"",
			deletedSuccess2: "Đã xóa nhóm tag \"%1\"",
			tagged: "Tag nhóm \"%1\":\n%2",
			noGroupTagName2: "Vui lòng nhập tên nhóm tag cũ và tên mới, cách nhau bằng dấu \"|\"",
			renamedSuccess: "Đã đổi tên nhóm tag \"%1\" thành \"%2\"",
			infoGroupTag: "📑 | Tên nhóm: %1\n👥 | Số thành viên: %2\n👨‍👩‍👧‍👦 | Danh sách thành viên:\n %3"
		},
		en: {
			noGroupTagName: "أرجوك أدخل إسم المجموعة الممنشنة",
			noMention: "أنت لم تقم بعمل أي منشن للأعضاء من أجل إضافتهم إلى المجموعة الممنشنة",
			addedSuccess: "تمت إضافة الأعضاء إلى المجموعة الممنشنة\"%1\":\n%2",
			addedSuccess2: "تمت إصافة مجموعة ممنشنة \"%1\" مع أعضاء:\n%2",
			existedInGroupTag: "الأعضاء:\n%1\nموجودين بالفعل في المجموعة الممنشنة\"%2\"",
			notExistedInGroupTag: "الأعضاء:\n%1\nغير متواجدين في المجموعة الممنشنة \"%2\"",
			noExistedGroupTag: "المجموعة الممنشنة \"%1\" لا تتواجد في مجموعتك",
			noExistedGroupTag2: "مجموعتك لم تقم بإضافة أي مجموعة ممنشنة بعد",
			noMentionDel: "المرجو عمل تاغ من أجل حذف المجموعة الممنشنة\"%1\"",
			deletedSuccess: "تم حذف الأعضاء:\n%1\nمن المجموعة الممنشنة \"%2\"",
			deletedSuccess2: "تمت إزالة المجموعة الممنشنة \"%1\"",
			tagged: "المجموعة الممنشنة \"%1\":\n%2",
			noGroupTagName2: "أرحوك قم بإدخال المجموعة الممنشنة القديمة و المجموعة الممنشنة الجديدة يفصلهما \"|\"",
			renamedSuccess: "تمت تسمية المجموعة الممنشنة\"%1\" إلى \"%2\"",
			infoGroupTag: "📑 | إسم المجموعة: %1\n👥 | عدد الأعضاء: %2\n👨‍👩‍👧‍👦 | قائمة الأعضاء:\n %3"
		}
	},

	onStart: async function ({ message, event, args, threadsData, getLang }) {
		const { threadID, mentions } = event;
		for (const uid in mentions)
			mentions[uid] = mentions[uid].replace("@", "");
		const groupTags = await threadsData.get(threadID, "data.groupTags", []);

		switch (args[0]) {
			case "إضافة": {
				const mentionsID = Object.keys(event.mentions);
				const content = (args.slice(1) || []).join(" ");
				const groupTagName = content.slice(0, content.indexOf(event.mentions[mentionsID[0]]) - 1).trim();
				if (!groupTagName)
					return message.reply(getLang("noGroupTagName"));
				if (mentionsID.length === 0)
					return message.reply(getLang("noMention"));

				const oldGroupTag = groupTags.find(tag => tag.name.toLowerCase() === groupTagName.toLowerCase());
				if (oldGroupTag) {
					const usersIDExist = [];
					const usersIDNotExist = [];
					for (const uid in mentions) {
						if (oldGroupTag.users.hasOwnProperty(uid)) {
							usersIDExist.push(uid);
						}
						else {
							oldGroupTag.users[uid] = mentions[uid];
							usersIDNotExist.push(uid);
						}
					}
					await threadsData.set(threadID, groupTags, "data.groupTags");

					let msg = "";
					if (usersIDNotExist.length > 0)
						msg += getLang("addedSuccess", oldGroupTag.name, usersIDNotExist.map(uid => mentions[uid]).join("\n")) + "\n";
					if (usersIDExist.length > 0)
						msg += getLang("existedInGroupTag", usersIDExist.map(uid => mentions[uid]).join("\n"));
					message.reply(msg);
				}
				else {
					const newGroupTag = {
						name: groupTagName,
						users: mentions
					};
					groupTags.push(newGroupTag);
					await threadsData.set(threadID, groupTags, "data.groupTags");
					message.reply(getLang("addedSuccess2", groupTagName, Object.values(mentions).join("\n")));
				}
				break;
			}
			case "قائمة":
			case "الكل": {
				if (args[1]) {
					const groupTagName = args.slice(1).join(" ");
					if (!groupTagName)
						return message.reply(getLang("noGroupTagName"));
					const groupTag = groupTags.find(tag => tag.name.toLowerCase() === groupTagName.toLowerCase());
					if (!groupTag)
						return message.reply(getLang("noExistedGroupTag", groupTagName));
					return showInfoGroupTag(message, groupTag, getLang);
				}
				const msg = groupTags.reduce((msg, group) => msg + `\n\n${group.name}:\n ${Object.values(group.users).map(name => name).join("\n ")}`, "");
				message.reply(msg || getLang("noExistedGroupTag2"));
				break;
			}
			case "معلومات": {
				const groupTagName = args.slice(1).join(" ");
				if (!groupTagName)
					return message.reply(getLang("noGroupTagName"));
				const groupTag = groupTags.find(tag => tag.name.toLowerCase() === groupTagName.toLowerCase());
				if (!groupTag)
					return message.reply(getLang("noExistedGroupTag", groupTagName));
				return showInfoGroupTag(message, groupTag, getLang);
			}
			case "حذف": {
				const content = (args.slice(1) || []).join(" ");
				const mentionsID = Object.keys(event.mentions);
				const groupTagName = content.slice(0, content.indexOf(mentions[mentionsID[0]]) - 1).trim();
				if (!groupTagName)
					return message.reply(getLang("noGroupTagName"));
				if (mentionsID.length === 0)
					return message.reply(getLang("noMention", groupTagName));
				const oldGroupTag = groupTags.find(tag => tag.name.toLowerCase() === groupTagName.toLowerCase());
				if (!oldGroupTag)
					return message.reply(getLang("noExistedGroupTag", groupTagName));
				const usersIDExist = [];
				const usersIDNotExist = [];
				for (const uid in mentions) {
					if (oldGroupTag.users.hasOwnProperty(uid)) {
						delete oldGroupTag.users[uid];
						usersIDExist.push(uid);
					}
					else {
						usersIDNotExist.push(uid);
					}
				}
				await threadsData.set(threadID, groupTags, "data.groupTags");

				let msg = "";
				if (usersIDNotExist.length > 0)
					msg += getLang("notExistedInGroupTag", usersIDNotExist.map(uid => mentions[uid]).join("\n"), groupTagName) + "\n";
				if (usersIDExist.length > 0)
					msg += getLang("deletedSuccess", usersIDExist.map(uid => mentions[uid]).join("\n"));
				message.reply(msg);
				break;
			}
			case "إزالة":
			case "rm": {
				const content = (args.slice(1) || []).join(" ");
				const groupTagName = content.trim();
				if (!groupTagName)
					return message.reply(getLang("noGroupTagName"));
				const index = groupTags.findIndex(group => group.name.toLowerCase() === groupTagName.toLowerCase());
				if (index === -1)
					return message.reply(getLang("noExistedGroupTag", groupTagName));
				groupTags.splice(index, 1);
				await threadsData.set(threadID, groupTags, "data.groupTags");
				message.reply(getLang("deletedSuccess2", groupTagName));
				break;
			}
			case "إعادة_التسمية": {
				const content = (args.slice(1) || []).join(" ");
				const [oldGroupTagName, newGroupTagName] = content.split("|").map(str => str.trim());
				if (!oldGroupTagName || !newGroupTagName)
					return message.reply(getLang("noGroupTagName2"));
				const oldGroupTag = groupTags.find(tag => tag.name.toLowerCase() === oldGroupTagName.toLowerCase());
				if (!oldGroupTag)
					return message.reply(getLang("noExistedGroupTag", oldGroupTagName));
				oldGroupTag.name = newGroupTagName;
				await threadsData.set(threadID, groupTags, "data.groupTags");
				message.reply(getLang("renamedSuccess", oldGroupTagName, newGroupTagName));
				break;
			}
			case "tag":
			default: {
				const content = (args.slice(args[0] === "tag" ? 1 : 0) || []).join(" ");
				const groupTagName = content.trim();
				if (!groupTagName)
					return message.reply(getLang("noGroupTagName"));
				const oldGroupTag = groupTags.find(tag => tag.name.toLowerCase() === groupTagName.toLowerCase());
				if (!oldGroupTag)
					return message.reply(getLang("noExistedGroupTag", groupTagName));
				const { users } = oldGroupTag;
				const mentions = [];
				let msg = "";
				for (const uid in users) {
					const userName = users[uid];
					mentions.push({
						id: uid,
						tag: userName
					});
					msg += `${userName}\n`;
				}
				message.reply({
					body: getLang("tagged", groupTagName, msg),
					mentions
				});
				break;
			}
		}
	}
};

function showInfoGroupTag(message, groupTag, getLang) {
	message.reply(getLang("infoGroupTag", groupTag.name, Object.keys(groupTag.users).length, Object.keys(groupTag.users).map(uid => groupTag.users[uid]).join("\n ")));
}