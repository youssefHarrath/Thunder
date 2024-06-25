module.exports = {
	config: {
		name: "ثريدز",
		aliases: [],
		author: "kshitiz",
		version: "2.0",
		cooldowns: 5,
		role: 2,
		shortDescription: {
			en: "قائمة كل المجموعات اللتي يتواجد بها البوت"
		},
		longDescription: {
			en: "استخدم هذا الأمر لللإطلاع على قائمة المجموعات اللتي يتواجد فيها البوت حاليًا."
		},
		category: "المالك",
		guide: {
			en: "{p}{n} "
		}
	},
	onStart: async function ({ api, event }) {
		try {
			const groupList = await api.getThreadList(100, null, ['INBOX']);


			const filteredList = groupList.filter(group => group.threadName !== null);

			if (filteredList.length === 0) {

				await api.sendMessage(' ⚠️ |ليس هناك أي مجموعات.', event.threadID);
			} else {
				const formattedList = filteredList.map((group, index) =>
					`│${index + 1}. ${group.threadName}\n│آيدي المجموعة: ${group.threadID}`
				);
				const message = `╭─╮\n│قائمة المجموعات:\n${formattedList.map(line => `${line}`).join("\n")}\n╰───────────ꔪ`;
				await api.sendMessage(message, event.threadID, event.messageID);
			}
		} catch (error) {
			console.error("Error listing group chats", error);
		}
	},
};