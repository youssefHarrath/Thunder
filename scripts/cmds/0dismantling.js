const fs = require('fs');

module.exports = {
    config: {
        name: "تفكيك",
        version: "1.0",
        author: "حسين يعقوبي",
        role: 0,
        countdown: 10,
        reward: Math.floor(Math.random() * (100 - 50 + 1) + 50),
        category: "لعبة",
        shortDescription: {
            en: "لعبة تفكيك الكلمات"
        },
        longDescription: {
            en: "فكك الكلمة لتحصل على الجائزة"
        },
        guide: {
            en: "{prefix}تفكيك - ابدأ لعبة تفكيك الكلمات"
        }
    },

    onStart: async function ({ message, event, commandName }) {
        const words = ["سيارة", "كتاب", "تفاحة", "مدرسة", "حديقة"];
        const randomWord = words[Math.floor(Math.random() * words.length)];
        const scrambledWord = randomWord.split('').sort(() => 0.5 - Math.random()).join(' ');

        message.reply({
            body: `✿━━━━━━━━━━━━━━━━━✿\n ⚜️ | فكك الكلمة التالية: ${scrambledWord}\n✿━━━━━━━━━━━━━━━━━✿`
        }, async (err, info) => {
            global.GoatBot.onReply.set(info.messageID, {
                commandName,
                messageID: info.messageID,
                author: event.senderID,
                answer: randomWord
            });
        });
    },

    onReply: async ({ message, Reply, event, usersData, api, commandName }) => {
        const { author, messageID, answer } = Reply;

        const userAnswer = event.body.trim();

        if (userAnswer === answer) {
            global.GoatBot.onReply.delete(messageID);
            message.unsend(event.messageReply.messageID);
            const reward = Math.floor(Math.random() * (100 - 50 + 1) + 50);
            await usersData.addMoney(event.senderID, reward);
            const userName = await api.getUserInfo(event.senderID);
            message.reply(`تهانينا 🎉🎊 ${userName[event.senderID].name}، لقد فزت بمبلغ ${reward} دولار 💵 !`);
            api.setMessageReaction("✅", event.messageID, (err) => {}, true);
        } else {
            message.reply("❌ | آسف، هذا غير صحيح.");
            api.setMessageReaction("❌", event.messageID, (err) => {}, true);
        }
    }
};
