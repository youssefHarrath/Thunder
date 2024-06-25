const fs = require('fs');

module.exports = {
  config: {
    name: "لعبة_كلمات",
    version: "1.0",
    author: "Mahim",
     role: 0,
    countdown: 10,
    reward: Math.floor(Math.random() * (100 - 50 + 1) + 50),
    category: "لعبة",
    shortDescription: {
      en: "حل رموز الكلمة المعطاة خلال فترة زمنية محددة"
    },
    longDescription: {
      en: "لعبة حيث عليك حل رموز كلمة معينة خلال فترة زمنية محددة للفوز بالجائزة"
    },
    guide: {
      en: "{prefix}لعبة_الكلمات - ابدأ لعبة إعادة ترتيب الكلمات"
    }
  },

  onStart: async function ({ message, event, commandName }) {
    const words = JSON.parse(fs.readFileSync('words.json'));
    const randomWord = words[Math.floor(Math.random() * words.length)];

    const shuffledWord = shuffleWord(randomWord);

    message.reply(`ما هي هذه الكلمة: "${shuffledWord}" ؟`, (err, info) => {
      global.GoatBot.onReply.set(info.messageID, {
        commandName,
        messageID: info.messageID,
        author: event.senderID,
        answer: randomWord
      });
    });
  },

  onReply: async ({ message, Reply, event, usersData, envCommands, commandName }) => {
    const { author, messageID, answer } = Reply;

    if (formatText(event.body) === formatText(answer)) {
      global.GoatBot.onReply.delete(messageID);
      message.unsend(event.messageReply.messageID);
      const reward = Math.floor(Math.random() * (100 - 50 + 1) + 50);
      await usersData.addMoney(event.senderID, reward);
      message.reply(` لقد فزت ب ${reward} عملة!` );
    }
    else {
      message.reply("آسف، هذا غير صحيح.");
    }
  }
};

function shuffleWord(word) {
  const shuffled = word.split('').sort(() => 0.5 - Math.random()).join('');
  if (shuffled === word) {
    return shuffleWord(word);
  }
  return shuffled;
}

function formatText(text) {
  return text.normalize("NFD").toLowerCase( );                                       }