const { getTime } = global.utils;

module.exports = {
	config: {
		name: "تحذير",
		version: "1.8",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		description: {
			vi: "cảnh cáo thành viên trong nhóm, đủ 3 lần ban khỏi box",
			en: "تحذير الأعضاء في المجموعة، إذا كان لديهم 3 تحذيرات، سيتم حظرهم"
		},
		category: "المجموعة",
		guide: {
			vi: "   {pn} @tag <lý do>: dùng cảnh cáo thành viên"
				+ "\n   {pn} list: xem danh sách những thành viên đã bị cảnh cáo"
				+ "\n   {pn} listban: xem danh sách những thành viên đã bị cảnh cáo đủ 3 lần và bị ban khỏi box"
				+ "\n   {pn} info [@tag | <uid> | reply | để trống]: xem thông tin cảnh cáo của người được tag hoặc uid hoặc bản thân"
				+ "\n   {pn} unban [@tag | <uid> | reply | để trống]: gỡ ban thành viên, đồng thời gỡ tất cả cảnh cáo của thành viên đó"
				+ "\n   {pn} unwarn [@tag | <uid> | reply | để trống] [<số thứ tự> | để trống]: gỡ cảnh cáo thành viên bằng uid và số thứ tự cảnh cáo, nếu để trống sẽ gỡ cảnh cáo cuối cùng"
				+ "\n   {pn} reset: reset tất cả dữ liệu cảnh cáo"
				+ "\n⚠️ Cần set quản trị viên cho bot để bot tự kick thành viên bị ban",
			en: "   {pn} @منشن <السبب>: قم بتحذير العضو"
				+ "\n   {pn} قائمة : قن بعرض قائمة الأعضاء اللذين تم حظرهم"
				+ "\n   {pn} قائمة_المحظورين : عرض قائمة الأعضاء المحظورين"
				+ "\n   {pn} معلومات [@منشن | <آيدي> | رد | أتركه فارغا]: قم بعرض معلومات  المحظورين عن الشخص اللذي قمت بعمل منشن له أو آيظي الخاص به أو الخاص بك"
				+ "\n   {pn} رفع_الحظر [@منشن | <آيدي> | رد | أتركها فارغة]: قم برفع الحظر عنه وفي نفس الوقت أنت ترفع كل المرات اللتي تم حظره فيها"
				+ "\n   {pn} إزالة_الحظر [@منشن | <آيدي> | رد | أتركهل فارغة] [<الرقم> | أتركها فارغة]: قم بإزالة الحظر عن عضو ما بإستخدام الآيدي او الرقم الخاص به إذا تركته فالدرغة سيتم إزالة آخر تحذير قمت به"
				+ "\n   {pn}إستعادة قم بإستعادة كل بيانات التحذير إلى الصفر"
				+ "\n⚠️ | عليك وضع البوت كآدمن في المجموعة إذا أردت البوت أن يطرد الأعضاء اللذين تم تحذيرهم"
		}
	},

	langs: {
		vi: {
			list: "Danh sách những thành viên bị cảnh cáo:\n%1\n\nĐể xem chi tiết những lần cảnh cáo hãy dùng lệnh \"%2warn info  [@tag | <uid> | để trống]\": để xem thông tin cảnh cáo của người được tag hoặc uid hoặc bản thân",
			listBan: "Danh sách những thành viên bị cảnh cáo đủ 3 lần và ban khỏi box:\n%1",
			listEmpty: "Nhóm bạn chưa có thành viên nào bị cảnh cáo",
			listBanEmpty: "Nhóm bạn chưa có thành viên nào bị ban khỏi box",
			invalidUid: "Vui lòng nhập uid hợp lệ của người bạn muốn xem thông tin",
			noData: "Không có dữ liệu nào",
			noPermission: "❌ Chỉ quản trị viên nhóm mới có thể unban thành viên bị ban khỏi box",
			invalidUid2: "⚠️ Vui lòng nhập uid hợp lệ của người muốn gỡ ban",
			notBanned: "⚠️ Người dùng mang id %1 chưa bị ban khỏi box của bạn",
			unbanSuccess: "✅ Đã gỡ ban thành viên [%1 | %2], hiện tại người này có thể tham gia box chat của bạn",
			noPermission2: "❌ Chỉ quản trị viên nhóm mới có thể gỡ cảnh cáo của thành viên trong nhóm",
			invalidUid3: "⚠️ Vui lòng nhập uid hoặc tag người muốn gỡ cảnh cáo",
			noData2: "⚠️ Người dùng mang id %1 chưa có dữ liệu cảnh cáo",
			notEnoughWarn: "❌ Người dùng %1 chỉ có %2 lần cảnh cáo",
			unwarnSuccess: "✅ Đã gỡ lần cảnh cáo thứ %1 của thành viên [%2 | %3] thành công",
			noPermission3: "❌ Chỉ quản trị viên nhóm mới có thể reset dữ liệu cảnh cáo",
			resetWarnSuccess: "✅ Đã reset dữ liệu cảnh cáo thành công",
			noPermission4: "❌ Chỉ quản trị viên nhóm mới có thể cảnh cáo thành viên trong nhóm",
			invalidUid4: "⚠️ Bạn cần phải tag hoặc phản hồi tin nhắn của người muốn cảnh cáo",
			warnSuccess: "⚠️ Đã cảnh cáo thành viên %1 lần %2\n- Uid: %3\n- Lý do: %4\n- Date Time: %5\nThành viên này đã bị cảnh cáo đủ 3 lần và bị ban khỏi box, để gỡ ban hãy sử dụng lệnh \"%6warn unban <uid>\" (với uid là uid của người muốn gỡ ban)",
			noPermission5: "⚠️ Bot cần quyền quản trị viên để kick thành viên bị ban",
			warnSuccess2: "⚠️ Đã cảnh cáo thành viên %1 lần %2\n- Uid: %3\n- Lý do: %4\n- Date Time: %5\nNếu vi phạm %6 lần nữa người này sẽ bị ban khỏi box",
			hasBanned: "⚠️ Thành viên sau đã bị cảnh cáo đủ 3 lần trước đó và bị ban khỏi box:\n%1",
			failedKick: "⚠️ Đã xảy ra lỗi khi kick những thành viên sau:\n%1",
			userNotInGroup: "⚠️ Người dùng \"%1\" hiện tại không có trong nhóm của bạn"
		},
		en: {
			list: "قائمة الأعضاء اللتي تم تحذيرهم :\n%1\n\nمن أجل عرض التفاصيل حول الشخص الذي تريد معرفة معلومات حول الحظر عنه إستخدم  \"%2تحذير معلومات [@منشن | <آيدي> | أتركا فارغة]\" الأمر : لعرض معلومات التحذير الخاصة بالشخص الذي تم عمل منشن عليه أو المعرف (آيدي) أو بنفسك",
			listBan: "قائمة الأعضاء الذين تم تحذيرهم 3 مرات وتم حظرهم من المجموعة :\n%1",
			listEmpty: " ⚠️ |مجموعتك ليس لديها أي أعضاء تم تحذيرهم",
			listBanEmpty: " ⚠️ | مجموعتك ليس بها أي أعضاء محظورين من قبل",
			invalidUid: " ⚠️ | أرجوك قم بإدخال آيدي صحيح لعرض معلومات حول هذا الشخص ",
			noData: "لايوجد بيانات ❗",
			noPermission: "❌ فقط آدمنية المجموعة وحدهم يمكنهم رفع الحظر عن الأعضاء",
			invalidUid2: "⚠️ |أرجوك قم بإدخال آيدي صحيح من أجل عرض معلومات العضو",
			notBanned: "⚠️ | المستخدم مع الآيدي  %1 لم يتم تحذيره من قبل",
			unbanSuccess: "✅ | تم ؤفع الحظر بنجاح عن العضو مع الآيدي  [%1 | %2], حاليا يمكن لهذا الشخص أن ينضم مجددا إلى المجموعة",
			noPermission2: "❌ | فقط آدمنية المجموعة يمكنهم إزالة التحذير عن الاعضاء بالمجموعة",
			invalidUid3: "⚠️ | المرجو إدخال الآيدي أو قم بمنشن الشخص اللذي تريد إزالة التحذير عنه",
			noData2: "⚠️ | المستخدم مع الآيدي %1 ليس لديه بيانات تحذير من قبل",
			notEnoughWarn: "❌ | المستخدم مع الإيدي %1 لديه فقط %2 من التحذيرات",
			unwarnSuccess: "✅ | تم حذف بنجاح %1 من التحذيرات بالنسبة للعضو [%2 | %3]",
			noPermission3: "❌ | فقط آدمنية المجموعة يمكنهم إستعادة بيانات التحذير إلى الصفر",
			resetWarnSuccess: "✅ | تمت أعادة بيانات التحذير إلى ابصفر بنجاح",
			noPermission4: "❌ | فقط آدمنية الغروب يمكنهم تحذير الأعضاء",
			invalidUid4: "⚠️ | تحتاج إدخال الآيدي أو عمل منشن أو رد على رسالته وأكتب السبب",
			warnSuccess: "⚠️ عضو محظر %1 مرات التحذير %2\n- الآيدي : %3\n- السبب : %4\n- تاريخ المرات : %5\nهذا الشخص تم تحذيره ثلاث مرات من قبل وتم حظره من المجموعة قم بإستخدام  \"%6تحذير حظر <آيدي>\" (مع آيدي الشخص يمكنك حظر من تريد)",
			noPermission5: "⚠️ | يحتاج البوت أن يكون من الآدمنية في المجموعة من اجل طرد الاعضاء",
			warnSuccess2: "⚠️ عضو محذر %1 %2 المرات\n- الآيدي : %3\n- الشبب : %4\n- تاريخ : %5\nإذا قام هذا الشخص بإعادة الكرة  %6 من المرات ، سيتم حظره من المجموعة",
			hasBanned: "⚠️ تم تحذير الأعضاء التاليين 3 مرات من قبل وتم حظرهم من المجموعة :\n%1",
			failedKick: "⚠️ حدث خطأ عند طرد الأعضاء التاليين :\n%1",
			userNotInGroup: "⚠️ المستخدم \"%1\" هو حاليا غير موجود في المجموعة"
		}
	},

	onStart: async function ({ message, api, event, args, threadsData, usersData, prefix, role, getLang }) {
		if (!args[0])
			return message.SyntaxError();
		const { threadID, senderID } = event;
		const warnList = await threadsData.get(threadID, "data.warn", []);

		switch (args[0]) {
			case "قائمة": {
				const msg = await Promise.all(warnList.map(async user => {
					const { uid, list } = user;
					const name = await usersData.getName(uid);
					return `${name} (${uid}): ${list.length}`;
				}));
				message.reply(msg.length ? getLang("list", msg.join("\n"), prefix) : getLang("listEmpty"));
				break;
			}
			case "قائمة_المحظورين": {
				const result = (await Promise.all(warnList.map(async user => {
					const { uid, list } = user;
					if (list.length >= 3) {
						const name = await usersData.getName(uid);
						return `${name} (${uid})`;
					}
				}))).filter(item => item);
				message.reply(result.length ? getLang("listBan", result.join("\n")) : getLang("listBanEmpty"));
				break;
			}
			case "تفقد":
			case "معلومات": {
				let uids, msg = "";
				if (Object.keys(event.mentions).length)
					uids = Object.keys(event.mentions);
				else if (event.messageReply?.senderID)
					uids = [event.messageReply.senderID];
				else if (args.slice(1).length)
					uids = args.slice(1);
				else
					uids = [senderID];

				if (!uids)
					return message.reply(getLang("invalidUid"));
				msg += (await Promise.all(uids.map(async uid => {
					if (isNaN(uid))
						return null;
					const dataWarnOfUser = warnList.find(user => user.uid == uid);
					let msg = `Uid: ${uid}`;
					const userName = await usersData.getName(uid);

					if (!dataWarnOfUser || dataWarnOfUser.list.length == 0)
						msg += `\n  الإسم: ${userName}\n  ${getLang("noData")}`;
					else {
						msg += `\nالإسم : ${userName}`
							+ `\nقائمة المحذرين :` + dataWarnOfUser.list.reduce((acc, warn) => {
								const { dateTime, reason } = warn;
								return acc + `\n  - السبب 📝: ${reason}\n    الوقت ⏱️: ${dateTime}`;
							}, "");
					}
					return msg;
				}))).filter(msg => msg).join("\n\n");
				message.reply(msg);
				break;
			}
			case "رفع_الحظر": {
				if (role < 1)
					return message.reply(getLang("noPermission"));
				let uidUnban;
				if (Object.keys(event.mentions).length)
					uidUnban = Object.keys(event.mentions)[0];
				else if (event.messageReply?.senderID)
					uidUnban = event.messageReply.senderID;
				else if (args.slice(1).length)
					uidUnban = args.slice(1);
				else
					uidUnban = senderID;

				if (!uidUnban || isNaN(uidUnban))
					return message.reply(getLang("invalidUid2"));

				const index = warnList.findIndex(user => user.uid == uidUnban && user.list.length >= 3);
				if (index === -1)
					return message.reply(getLang("notBanned", uidUnban));

				warnList.splice(index, 1);
				await threadsData.set(threadID, warnList, "data.warn");
				const userName = await usersData.getName(uidUnban);
				message.reply(getLang("unbanSuccess", uidUnban, userName));
				break;
			}
			case "إزالة_التحذير": {
				if (role < 1)
					return message.reply(getLang("noPermission2"));
				let uid, num;
				if (Object.keys(event.mentions)[0]) {
					uid = Object.keys(event.mentions)[0];
					num = args[args.length - 1];
				}
				else if (event.messageReply?.senderID) {
					uid = event.messageReply.senderID;
					num = args[1];
				}
				else {
					uid = args[1];
					num = parseInt(args[2]) - 1;
				}

				if (isNaN(uid))
					return message.reply(getLang("invalidUid3"));

				const dataWarnOfUser = warnList.find(u => u.uid == uid);
				if (!dataWarnOfUser?.list.length)
					return message.reply(getLang("noData2", uid));

				if (isNaN(num))
					num = dataWarnOfUser.list.length - 1;

				const userName = await usersData.getName(uid);
				if (num > dataWarnOfUser.list.length)
					return message.reply(getLang("notEnoughWarn", userName, dataWarnOfUser.list.length));

				dataWarnOfUser.list.splice(parseInt(num), 1);
				if (!dataWarnOfUser.list.length)
					warnList.splice(warnList.findIndex(u => u.uid == uid), 1);
				await threadsData.set(threadID, warnList, "data.warn");
				message.reply(getLang("unwarnSuccess", num + 1, uid, userName));
				break;
			}
			case "إستعادة": {
				if (role < 1)
					return message.reply(getLang("noPermission3"));
				await threadsData.set(threadID, [], "data.warn");
				message.reply(getLang("resetWarnSuccess"));
				break;
			}
			default: {
				if (role < 1)
					return message.reply(getLang("noPermission4"));
				let reason, uid;
				if (event.messageReply) {
					uid = event.messageReply.senderID;
					reason = args.join(" ").trim();
				}
				else if (Object.keys(event.mentions)[0]) {
					uid = Object.keys(event.mentions)[0];
					reason = args.join(" ").replace(event.mentions[uid], "").trim();
				}
				else {
					return message.reply(getLang("invalidUid4"));
				}
				if (!reason)
					reason = "No reason";
				const dataWarnOfUser = warnList.find(item => item.uid == uid);
				const dateTime = getTime("DD/MM/YYYY hh:mm:ss");
				if (!dataWarnOfUser)
					warnList.push({
						uid,
						list: [{ reason, dateTime, warnBy: senderID }]
					});
				else
					dataWarnOfUser.list.push({ reason, dateTime, warnBy: senderID });

				await threadsData.set(threadID, warnList, "data.warn");

				const times = dataWarnOfUser?.list.length ?? 1;

				const userName = await usersData.getName(uid);
				if (times >= 3) {
					message.reply(getLang("warnSuccess", userName, times, uid, reason, dateTime, prefix), () => {
						api.removeUserFromGroup(uid, threadID, async (err) => {
							if (err) {
								const members = await threadsData.get(event.threadID, "members");
								if (members.find(item => item.userID == uid)?.inGroup) // check if user is still in group
									return message.reply(getLang("userNotInGroup", userName));
								else
									return message.reply(getLang("noPermission5"), (e, info) => {
										const { onEvent } = global.GoatBot;
										onEvent.push({
											messageID: info.messageID,
											onStart: async ({ event }) => {
												if (event.logMessageType === "log:thread-admins" && event.logMessageData.ADMIN_EVENT == "add_admin") {
													const { TARGET_ID } = event.logMessageData;
													if (TARGET_ID == api.getCurrentUserID()) {
														const warnList = await threadsData.get(event.threadID, "data.warn", []);
														if ((warnList.find(user => user.uid == uid)?.list.length ?? 0) <= 3)
															global.GoatBot.onEvent = onEvent.filter(item => item.messageID != info.messageID);
														else
															api.removeUserFromGroup(uid, event.threadID, () => global.GoatBot.onEvent = onEvent.filter(item => item.messageID != info.messageID));
													}
												}
											}
										});
									});
							}
						});
					});
				}
				else
					message.reply(getLang("warnSuccess2", userName, times, uid, reason, dateTime, 3 - (times)));
			}
		}
	},

	onEvent: async ({ event, threadsData, usersData, message, api, getLang }) => {
		const { logMessageType, logMessageData } = event;
		if (logMessageType === "log:subscribe") {
			return async () => {
				const { data, adminIDs } = await threadsData.get(event.threadID);
				const warnList = data.warn || [];
				if (!warnList.length)
					return;
				const { addedParticipants } = logMessageData;
				const hasBanned = [];

				for (const user of addedParticipants) {
					const { userFbId: uid } = user;
					const dataWarnOfUser = warnList.find(item => item.uid == uid);
					if (!dataWarnOfUser)
						continue;
					const { list } = dataWarnOfUser;
					if (list.length >= 3) {
						const userName = await usersData.getName(uid);
						hasBanned.push({
							uid,
							name: userName
						});
					}
				}

				if (hasBanned.length) {
					await message.send(getLang("hasBanned", hasBanned.map(item => `  - ${item.name} (uid: ${item.uid})`).join("\n")));
					if (!adminIDs.includes(api.getCurrentUserID()))
						message.reply(getLang("noPermission5"), (e, info) => {
							const { onEvent } = global.GoatBot;
							onEvent.push({
								messageID: info.messageID,
								onStart: async ({ event }) => {
									if (
										event.logMessageType === "log:thread-admins"
										&& event.logMessageData.ADMIN_EVENT == "add_admin"
										&& event.logMessageData.TARGET_ID == api.getCurrentUserID()
									) {
										const threadData = await threadsData.get(event.threadID);
										const warnList = threadData.data.warn;
										const members = threadData.members;
										removeUsers(hasBanned, warnList, api, event, message, getLang, members);
										global.GoatBot.onEvent = onEvent.filter(item => item.messageID != info.messageID);
									}
								}
							});
						});
					else {
						const members = await threadsData.get(event.threadID, "members");
						removeUsers(hasBanned, warnList, api, event, message, getLang, members);
					}
				}
			};
		}
	}
};

async function removeUsers(hasBanned, warnList, api, event, message, getLang, members) {
	const failed = [];
	for (const user of hasBanned) {
		if (members.find(item => item.userID == user.uid)?.inGroup) { // check if user is still in group
			try {
				if (warnList.find(item => item.uid == user.uid)?.list.length ?? 0 >= 3)
					await api.removeUserFromGroup(user.uid, event.threadID);
			}
			catch (e) {
				failed.push({
					uid: user.uid,
					name: user.name
				});
			}
		}
	}
	if (failed.length)
		message.reply(getLang("failedKick", failed.map(item => `  - ${item.name} (uid: ${item.uid})`).join("\n")));
}