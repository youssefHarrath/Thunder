const { getPrefix } = global.utils;

module.exports = {
	config: {
		name: "قواعد",
		version: "1.5",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "Quy tắc của nhóm",
			en: "قواعد المجموعة"
		},
		longDescription: {
			vi: "Tạo/xem/thêm/sửa/đổi vị trí/xóa nội quy nhóm của bạn",
			en: "إنشاء/عرض/إضافة/تعديل/تغيير المكان/حذف قواعد المجموعة الخاصة بك"
		},
		category: "المجموعة",
		guide: {
			vi: "   {pn} [إضافة | -a] <nội quy muốn thêm>: thêm nội quy cho nhóm."
				+ "\n   {pn}: xem nội quy của nhóm."
				+ "\n   {pn} [edit | -e] <n> <nội dung sau khi sửa>: chỉnh sửa lại nội quy thứ n."
				+ "\n   {pn} [move | -m] <stt1> <stt2> hoán đổi vị trí của nội quy thứ <stt1> và <stt2> với nhau."
				+ "\n   {pn} [delete | -d] <n>: xóa nội quy theo số thứ tự thứ n."
				+ "\n   {pn} [remove | -r]: xóa tất cả nội quy của nhóm."
				+ "\n"
				+ "\n   Ví dụ:"
				+ "\n    {pn} add không spam"
				+ "\n    {pn} move 1 3"
				+ "\n    {pn} -e 1 không spam tin nhắn trong nhóm"
				+ "\n    {pn} -r",
			en: "   {pn} [إضافة | -a] <القواعد اللتي ستتم إضافتها>: قم بإضافة قاعدة إلى المجموعة."
				+ "\n   {pn}: قم برؤية قواعد المجموعة."
				+ "\n   {pn} [تعديل | -e] <n> <المحتوى قبل التعديل>: قم بالتعديل على القاعدة رقم n."
				+ "\n   {pn} [إزالة | -m] <القاعدة رقم 1> <القاعدة رقم 2> مبادلة موقف رقم القاعدة <stt1> و <القاعدة 2>."
				+ "\n   {pn} [حذف | -d] <n>: حذف القاعدة رقم n."
				+ "\n   {pn} [إزالة | -r]: إزالة جميع القواعد في المجموعة."
				+ "\n"
				+ "\n   مثال :"
				+ "\n    {pn} إضافة يدون سبام"
				+ "\n    {pn} نقل 1 3"
				+ "\n    {pn} تعديل 1 لا تقم بعمل سبام للمجموعة"
				+ "\n    {pn} إزالة"
		}
	},

	langs: {
		vi: {
			yourRules: "Nội quy của nhóm bạn\n%1",
			noRules: "Hiện tại nhóm bạn chưa có bất kỳ nội quy nào, để thêm nội quy cho nhóm hãy sử dụng `%1rules add`",
			noPermissionAdd: "Chỉ quản trị viên mới có thể thêm nội quy cho nhóm",
			noContent: "Vui lòng nhập nội dung cho nội quy bạn muốn thêm",
			success: "Đã thêm nội quy mới cho nhóm thành công",
			noPermissionEdit: "Chỉ quản trị viên mới có thể chỉnh sửa nội quy nhóm",
			invalidNumber: "Vui lòng nhập số thứ tự của quy định bạn muốn chỉnh sửa",
			rulesNotExist: "Không tồn tại nội quy thứ %1",
			numberRules: "Hiện tại nhóm bạn chỉ có %1 nội quy được đặt ra",
			noContentEdit: "Vui lòng nhập nội dung bạn muốn thay đổi cho nội quy thứ %1",
			successEdit: "Đã chỉnh sửa nội quy thứ %1 thành: %2",
			noPermissionMove: "Chỉ quản trị viên mới có thể đổi vị trí nội quy của nhóm",
			invalidNumberMove: "Vui lòng nhập số thứ tự của 2 nội quy nhóm bạn muốn chuyển đổi vị trí với nhau",
			sameNumberMove: "Không thể chuyển đổi vị trí của 2 nội quy giống nhau",
			rulesNotExistMove2: "Không tồn tại nội quy thứ %1 và %2",
			successMove: "Đã chuyển đổi vị trí của 2 nội quy thứ %1 và %2 thành công",
			noPermissionDelete: "Chỉ quản trị viên mới có thể xóa nội quy của nhóm",
			invalidNumberDelete: "Vui lòng nhập số thứ tự của nội quy bạn muốn xóa",
			rulesNotExistDelete: "Không tồn tại nội quy thứ %1",
			successDelete: "Đã xóa nội quy thứ %1 của nhóm, nội dung: %2",
			noPermissionRemove: "Chỉ có quản trị viên nhóm mới có thể xoá bỏ tất cả nội quy của nhóm",
			confirmRemove: "⚠️ Thả cảm xúc bất kỳ vào tin nhắn này để xác nhận xóa toàn bộ nội quy của nhóm",
			successRemove: "Đã xóa toàn bộ nội quy của nhóm thành công",
			invalidNumberView: "Vui lòng nhập số thứ tự của nội quy bạn muốn xem"
		},
		en: {
			yourRules: " ⚜️ |قواعد مجموعتك \n%1",
			noRules: " ⚠️ |ليس لدى مجموعتك أي قواعد، لإضافة قواعد في المجموعة إستخدم `%1قواعد إضافة`",
			noPermissionAdd: " ❌ | فقط آدمنز المجموعة يمكنهم إستعمال هذا الأمر",
			noContent: " ⁉️ | المرجو إدخال محتوى القاعدة",
			success: " ✅ | تمت إضافة قاعدة جديدة إلى المجموعة بنجاح",
			noPermissionEdit: " ❌ | فقط آدمنز المجموعة يمكنهم التعديل على القواعد",
			invalidNumber: " ⚠️ | أرجوك قم بإدخال رقم القاعدة اللتي تريد التعديل عليها",
			rulesNotExist: " ❗ | القاعدة رقم %1 غير موجودة أساسا",
			numberRules: " 🌟 | مجموعتك لديها فقط  %1 من القواعد",
			noContentEdit: " ⚠️ | أرجوك قم بإدخال المحتوى اللذي تريد بواسطته تعديل القاعدة %1",
			successEdit: " ✅ | تم تعديل القاعدة %1 إلى: %2 بنجاح",
			noPermissionMove: " ❌ | فقط آدمنز المجموعة من يمكنهم نقل القواعد",
			invalidNumberMove: " ⚠️ | المرجو إدخال إثنين من القواعد اللذان تريد تبديل أمكنتهم",
			sameNumberMove: "❌ | لايمكن تغيير مكان 2 لأنهم نفس القواعد",
			rulesNotExistMove2: " ❗ | القاعدة %1 و %2 غير موجودان",
			successMove: " ✅ | تم تغيير أمكنة القاعدة رقم %1 و %2 بنجاح",
			noPermissionDelete: " ❌ | فقط آدمن المجموعة من يمكنهم حذف القواعد",
			invalidNumberDelete: " ⚠️ | أرجوك قم بإدخال إسم القاعدة اللتي ترغب في حذفها",
			rulesNotExistDelete: " ❗ | القاعدة رقم %1 غير موجودة",
			successDelete: "✅ | تم حذف محتوى القاعدة %1 من المجموعة : %2",
			noPermissionRemove: " ❌ | فقط الآدمن من يمكنهم إزالة جميع قواعد المجموعة برمتها",
			confirmRemove: "⚠️ قم بالتفاعل على هذه الرسالة باستخدام أي إيموجي لتأكيد إزالة جميع قواعد المجموعة",
			successRemove: " ✅ | تمت إزالة جميع قواعد المجموعة",
			invalidNumberView: " ⚠️ | أرجوك قم بإدخال رقم القاعدة اللتي تريد أن يتم عرضها"
		}
	},

	onStart: async function ({ role, args, message, event, threadsData, getLang, commandName }) {
		const { threadID, senderID } = event;

		const type = args[0];
		const rulesOfThread = await threadsData.get(threadID, "data.rules", []);
		const totalRules = rulesOfThread.length;

		if (!type) {
			let i = 1;
			const msg = rulesOfThread.reduce((text, rules) => text += `${i++}. ${rules}\n`, "");
			message.reply(msg ? getLang("yourRules", msg) : getLang("noRules", getPrefix(threadID)), (err, info) => {
				global.GoatBot.onReply.set(info.messageID, {
					commandName,
					author: senderID,
					rulesOfThread,
					messageID: info.messageID
				});
			});
		}
		else if (["add", "-a"].includes(type)) {
			if (role < 1)
				return message.reply(getLang("noPermissionAdd"));
			if (!args[1])
				return message.reply(getLang("noContent"));
			rulesOfThread.push(args.slice(1).join(" "));
			try {
				await threadsData.set(threadID, rulesOfThread, "data.rules");
				message.reply(getLang("success"));
			}
			catch (err) {
				message.err(err);
			}
		}
		else if (["edit", "-e"].includes(type)) {
			if (role < 1)
				return message.reply(getLang("noPermissionEdit"));
			const stt = parseInt(args[1]);
			if (stt === NaN)
				return message.reply(getLang("invalidNumber"));
			if (!rulesOfThread[stt - 1])
				return message.reply(`${getLang("rulesNotExist", stt)}, ${totalRules == 0 ? getLang("noRules") : getLang("numberRules", totalRules)}`);
			if (!args[2])
				return message.reply(getLang("noContentEdit", stt));
			const newContent = args.slice(2).join(" ");
			rulesOfThread[stt - 1] = newContent;
			try {
				await threadsData.set(threadID, rulesOfThread, "data.rules");
				message.reply(getLang("successEdit", stt, newContent));
			}
			catch (err) {
				message.err(err);
			}
		}
		else if (["move", "-m"].includes(type)) {
			if (role < 1)
				return message.reply(getLang("noPermissionMove"));
			const num1 = parseInt(args[1]);
			const num2 = parseInt(args[2]);
			if (isNaN(num1) || isNaN(num2))
				return message.reply(getLang("invalidNumberMove"));
			if (!rulesOfThread[num1 - 1] || !rulesOfThread[num2 - 1]) {
				let msg = !rulesOfThread[num1 - 1] ?
					!rulesOfThread[num2 - 1] ?
						message.reply(getLang("rulesNotExistMove2", num1, num2)) :
						message.reply(getLang("rulesNotExistMove", num1)) :
					message.reply(getLang("rulesNotExistMove", num2));
				msg += `, ${totalRules == 0 ? getLang("noRules") : getLang("numberRules", totalRules)}`;
				return message.reply(msg);
			}
			if (num1 == num2)
				return message.reply(getLang("sameNumberMove"));

			// swap
			[rulesOfThread[num1 - 1], rulesOfThread[num2 - 1]] = [rulesOfThread[num2 - 1], rulesOfThread[num1 - 1]];
			try {
				await threadsData.set(threadID, rulesOfThread, "data.rules");
				message.reply(getLang("successMove", num1, num2));
			}
			catch (err) {
				message.err(err);
			}
		}
		else if (["delete", "del", "-d"].includes(type)) {
			if (role < 1)
				return message.reply(getLang("noPermissionDelete"));
			if (!args[1] || isNaN(args[1]))
				return message.reply(getLang("invalidNumberDelete"));
			const rulesDel = rulesOfThread[parseInt(args[1]) - 1];
			if (!rulesDel)
				return message.reply(`${getLang("rulesNotExistDelete", args[1])}, ${totalRules == 0 ? getLang("noRules") : getLang("numberRules", totalRules)}`);
			rulesOfThread.splice(parseInt(args[1]) - 1, 1);
			await threadsData.set(threadID, rulesOfThread, "data.rules");
			message.reply(getLang("successDelete", args[1], rulesDel));
		}
		else if (["remove", "reset", "-r", "-rm"].includes(type)) {
			if (role < 1)
				return message.reply(getLang("noPermissionRemove"));
			message.reply(getLang("confirmRemove"), (err, info) => {
				global.GoatBot.onReaction.set(info.messageID, {
					commandName: "rules",
					messageID: info.messageID,
					author: senderID
				});
			});
		}
		else if (!isNaN(type)) {
			let msg = "";
			for (const stt of args) {
				const rules = rulesOfThread[parseInt(stt) - 1];
				if (rules)
					msg += `${stt}. ${rules}\n`;
			}
			if (msg == "")
				return message.reply(`${getLang("rulesNotExist", type)}, ${totalRules == 0 ? getLang("noRules") : getLang("numberRules", totalRules)}`);
			message.reply(msg);
		}
		else {
			message.SyntaxError();
		}
	},

	onReply: async function ({ message, event, getLang, Reply }) {
		const { author, rulesOfThread } = Reply;
		if (author != event.senderID)
			return;
		const num = parseInt(event.body || "");
		if (isNaN(num) || num < 1)
			return message.reply(getLang("invalidNumberView"));
		const totalRules = rulesOfThread.length;
		if (num > totalRules)
			return message.reply(`${getLang("rulesNotExist", num)}, ${totalRules == 0 ? getLang("noRules") : getLang("numberRules", totalRules)}`);
		message.reply(`${num}. ${rulesOfThread[num - 1]}`, () => message.unsend(Reply.messageID));
	},

	onReaction: async ({ threadsData, message, Reaction, event, getLang }) => {
		const { author } = Reaction;
		const { threadID, userID } = event;
		if (author != userID)
			return;
		await threadsData.set(threadID, [], "data.rules");
		message.reply(getLang("successRemove"));
	}
};
