module.exports = {
	config: {
		name: "ألوان",
		aliases: [],
		author: "kshitiz",
		version: "2.0",
		cooldowns: 20,
		role: 0,
		shortDescription: {
			en: "يبحث عن شاذ أو الوان في المجموعة",
		},
		longDescription: {
			en: "قم بالبحث عن شاء أو ألوان",
		},
		category: "متعة",
		guide: {
			en: "{p}{n} ألوان",
		},
	},
	onStart: async function ({ api, event, message }) {
		const groupId = event.threadID;
		const groupMembers = await api.getThreadInfo(groupId);

		const friends = groupMembers.participantIDs.filter((userId) => !groupMembers.nicknames[userId]);

		if (friends.length === 0) {
			message.reply(" ✅ | المجموعة نظيفة ليس هناك أي شاذ في المجموعة.");
			return;
		}

		const randomIndex = Math.floor(Math.random() * friends.length);
		const randomUserId = friends[randomIndex];

		const userInfo = await api.getUserInfo([randomUserId]);
		const realName = userInfo[randomUserId].name;


		const url = "https://drive.google.com/uc?export=download&id=1K8F9J7Y44Ja0OKCI9uknnnqYJCSPQZIw";


		const loadingMessage = await api.sendMessage(" ⏱️ | جاري البحث عن شاذ في المجموعة 🤡......", groupId);


		kaguya.reply({
			body: ` ⚠️ | تم تحديد شاذ في المجموعة \nهذا الشخص المسمى ب  ${realName} هو شاذ 🏳️‍🌈 `,
			attachment: await global.utils.getStreamFromURL(url),
		});


		await api.unsendMessage(loadingMessage.messageID);
	},
};