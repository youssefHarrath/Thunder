const fs = require("fs-extra");
const { config } = global.GoatBot;
const { client } = global;

module.exports = {
	config: {
		name: "فقط_المالك",
		aliases: ["adonly", "فقط_المالك", "onlyadmin"],
		version: "1.3",
		author: "NTKhang",
		countDown: 5,
		role: 2,
		shortDescription: {
			vi: "bật/tắt chỉ admin sử dụng bot",
			en: "تشغيل/إيقاف يمكن للمسؤول فقط استخدام البوت"
		},
		longDescription: {
			vi: "bật/tắt chế độ chỉ admin mới có thể sử dụng bot",
			en: "تشغيل/إيقاف يمكن للمسؤول فقط استخدام البوت"
		},
		category: "المالك",
		guide: {
			vi: "   {pn} [on | off]: bật/tắt chế độ chỉ admin mới có thể sử dụng bot"
				+ "\n   {pn} noti [on | off]: bật/tắt thông báo khi người dùng không phải là admin sử dụng bot",
			en: "   {pn} [تشغيل | إيقاف]: تشغيل/إيقاف الوضع، يمكن للمسؤول فقط استخدام البوت"
				+ "\n   {pn} إشعار [تشغيل | إيقاف]: قم بتشغيل/إيقاف تشغيل الإشعار عندما لا يكون المستخدم مسؤولاً عن استخدام البوت"
		}
	},

	langs: {
		vi: {
			turnedOn: "Đã bật chế độ chỉ admin mới có thể sử dụng bot",
			turnedOff: "Đã tắt chế độ chỉ admin mới có thể sử dụng bot",
			turnedOnNoti: "Đã bật thông báo khi người dùng không phải là admin sử dụng bot",
			turnedOffNoti: "Đã tắt thông báo khi người dùng không phải là admin sử dụng bot"
		},
		en: {
			turnedOn: "تم تشغيل الوضع، حيث يمكن للمسؤول فقط استخدام البوت",
			turnedOff: "تم إيقاف تشغيل الوضع، حيث يمكن للمسؤول فقط استخدام البوت",
			turnedOnNoti: "تم تشغيل الإشعارات عندما لا يكون المستخدم مسؤولاً عن استخدام البوت",
			turnedOffNoti: "تم إيقاف تشغيل الإشعارات عندما لا يكون المستخدم مسؤولاً عن استخدام البوت"
		}
	},

	onStart: function ({ args, message, getLang }) {
		let isSetNoti = false;
		let value;
		let indexGetVal = 0;

		if (args[0] == "إشعار") {
			isSetNoti = true;
			indexGetVal = 1;
		}

		if (args[indexGetVal] == "تشغيل")
			value = true;
		else if (args[indexGetVal] == "إيقاف")
			value = false;
		else
			return message.SyntaxError();

		if (isSetNoti) {
			config.adminOnly.hideNotiMessage = !value;
			message.reply(getLang(value ? "turnedOnNoti" : "turnedOffNoti"));
		}
		else {
			config.adminOnly.enable = value;
			message.reply(getLang(value ? "turnedOn" : "turnedOff"));
		}

		fs.writeFileSync(client.dirConfig, JSON.stringify(config, null, 2));
	}
};