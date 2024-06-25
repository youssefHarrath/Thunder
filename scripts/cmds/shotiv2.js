module.exports = {
	config: {
		name: "إعادة_إرسال",
		version: "5.0",
		author: "Sadman Anik",
		countDown: 1,
		role: 2,
		shortDescription: {
			en: "قم بتغعيل أدإعادة الارسال الرسائل المحذوفة او تعطيل الخاصية"
		},
		longDescription: {
			en: "مضاد حءف الرسائل يمكن تفعيله كما يمكن تعطيله"
		},
		category: "النظام",
		guide: {
			en :"{pn} تشغيل أو إيقاف مثال : {pn} تشغيل"
		},
		envConfig: {
			deltaNext: 5
		}
	},


	onStart: async function ({ api, message, event, threadsData, args }) {
let resend = await threadsData.get(event.threadID, "settings.reSend");

			//console.log(resend)
		if(resend === undefined){
			await threadsData.set(event.threadID, true, "settings.reSend");
		}
		//console.log(await threadsData.get(event.threadID, "settings.reSend"))
		if (![, "تشغيل"].includes(args[0]))
			return message.reply("إيقاف")
		await threadsData.set(event.threadID, args[0] === "تشغيل", "settings.reSend");
		console.log(await threadsData.get(event.threadID, "settings.reSend"))
		if(args[0] == "تشغيل"){
			if(!global.reSend.hasOwnProperty(event.threadID)){
		global.reSend[event.threadID] = []
		}
		global.reSend[event.threadID] = await api.getThreadHistory(event.threadID, 100, undefined)
}
		return message.reply(`${args[0] === "تشغيل" ? "تم" : "تم ✅"}`);
	},

onChat: async function ({ api, threadsData, usersData, event, message }) {
	if(event.type !== "message_unsend"){
		let resend = await threadsData.get(event.threadID, "settings.reSend");
		if (!resend)
			return;

		if(!global.reSend.hasOwnProperty(event.threadID)){
		global.reSend[event.threadID] = []
		}
		global.reSend[event.threadID].push(event)

	if(global.reSend.length >50){
		global.reSend.shift()
			}
		}
	}
}