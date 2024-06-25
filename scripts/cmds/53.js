module.exports = {
 config: {
 name: "المسؤول",
 version: "1.0",
 author: "Samir",
 countDown: 5,
 role: 0,
 shortDescription: "اجعل نفسك مسؤولاً عن البوت والمجموعة",
 longDescription: "اجعل نفسك مسؤولاً عن البوت والمجموعة",
 category: "المالك",
 },
onStart: async function(){}, 
onChat: async function({
 event,
 message,
 getLang
}) {
 if (event.body && event.body.toLowerCase() == "المشرف") return message.reply("مضحك جداً! هل انت غبي  أم أنك ملك الغباء 😛 ههههههههههههههههههههههههههههه🤣");
}
};