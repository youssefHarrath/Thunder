const fs = require('fs');

module.exports = {
    config: {
        name: "شخصيات",
        version: "1.0",
        author: "حسين يعقوبي",
        role: 0,
        countdown: 10,
        reward: Math.floor(Math.random() * (100 - 50 + 1) + 50),
        category: "لعبة",
        shortDescription: {
            en: "حزمة الشخصيات"
        },
        longDescription: {
            en: "تعرف على الشخصيات"
        },
        guide: {
            en: "{prefix}شخصيات - ابدأ لعبة معرفة الشخصيات"
        }
    },

    onStart: async function ({ message, event, commandName }) {
        const characters = JSON.parse(fs.readFileSync('anime.json'));
        const randomCharacter = characters[Math.floor(Math.random() * characters.length)];

        // Attach the character image
        const imageStream = await global.utils.getStreamFromURL(randomCharacter.image);

        // Send the message with the attached image
        message.reply({
            body: `✿━━━━━━━━━━━━━━━━━━✿\n ⚜️ | ما هو اسم الشخصية في الصورة ؟\n✿━━━━━━━━━━━━━━━━━━✿`,
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
            message.reply(`تهانينا 🎉🎊 ${userName[event.senderID].name}، لقد فزت بمبلغ ${reward} دولار 💵 !`);
            api.setMessageReaction("✅", event.messageID, (err) => {}, true);
        } else {
            message.unsend(event.messageReply.messageID); // حذف الرسالة في حالة الإجابة الخاطئة أيضًا
            message.reply("❌ | آسف، هذا غير صحيح\n 💱 |حظا موفقا في المرة القادمة 🙂.");
            api.setMessageReaction("❌", event.messageID, (err) => {}, true);
        }
    }
};