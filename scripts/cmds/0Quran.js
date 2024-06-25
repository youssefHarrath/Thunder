const fs = require('fs');

module.exports = {
    config: {
        name: "قرآن",
        version: "1.0",
        author: "حسين يعقوبي",
        role: 0,
        countdown: 10,
        reward: Math.floor(Math.random() * (100 - 50 + 1) + 50),
        category: "إسلام",
        shortDescription: {
            en: "تخمين سورة قرآنية من خلال الآيات"
        },
        longDescription: {
            en: "تعرف على إسم السورة من خلال الآيات"
        },
        guide: {
            en: "{prefixقرآن - ابدأ لعبة معرفة أسماء السور"
        }
    },

    onStart: async function ({ message, event, commandName }) {
        const characters = JSON.parse(fs.readFileSync('Quran.json'));
        const randomCharacter = characters[Math.floor(Math.random() * characters.length)];

        // Attach the character image
        const imageStream = await global.utils.getStreamFromURL(randomCharacter.image);

        // Send the message with the attached image
        message.reply({
            body: ` ⚜️ | ما هو إسم السورة الكريمة ؟`,
            attachment: imageStream
        }, async (err, info) => {
            global.GoatBot.onReply.set(info.messageID, {
                commandName,
                messageID: info.messageID,
                author: event.senderID,
                answer: randomCharacter.name
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
            message.reply(`تهانينا يا 🎉🎊 ${userName[event.senderID].name}، لقد حزرت إسم السورة وحصلت بذالك على مبلغ ${reward} دولار 💵 !`);
            api.setMessageReaction("✅", event.messageID, (err) => {}, true);
        } else {
            message.unsend(event.messageReply.messageID); // حذف الرسالة في حالة الإجابة الخاطئة أيضًا
            message.reply("❌ | آسف، هذا غير صحيح\n 💱 |حظا موفقا في المرة القادمة 🙂.");
            api.setMessageReaction("❌", event.messageID, (err) => {}, true);
        }
    }
};
