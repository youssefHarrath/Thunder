module.exports = {
	config: {
		name: "فقط_الآدمن",
		aliases: ["فقط مشرفو المجموعة", "adboxonly", "adminboxonly"],
		version: "1.2",
		author: "NTKhang",
		countDown: 5,
		role: 1,
		shortDescription: {
			vi: "bật/tắt chỉ admin box sử dụng bot",
			en: "تشغيل/إيقاف  صندوق الإدارة فقط من يمكنه استخدام الروبوت"
		},
		longDescription: {
			vi: "bật/tắt chế độ chỉ quản trị của viên nhóm mới có thể sử dụng bot",
			en: "تشغيل/إيقاف  صندوق الإدارة فقط من يمكنه استخدام الروبوت"
		},
		category: "المجموعة",
		guide: {
			en: "   {pn} [on | off]: bật/tắt chế độ chỉ quản trị viên nhóm mới có thể sử dụng bot"
				+ "\n   {pn} noti [on | off]: bật/tắt thông báo khi người dùng không phải là quản trị viên nhóm sử dụng bot",
			en: "   {pn} [تشغيل | إيقاف]: تشغيل/إيقاف الوضع، يمكن لمسؤول المجموعة فقط استخدام الروبوت"
				+ "\n   {pn} إشعار [تشغيل | إيقاف]: قم بتشغيل/إيقاف تشغيل الإشعار عندما لا يكون المستخدم مسؤولاً عن روبوت الاستخدام الجماعي"
		}
	},

	langs: {
		vi: {
			turnedOn: "Đã bật chế độ chỉ quản trị viên nhóm mới có thể sử dụng bot",
			turnedOff: "Đã tắt chế độ chỉ quản trị viên nhóm mới có thể sử dụng bot",
			turnedOnNoti: "Đã bật thông báo khi người dùng không phải là quản trị viên nhóm sử dụng bot",
			turnedOffNoti: "Đã tắt thông báo khi người dùng không phải là quản trị viên nhóm sử dụng bot",
			syntaxError: "Sai cú pháp, chỉ có thể dùng {pn} on hoặc {pn} off"
		},
		en: {
			turnedOn: " ✅ |تم تشغيل الوضع، حيث يمكن لمسؤول المجموعة فقط  استخدام البوت",
			turnedOff: " ❌ |تم إيقاف تشغيل الوضع، حيث يمكن لمسؤول المجموعة استخدام البوت",
			turnedOnNoti: " ✅ |تم تشغيل الإشعار عندما لا يكون المستخدم مسؤولاً عن البوت الاستخدام الشامل",
			turnedOffNoti: " ❌ |تم إيقاف تشغيل الإشعار عندما لا يكون المستخدم مسؤولاً عن البوت الاستخدام الجماعي",
			syntaxError: " ⚠️ |خطأ في بناء الجملة, فقط استخدم {pn} تشغيل أو {pn} إيقاف"
		}
	},

	onStart: async function ({ args, message, event, threadsData, getLang }) {
		let isSetNoti = false;
		let value;
		let keySetData = "data.onlyAdminBox";
		let indexGetVal = 0;

		if (args[0] == "إشعار") {
			isSetNoti = true;
			indexGetVal = 1;
			keySetData = "data.hideNotiMessageOnlyAdminBox";
		}

		if (args[indexGetVal] == "تشغيل")
			value = true;
		else if (args[indexGetVal] == "إيقاف")
			value = false;
		else
			return message.reply(getLang("syntaxError"));

		await threadsData.set(event.threadID, isSetNoti ? !value : value, keySetData);

		if (isSetNoti)
			return message.reply(value ? getLang("turnedOnNoti") : getLang("turnedOffNoti"));
		else
			return message.reply(value ? getLang("turnedOn") : getLang("turnedOff"));
	}
};