module.exports = {
	config: {
		name: "أكتب",
		version: "1.0",
		author: "Samir", // Time to wait before executing command again (seconds)
		role: 0,
		category: "متعة",
		guide: {
			vi: "Not Available",
			en: "أكتب + (الرسالة التي تريد أن يكتبها البوت)"
		} 
	},

	onStart: async function ({ api, args, event }) {
	var say = args.join(" ")
	if (!say) api.sendMessage("أرحوك أدخل رسالة", event.threadID, event.messageID)
	else api.sendMessage(`${say}`, event.threadID, event.messageID);
  }
  
};