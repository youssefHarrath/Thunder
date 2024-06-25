module.exports = {
 config: {
	 name: "بريفكس",
	 version: "1.0",
	 author: "Cliff",
	 countDown: 5,
	 role: 0,
	 shortDescription: "بدون بادئة",
	 longDescription: "بدون بادئة",
	 category: "النظام",
 },

 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "prefix") {
 return message.reply({
 body: `

   [ ميـבوريا البوت ] 
━━━━━━━━━━━━━━━━━━━

مرحبًا! يبدو أنك لست على دراية بالبادئة الخاصة بي!، إليك دليل، الإستخدام  : ⬅️

👑 بادئة النظام : ⬅️【 © 】
🐰 بادئة المجموعة : ⬅️ 【 © 】

📌 لا تنسى اللفظ وإن ضاق عليك الرد

⚙ مزيد من الخيارات 
➖ ✅ [ -تيك ] 
➖ 🎰 [ -رهان ]
➖ 🎯 [ -تحويل ]
➖ 🏦 [- بنك ]
➖ 📝 [ -رصيدي ]

📍المالك  : حسين يعقوبي`,
 attachment: await global.utils.getStreamFromURL("https://i.imgur.com/EVktxbQ.gif")
 });
 }
 }
}