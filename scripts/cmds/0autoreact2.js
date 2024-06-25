const axios = require('axios');
let autoReact = "on";

module.exports = {
    config: {
        name: "تفاعل_تلقائي2",
        aliases: [], 
        version: "1.0",
        hasPermission: 2, 
        role: 0, 
        author: "LiANE", 
        credits: "LiANE", 
        description: "خاص بالنظام يقوم بجعل البوت يتفاعل مع الاعضاء", 
        shortDescription: "يقوم بجعل البوت يتفاعل مع الاعضاء تلقائيا", 
        longDescription: " يقوم بجعل البوت بتفاعل مع المجموعة بإبموجي حسب محتوى النص", 
        usePrefix: true, 
        category: "النظام", 
        commandCategory: "Noprefix", 
        usages: "Wala", 
        guide: " تشغيل/إيقاف", 
        cooldowns: 5, 
        countDown:  5 // Removed the comma at the end
    },
    onMAIN: async({ api, event }, botType) => {
        const [cmd, ...args] = event.body.split(" ");
if (args[0] === "status") {
}
       else if (args[0] === "تشغيل") {
            autoReact = "نشط";
        } else if (args[0] === "إيقاف") {
            autoReact = "معطل";
        } else {
            if (autoReact === "On") {
                autoReact = "Off";
            } else if (autoReact === "Off") { 
                autoReact = "On";
            }
        }

        api.sendMessage(`✨ |  تفاعل تلقائي من أجل : ${botType}

 ✅ | تالتفاعل التلقائي حين سيقوم البوت بالتفاعل مع رسائل الأعضاء حسب محتوى الرسالة
🎉
 | الحالة : ${autoReact}`, event.threadID);
    },
    onStart: async (context) => {
        const botType = "ميدوريا البوت";
        await module.exports.onMAIN(context, botType); 
    },
    run: async (context) => {
        const botType = "Botpack / Mirai";
        await module.exports.onMAIN(context, botType); 
    },
    onChat: async (context) => { 
        const { api, event } = context;
if (autoReact === "Off") 
{
return;
}

        // Probability of 40%, adjust it depending on what you need, but not 100%, please
        if (Math.random() < 0.7) {
            const response = await axios.get(`https://school-project-lianefca.bene-edu-ph` + `.repl.co/autoreact?query=${encodeURIComponent(event.body)}`);
            const emoji = response.data.message;
            api.setMessageReaction(emoji, event.messageID, () => {}, true);
        }
    }, 
    handleEvent: async (context) => {
        await module.exports.onChat(context);
    },
};