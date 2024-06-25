module.exports = {
	config: {
		name: "إنعاش",
		version: "1.1",
		author: "NTKhang",
		countDown: 60,
		role: 0,
		shortDescription: {
			vi: "làm mới thông tin",
			ar: "تحديث المعلومات"
		},
		longDescription: {
			vi: "làm mới thông tin nhóm chat hoặc người dùng",
			en: "تحديث معلومات الدردشة الجماعية أو المستخدم"
		},
		category: "المجموعة",
		guide: {
			vi: "   {pn} [thread | group]: làm mới thông tin nhóm chat của bạn"
				+ "\n   {pn} group <threadID>: làm mới thông tin nhóm chat theo ID"
				+ "\n\n   {pn} user: làm mới thông tin người dùng của bạn"
				+ "\n   {pn} user [<userID> | @tag]: làm mới thông tin người dùng theo ID",
			en: "   {pn} [thread | المجموعة]: تحديث معلومات الدردشة الجماعية الخاصة بك"
				+ "\n   {pn} المجموعة <threadID>: تحديث معلومات الدردشة الجماعية عن طريق الآيدي"
				+ "\n\n   {pn} المستخدم: تحديث معلومات المستخدم الخاص بك"
				+ "\n   {pn} مستخدم [<آيدي المستخدم> | @تاغ]: تحديث معلومات المستخدم بواسطة آيدي"
		}
	},

	langs: {
		vi: {
			refreshMyThreadSuccess: "✅ | Đã làm mới thông tin nhóm chat của bạn thành công!",
			refreshThreadTargetSuccess: "✅ | Đã làm mới thông tin nhóm chat %1 thành công!",
			errorRefreshMyThread: "❌ | Đã xảy ra lỗi không thể làm mới thông tin nhóm chat của bạn",
			errorRefreshThreadTarget: "❌ | Đã xảy ra lỗi không thể làm mới thông tin nhóm chat %1",
			refreshMyUserSuccess: "✅ | Đã làm mới thông tin người dùng của bạn thành công!",
			refreshUserTargetSuccess: "✅ | Đã làm mới thông tin người dùng %1 thành công!",
			errorRefreshMyUser: "❌ | Đã xảy ra lỗi không thể làm mới thông tin người dùng của bạn",
			errorRefreshUserTarget: "❌ | Đã xảy ra lỗi không thể làm mới thông tin người dùng %1"
		},
		en: {
			refreshMyThreadSuccess: "✅ | تم تحديث معلومات الدردشة الجماعية الخاصة بك بنجاح!",
			refreshThreadTargetSuccess: "✅ | تم تحديث معلومات الدردشة الجماعية %1 بنجاح!",
			errorRefreshMyThread: "❌ | خطأ عند تحديث معلومات الدردشة الجماعية الخاصة بك",
			errorRefreshThreadTarget: "❌ | خطأ عند تحديث معلومات الدردشة الجماعية %1",
			refreshMyUserSuccess: "✅ | تم بتحديث معلومات المستخدم الخاص بك بنجاح!",
			refreshUserTargetSuccess: "✅ | تم بتحديث معلومات المستخدم %1 بنجاح!",
			errorRefreshMyUser: "❌ | خطأ عند تحديث معلومات المستخدم الخاص بك",
			errorRefreshUserTarget: "❌ | خطأ عند تحديث معلومات المستخدم %1"
		}
	},

	onStart: async function ({ args, threadsData, message, event, usersData, getLang }) {
		if (args[0] == "المجموعة" || args[0] == "thread") {
			const targetID = args[1] || event.threadID;
			try {
				await threadsData.refreshInfo(targetID);
				return message.reply(targetID == event.threadID ? getLang("refreshMyThreadSuccess") : getLang("refreshThreadTargetSuccess", targetID));
			}
			catch (error) {
				return message.reply(targetID == event.threadID ? getLang("errorRefreshMyThread") : getLang("errorRefreshThreadTarget", targetID));
			}
		}
		else if (args[0] == "المستخدم") {
			let targetID = event.senderID;
			if (args[1]) {
				if (Object.keys(event.mentions).length)
					targetID = Object.keys(event.mentions)[0];
				else
					targetID = args[1];
			}
			try {
				await usersData.refreshInfo(targetID);
				return message.reply(targetID == event.senderID ? getLang("refreshMyUserSuccess") : getLang("refreshUserTargetSuccess", targetID));
			}
			catch (error) {
				return message.reply(targetID == event.senderID ? getLang("errorRefreshMyUser") : getLang("errorRefreshUserTarget", targetID));
			}
		}
		else
			message.SyntaxError();
	}
};