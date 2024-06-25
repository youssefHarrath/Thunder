module.exports = {
    config: {
        name: "أهلا",
        version: "1.0",
        author: "Jaychris Garcia",
        countDown: 5,
        role: 0,
        shortDescription: "صراخ",
        longDescription: "صراخ",
        category: "النظام",
    },
onStart: async function(){}, 
onChat: async function({
    event,
    message,
    getLang
}) {
    if (event.body && event.body.toLowerCase() == "مرحبا") return message.reply("أهلا يا أخي  كيف يمكنني مساعدتك🙂؟");
}
};