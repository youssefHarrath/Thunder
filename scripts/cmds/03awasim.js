const fs = require('fs');

module.exports = {
  config: {
    name: "عواصم",
    version: "1.0",
    author: "Mahim",
    role: 0,
    countdown: 10,
    reward: Math.floor(Math.random() * (100 - 50 + 1) + 50),
    category: "لعبة",
    shortDescription: {
      en: "خمن عاصمة الدولة إنطلاقا من إسمها"
    },
    longDescription: {
      en: "يقوم هذا الكود بإعطائك إشم الدولة ويجب عليك معرفة عاصمتها"
    },
    guide: {
      en: "{prefix}عواصم - ابدأ لعبة  عواصم الدول"
    }
  },

  onStart: async function ({ message, event, commandName }) {
    const questions = JSON.parse(fs.readFileSync('capitals.json'));
    const randomQuestionObj = questions[Math.floor(Math.random() * questions.length)];

    message.reply(` ⚜️ | ${randomQuestionObj.question} 
    `, (err, info) => {
      global.GoatBot.onReply.set(info.messageID, {
        commandName,
        messageID: info.messageID,
        author: event.senderID,
        answer: randomQuestionObj.answer
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
      message.reply(`تهانينا 🎉🎊 يا ، ${userName[event.senderID].name}، لقد حزرت إسم العاصمة و فزت ب مبلغ يقدر ب ${reward} دولار 💵 !`);
      api.setMessageReaction("✅", event.messageID, (err) => {}, true);
    } else {
      message.reply("❌ | آسف، هذا غير صحيح.");
      api.setMessageReaction("❌", event.messageID, (err) => {}, true);
    }
  }
};
