module.exports = {
  config: {
    name: 'سبام',
    aliases: ['Spam'],
    version: '1.0',
    author: 'Eugene Aguilar',
    countDown: 2,
    role: 2,
    shortDescription: 'قم بإرسال العديد من الرسائل في وقت وجيز',
    longDescription: 'قم بإرسال العديد من الرسائل في ظرف وجيز ',
    category: 'متعة',
    guide: '{pn}',
  },

onStart: async function ({ api, event, args }) {
   
	const amount = parseInt(args[0]);
	const message = args.slice(1).join(" ");

	if (isNaN(amount) || !message) {
		return api.sendMessage(`إستخدام خاطئ. إستخدم: ©سبام [الكمية] [الرسالة]`, event.threadID);
	}

	for (let i = 0; i < amount; i++) {
		api.sendMessage(message, event.threadID);
	}
},
	};