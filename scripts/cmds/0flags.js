const fs = require('fs');

module.exports = {
    config: {
        name: "أعلام",
        version: "1.0",
        author: "حسين يعقوبي",
        role: 0,
        countdown: 10,
        reward: Math.floor(Math.random() * (100 - 50 + 1) + 50),
        category: "لعبة",
        shortDescription: {
            en: "حزمة العلم"
        },
        longDescription: {
            en: "تعرف على العلم"
        },
        guide: {
            en: "{prefix}علم - ابدأ لعبة معرفة العلم"
        }
    },

    onStart: async function ({ message, event, commandName }) {
        const flags = JSON.parse(fs.readFileSync('flags.json'));
        const randomFlag = flags[Math.floor(Math.random() * flags.length)];

        // Attach the flag image
        const imageStream = await global.utils.getStreamFromURL(randomFlag.image);

        // Send the message with the attached image
        message.reply({
            body: `✿━━━━━━━━━━━━━━━━━✿\n ⚜️ | ما هو اسم العلم في الصورة ؟\n✿━━━━━━━━━━━━━━━━━✿`,
            attachment: imageStream
        }, async (err, info) => {
            global.GoatBot.onReply.set(info.messageID, {
                commandName,
                messageID: info.messageID,
                author: event.senderID,
                answer: randomFlag.name
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
