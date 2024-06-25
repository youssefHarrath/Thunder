global.botData = {};

module.exports = {
		config: {
				name: "صمت",
				version: "1.2",
				description: "قم بتشغيله و إيقافه",
				guide: {
						vi: "Dùng để bật/tắt chức năng chat",
						en: "يستخدم لتشغيل/إيقاف وظيفة الدردشة"
				},
				category: "خدمات",
				countDown: 15,
				role: 1,
				author: "Cliff"
		},

		onStart: async function ({ message, args, role, getLang }) {
				if (args[0] === "إيقاف") {
						if (role < 1) {
								return message.reply(getLang("onlyAdmin"));
            }
						global.botData.chatEnabled = true;
						message.reply(" ❌ | تم تعطيل مود الصمت ، ويمكن للجميع أن يتحدث بحرية");
				} else if (args[0] === "تشغيل") {
						if (role < 1) {
								return message.reply(getLang("onlyAdmin"));
						}
						global.botData.chatEnabled = false;
						message.reply(" ✅ | تم تشغيل مود.الصمت ، ولن يستطيع أحد التحدث وإلا سيبلع طرد.");
				}
		},

		onChat: async function ({ message, event, api, getLang }) {
				const chatEnabled = global.botData.chatEnabled === undefined ? true : global.botData.chatEnabled;

				if (!chatEnabled) {
						
						api.removeUserFromGroup(event.senderID, event.threadID, (err) => {
								if (err) {
										console.error(err);
								}
						});
						message.reply(" ⚠️ | تم تحديد شخص يتحدث لهذا تم طرده من المجموعة.");
				}
		}
};