const fs = require("fs");
const moment = require("moment-timezone");

module.exports = {
    config: {
        name: "عدم_الإضافة",
        version: "1.2.0",
        author: "JOHN RÉ PORAS",
        description: "منع المستخدمين من إضافة  إلى مجموعات أخرى دون موافقة.",
        category: "النظام",
        cooldown: 0,
        role: 2, // Only bot admins can use this command
        shortDescription: {
            en: " - منع الإضافة غير المصرح بها لـ مستخدمين بدون موافقة",
            tl: "Antiaddbot - Pigilan ang di-awtorisadong pagdagdag ng GoatBot"
        },
        longDescription: {
            en: "عدم_الإضافة - منع المستخدمين من إضافة البوت إلى مجموعات أخرى دون موافقة.",
            tl: "Antiaddbot - Pigilan ang mga user na magdagdag ng GoatBot sa ibang mga grupo nang walang pahintulot."
        },
        guide: {
            en: "{p}antiaddbot",
            tl: "{p}antiaddbot"
        }
    },

    onStart: function () {}, // Add this empty function

    handleEvent: async function({ api, event }) {
        if (event.type === "thread-add" && event.author) {
            const authorID = event.author;
            const threadID = event.threadID;
            const botAdmins = await getBotAdmins();
            const botOwnerID = botAdmins[0]; 

            if (botAdmins.includes(authorID)) {
                return;
            }

            await api.sendMessage(" ⚠️ | ليس لديك الإءن لتضيفني إلى مجموعات أخرى", authorID);

            const threadInfo = await api.getThreadInfo(threadID);
            const threadName = threadInfo.threadName || "هذه المجموعة";
            const timestamp = moment.tz("Africa/Casablanca ").format("YYYY-MM-DD HH:mm:ss");
            const adminMessage = `${event.senderID} يحاول إدخالي إلى مجموعة د ${threadName} في ${timestamp}.`;
            await api.sendMessage(adminMessage, botOwnerID);
        }
    }
};

async function getBotAdmins() {
    try {
        const data = await fs.promises.readFile(__dirname + "/bot_admins.json", "utf-8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}