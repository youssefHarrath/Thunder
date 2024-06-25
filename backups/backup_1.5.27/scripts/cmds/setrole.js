module.exports = {
	config: {
		name: "ضبط_المسؤولية",
		version: "1.3",
		author: "NTKhang",
		countDown: 5,
		role: 1,
		shortDescription: {
			vi: "Chỉnh sửa role của lệnh",
			en: "قم بتعديل قاعدة الأمر"
		},
		longDescription: {
			vi: "Chỉnh sửa role của lệnh (những lệnh có role < 2)",
			en: "قم بتعديل قاعدة الأمر 0 1 أو < 2)"
		},
		category: "النظام",
		guide: {
			vi: "   {pn} <إسم_الأمر> <قاعدة_جديدة>: set role mới cho lệnh"
				+ "\n   Với:"
				+ "\n   + <commandName>: tên lệnh"
				+ "\n   + <new role>: role mới của lệnh với:"
				+ "\n   + <new role> = 0: lệnh có thể được sử dụng bởi mọi thành viên trong nhóm"
				+ "\n   + <new role> = 1: lệnh chỉ có thể được sử dụng bởi quản trị viên"
				+ "\n   + <new role> = default: reset role lệnh về mặc định"
				+ "\n   Ví dụ:"
				+ "\n    {pn} rank 1: (lệnh rank sẽ chỉ có thể được sử dụng bởi quản trị viên)"
				+ "\n    {pn} rank 0: (lệnh rank sẽ có thể được sử dụng bởi mọi thành viên trong nhóm)"
				+ "\n    {pn} rank default: reset về mặc định"
				+ "\n—————"
				+ "\n   {pn} [viewrole|view|show]: xem role của những lệnh đã chỉnh sửa",
			en: "   {pn} <إسم الأمر> <قاعدة جديدة>: قم بضبط قاعدة جديدة للأوامر"
				+ "\n   مع:"
				+ "\n   + <إسم الأمر>: إسم الأمر"
				+ "\n   + <قاعدة جديدة>: قاعدة حديدة للأمر مع"
				+ "\n   + <قاعدة جديدة> = 0: يمكن للجميع أن يستخدم البوت في المجموعة"
				+ "\n   + <قاعدة جديدة> = 1: يمك للمشرف وحده إستخدام الأمر"
				+ "\n   + <قاعدة جديدة> = إستعادة: قن بإستعادة القواعد القديمة"
				+ "\n   مثال:"
				+ "\n    {pn} مستوى 1: (الأمر مستواي يمكن أن يستخدم من قبل المشرف وحده)"
				+ "\n    {pn} مستواي 0:يمكن للجميع إستخدام البوت)"
				+ "\n    {pn} مستواي إستعادة: قم بالإستعادة الأمر"
				+ "\n—————"
				+ "\n   {pn} [رؤية_القاعدة|رؤية|عرض]: قم برؤية قاعدة الأمر المعدل"
		}
	},

	langs: {
		vi: {
			noEditedCommand: "✅ Hiện tại nhóm bạn không có lệnh nào được chỉnh sửa role",
			editedCommand: "⚠️ Những lệnh trong nhóm bạn đã chỉnh sửa role:\n",
			noPermission: "❗ Chỉ có quản trị viên mới có thể thực hiện lệnh này",
			commandNotFound: "Không tìm thấy lệnh \"%1\"",
			noChangeRole: "❗ Không thể thay đổi role của lệnh \"%1\"",
			resetRole: "Đã reset role của lệnh \"%1\" về mặc định",
			changedRole: "Đã thay đổi role của lệnh \"%1\" thành %2"
		},
		en: {
			noEditedCommand: "✅ مجموعتك ليس لديها أمر معدّل",
			editedCommand: "⚠️ قامت مجموعتك بتحرير الأوامر:\n",
			noPermission: "❗ يمكن للمسؤول فقط استخدام هذا الأمر",
			commandNotFound: "الأمر \"%1\" لم يتم العثور عليه",
			noChangeRole: "❗ لا أستطيع تغيير قاعدة الأمر \"%1\"",
			resetRole: "تم إستعادة الأمر \"%1\" بنجاح✅",
			changedRole: "تم تغيير قاعدة الأمر \"%1\" إلى %2 بنجاح✅"
		}
	},

	onStart: async function ({ message, event, args, role, threadsData, getLang }) {
		const { commands, aliases } = global.GoatBot;
		const setRole = await threadsData.get(event.threadID, "data.setRole", {});

		if (["أريد_أن_أرى", "viewrole", "عرض"].includes(args[0])) {
			if (!setRole || Object.keys(setRole).length === 0)
				return message.reply(getLang("noEditedCommand"));
			let msg = getLang("editedCommand");
			for (const cmd in setRole) msg += `- ${cmd} => ${setRole[cmd]}\n`;
			return message.reply(msg);
		}

		let commandName = (args[0] || "").toLowerCase();
		let newRole = args[1];
		if (!commandName || (isNaN(newRole) && newRole !== "default"))
			return message.SyntaxError();
		if (role < 1)
			return message.reply(getLang("noPermission"));

		const command = commands.get(commandName) || commands.get(aliases.get(commandName));
		if (!command)
			return message.reply(getLang("commandNotFound", commandName));
		commandName = command.config.name;
		if (command.config.role > 1)
			return message.reply(getLang("noChangeRole", commandName));

		let Default = false;
		if (newRole === "default" || newRole == command.config.role) {
			Default = true;
			newRole = command.config.role;
		}
		else {
			newRole = parseInt(newRole);
		}

		setRole[commandName] = newRole;
		if (Default)
			delete setRole[commandName];
		await threadsData.set(event.threadID, setRole, "data.setRole");
		message.reply("✅ " + (Default === true ? getLang("resetRole", commandName) : getLang("changedRole", commandName, newRole)));
	}
};