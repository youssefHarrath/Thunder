const axios = require('axios');

async function kickUser({ api, event }) {
    try {
        const threadInfo = await api.getThreadInfo(event.threadID);

        if (!threadInfo.adminIDs.some(admin => admin.id === api.getCurrentUserID())) {
            return api.sendMessage('⚠️ | هات آدمن وهات تشوف', event.threadID);
        }

        await api.removeUserFromGroup(event.senderID, event.threadID);
        api.sendMessage('ناقص واحد ناقص مشكلة 😏.', event.threadID);
    } catch (error) {
        console.error(error);
        api.sendMessage('حدث خطأ أثناء تنفيذ الأمر. يرجى المحاولة مرة أخرى.', event.threadID);
    }
}

module.exports = {
    config: {
        name: "أطردني",
        version: "1.0",
        author: "مؤلف",
        countDown: 10,
        shortDescription: "أمر ليطرد الشخص الذي أدخل هذا الأمر.",
        longDescription: {
            en: "A command to kick the person who entered this command."
        },
        category: "خدمات",
        guide: {
            en: "إستخدم ©أطردني لكي يقوم البوت بطردك خارجا."
        }
    },

    onStart: async function ({ api, event, args, message }) {
        message.reply("جاري التنفيذ...⏳", async (err, info) => {
            try {
                await kickUser({ api, event });
                message.unsend(info.messageID);
            } catch (error) {
                console.error(error);
                api.sendMessage(`${error}`, event.threadID);
            }
        });
    },
};
