const { getTime } = global.utils;

module.exports = {
	config: {
		name: "مجموعة",
		version: "1.4",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "Quản lý các nhóm chat",
			en: "إدارة الدردشة الجماعية"
		},
		longDescription: {
			vi: "Quản lý các nhóm chat trong hệ thống bot",
			en: "إدارة الدردشة الجماعية في نظام البوت"
		},
		category: "المالك",
		guide: {
			vi: "   {pn} [find | -f | search | -s] <tên cần tìm>: tìm kiếm nhóm chat trong dữ liệu bot bằng tên"
				+ "\n   {pn} [جد | ج | بحث | -s] [إنضمام | تم الضم] <tên cần tìm>: tìm kiếm nhóm chat trong dữ liệu mà bot còn tham gia bằng tên"
				+ "\n   {pn} [ban | -b] [<tid> | để trống] <reason>: dùng để cấm nhóm mang id <tid> hoặc nhóm hiện tại sử dụng bot"
				+ "\n   Ví dụ:"
				+ "\n    {pn} ban 3950898668362484 spam bot"
				+ "\n    {pn} ban spam quá nhiều"
				+ "\n\n   {pn} unban [<tid> | để trống] để bỏ cấm nhóm mang id <tid> hoặc nhóm hiện tại"
				+ "\n   Ví dụ:"
				+ "\n    {pn} unban 3950898668362484"
				+ "\n    {pn} unban",
			en: "   {pn} [جد | ج | بحث | -s] <إسم من أحل البحث عنه>: قم بالبحث عن المجموعة التي يتواجد بها البوت إنطلاقا من الإسم"
				+ "\n   {pn} [جد | ج | بحث | د إنضمام] [-j | من أجل الإنضمام] <الإسم من أجل البحث>: ابحث عن الدردشة الجماعية في بيانات البوت التي لا يزال البوت ينضم إليها بالاسم"
				+ "\n   {pn} [حظر | -b] [<آيدي المجموعة> | أتركها فارغة] <السبب>: إستخدم من أجل حظر المجموعة مع الآيدي<آيدي المجموعة> أو من يستعمل البوت في ذالك الحين"
				+ "\n   مثال:"
				+ "\n    {pn} حظر 3950898668362484  إرسال بريد عشوائي للبوت"
				+ "\n    {pn} إرسال بريد عشوائي بشكل كبير"
				+ "\n\n   {pn} إلغاء_الحظر [<آيدي المجموعه> | أتركها فارغة] من أجل إلغاء الحظر المجموعة مع الآيدي<آيدي المجموعة> أو المجموعات الحالية"
				+ "\n   مثال:"
				+ "\n    {pn} إلغاء_الحظر 3950898668362484"
				+ "\n    {pn} إلغاء_الحظر"
		}
	},

	langs: {
		vi: {
			noPermission: "Bạn không có quyền sử dụng tính năng này",
			found: "🔎 Tìm thấy %1 nhóm trùng với từ khóa \"%2\" trong dữ liệu của bot:\n%3",
			notFound: "❌ Không tìm thấy nhóm nào có tên khớp với từ khoá: \"%1\" trong dữ liệu của bot",
			hasBanned: "Nhóm mang id [%1 | %2] đã bị cấm từ trước:\n» Lý do: %3\n» Thời gian: %4",
			banned: "Đã cấm nhóm mang id [%1 | %2] sử dụng bot.\n» Lý do: %3\n» Thời gian: %4",
			notBanned: "Hiện tại nhóm mang id [%1 | %2] không bị cấm sử dụng bot",
			unbanned: "Đã bỏ cấm nhóm mang tid [%1 | %2] sử dụng bot",
			missingReason: "Lý do cấm không được để trống",
			info: "» Box ID: %1\n» Tên: %2\n» Ngày tạo data: %3\n» Tổng thành viên: %4\n» Nam: %5 thành viên\n» Nữ: %6 thành viên\n» Tổng tin nhắn: %7%8"
		},
		en: {
			noPermission: "ليس لديك إذن لاستخدام هذه الميزة",
			found: "🔎 تم إيجاد %1 من المجموعات التي توافق الكلمة المفتاح \"%2\" في بيانات البوت:\n%3",
			notFound: "❌ ليس هناك أي مجموعة توافق الكلمة المفتاح: \"%1\" في بيانات البوت",
			hasBanned: "المجموعة مع الآيدي [%1 | %2] تم حظرها من قبل:\n» السبب: %3\n» الوقت: %4",
			banned: "تم حظر المجموعة  مع الآيدي [%1 | %2] using bot.\n» السبب: %3\n» الوقت: %4",
			notBanned: "المجموعة مع الآيدي [%1 | %2] لم يتم حظرها لإستخدام البوت",
			unbanned: "تم إلغاء الحظر للمجموعة مع الآيدي [%1 | %2] من إستخدام البوت",
			missingReason: "الحظر مع السبب لا يمكن أن يترك فارغ",
			info: "» المجموعة مع الآيدي: %1\n» الإسم: %2\n» البيانات اللتي تم إنشائها البيانات: %3\n» إجمالي عدد الاعضاء: %4\n» الأولاد: %5 الأعضاء\n» الفتيات: %6 الأعضاء\n» إجمال عدد الرسائل: %7%8"
		}
	},

	onStart: async function ({ args, threadsData, message, role, event, getLang }) {
		const type = args[0];

		switch (type) {
			// find thread
			case "جد":
			case "إبحث":
			case "-f":
			case "-s": {
				if (role < 2)
					return message.reply(getLang("noPermission"));
				let allThread = await threadsData.getAll();
				let keyword = args.slice(1).join(" ");
				if (['-j', '-join'].includes(args[1])) {
					allThread = allThread.filter(thread => thread.members.some(member => member.userID == global.GoatBot.botID && member.inGroup));
					keyword = args.slice(2).join(" ");
				}
				const result = allThread.filter(item => item.threadID.length > 15 && (item.threadName || "").toLowerCase().includes(keyword.toLowerCase()));
				const resultText = result.reduce((i, thread) => i += `\n╭Name: ${thread.threadName}\n╰ID: ${thread.threadID}`, "");
				let msg = "";
				if (result.length > 0)
					msg += getLang("found", result.length, keyword, resultText);
				else
					msg += getLang("notFound", keyword);
				message.reply(msg);
				break;
			}
			// ban thread
			case "حظر":
			case "-b": {
				if (role < 2)
					return message.reply(getLang("noPermission"));
				let tid, reason;
				if (!isNaN(args[1])) {
					tid = args[1];
					reason = args.slice(2).join(" ");
				}
				else {
					tid = event.threadID;
					reason = args.slice(1).join(" ");
				}
				if (!tid)
					return message.SyntaxError();
				if (!reason)
					return message.reply(getLang("missingReason"));
				reason = reason.replace(/\s+/g, ' ');
				const threadData = await threadsData.get(tid);
				const name = threadData.threadName;
				const status = threadData.banned.status;

				if (status)
					return message.reply(getLang("hasBanned", tid, name, threadData.banned.reason, threadData.banned.date));
				const time = getTime("DD/MM/YYYY HH:mm:ss");
				await threadsData.set(tid, {
					banned: {
						status: true,
						reason,
						date: time
					}
				});
				return message.reply(getLang("banned", tid, name, reason, time));
			}
			// unban thread
			case "إلغاء_الحظر":
			case "-u": {
				if (role < 2)
					return message.reply(getLang("noPermission"));
				let tid;
				if (!isNaN(args[1]))
					tid = args[1];
				else
					tid = event.threadID;
				if (!tid)
					return message.SyntaxError();

				const threadData = await threadsData.get(tid);
				const name = threadData.threadName;
				const status = threadData.banned.status;

				if (!status)
					return message.reply(getLang("notBanned", tid, name));
				await threadsData.set(tid, {
					banned: {}
				});
				return message.reply(getLang("unbanned", tid, name));
			}
			// info thread
			case "معلومات":
			case "-i": {
				let tid;
				if (!isNaN(args[1]))
					tid = args[1];
				else
					tid = event.threadID;
				if (!tid)
					return message.SyntaxError();
				const threadData = await threadsData.get(tid);
				const createdDate = getTime(threadData.createdAt, "DD/MM/YYYY HH:mm:ss");
				const valuesMember = Object.values(threadData.members).filter(item => item.inGroup);
				const totalBoy = valuesMember.filter(item => item.gender == "ذكر").length;
				const totalGirl = valuesMember.filter(item => item.gender == "أنثى").length;
				const totalMessage = valuesMember.reduce((i, item) => i += item.count, 0);
				const infoBanned = threadData.banned.status ?
					`\n- الحظر: ${threadData.banned.status}`
					+ `\n- السبب: ${threadData.banned.reason}`
					+ `\n- الوقت: ${threadData.banned.date}` :
					"";
				const msg = getLang("info", threadData.threadID, threadData.threadName, createdDate, valuesMember.length, totalBoy, totalGirl, totalMessage, infoBanned);
				return message.reply(msg);
			}
			default:
				return message.SyntaxError();
		}
	}
};