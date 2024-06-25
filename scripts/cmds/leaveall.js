module.exports = {
 config: {
 name: "إرفعني_أدمن",
 version: "1.0",
 author: "Samir",
 countDown: 5,
 role: 0,
 shortDescription: "إجعل نفسك مشرف على البوت و المجموعة",
 longDescription: "إجعل نفسك مسؤواا على المجموعة و البوت معا",
 category: "النظام",
 },
onStart: async function(){}, 
onChat: async function({
 event,
 message,
 getLang
}) {
 if (event.body && event.body.toLowerCase() == "إرفعني_أدمن") return message.reply("هل أنت غبي 😂 بالطبع إنها كانت مجرد مزحة 🤪 ولقد وقعت في الفخ 🤣");
}
};