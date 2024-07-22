const fs = require('fs');

module.exports = {
    config: {
        name: "تفكيك",
        version: "1.0",
        author: "يوسف",
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
        const words = [
            "سيارة", "كتاب", "تفاحة", "مدرسة", "حديقة", "كمبيوتر", "هاتف", "مكتب", "مطبخ", "شجرة",
            "نهر", "طائرة", "قطار", "باب", "نافذة", "شارع", "جبل", "بحر", "قلم", "ورقة",
            "مدينة", "قرية", "مكتبة", "مصنع", "مزرعة", "حديقة", "بستان", "وردة", "زهرة", "كتاب",
            "مسرح", "سينما", "متحف", "مطار", "ميناء", "سفينة", "طريق", "طاولة", "كرسي", "سرير",
            "كنبة", "ثلاجة", "تلفاز", "راديو", "ساعة", "مرآة", "غرفة", "بيت", "سطح", "جدار"
        ];
        const randomWord = words[Math.floor(Math.random() * words.length)];

        message.reply({
            body: `✿━━━━━━━━━━━━━━━✿\n ⚜️ | فكك الكلمة التالية: ${randomWord}\n✿━━━━━━━━━━━━━━━✿`
        }, async (err, info) => {
            global.GoatBot.onReply.set(info.messageID, {
                commandName,
                messageID: info.messageID,
                author: event.senderID,
                answer: randomWord.split('').join(' ')
            });
        });
    },

    onReply: async ({ message, Reply, event, usersData, api, commandName }) => {
        const { author, messageID, answer } = Reply;

        const userAnswer = event.body.trim();

        if (userAnswer === answer) {
            global.GoatBot.onReply.delete(messageID);
            if (event.messageReply && event.messageReply.messageID) {
                message.unsend(event.messageReply.messageID);
            }
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
