const fs = require('fs');

module.exports = {
  config: {
    name: "عكس",
    version: "1.0",
    author: "حسين يعقوبي",
    role: 0,
    countdown: 10,
    reward: Math.floor(Math.random() * (100 - 50 + 1) + 50),
    category: "لعبة",
    shortDescription: {
      en: "خمن الكلمة ضد الكلمة المعطاة"
    },
    longDescription: {
      en: "يقوم بإعطائك هذا الكود كلمة ويجب أن تعرف عكسها لتفةز"
    },
    guide: {
      en: "{prefix}عمس - ابدأ لعبة عكس الكلمات"
    }
  },

  onStart: async function ({ message, event, commandName }) {
    const questions = JSON.parse(fs.readFileSync('revers.json'));
    const randomQuestionObj = questions[Math.floor(Math.random() * questions.length)];

    message.reply(` ⚜️ |ما هو الجواب على السؤال التالي: "${randomQuestionObj.question}" ؟`, (err, info) => {
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
      message.reply(`تهانينا 🎉🎊 يا ، ${userName[event.senderID].name}، لقد فزت بمبلغ ${reward} دولار 💵 !`);
      api.setMessageReaction("✅", event.messageID, (err) => {}, true);
    } else {
      message.reply("❌ | آسف، هذا غير صحيح.");
      api.setMessageReaction("❌", event.messageID, (err) => {}, true);
    }
  }
};
