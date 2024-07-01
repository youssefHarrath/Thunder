module.exports = {
 config: {
 name: "إرشاد",
 version: "1.0",
 author: "Jaychris Garcia",
 countDown: 5,
 role: 0,
 shortDescription: "بدون_بادئة",
 longDescription: "بدون بادئة",
 category: "النظام",
 }, 
 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "الرعد") {
 return message.reply({
 body: "أهلا أنا ميدوريا قم بكتابة .اوامر  من أجل رؤية قائمة الأوامر.",
 attachment: await global.utils.getStreamFromURL("https://i.postimg.cc/3rXfkCCw/FB-IMG-1719261281834.jpg")
 });
 }
 }
}
