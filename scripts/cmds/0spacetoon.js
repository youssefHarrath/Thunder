const fs = require('fs');
const path = require('path');
const axios = require('axios');

const musicGame = {
  getMusicList: () => {
    const musicData = fs.readFileSync('spacetoon.json', 'utf8');
    return JSON.parse(musicData);
  },

  getRandomMusic: (musicList) => {
    const randomIndex = Math.floor(Math.random() * musicList.length);
    return musicList[randomIndex];
  },

  downloadMusic: async (musicUrl, localPath) => {
    const response = await axios.get(musicUrl, { responseType: 'arraybuffer' });
    fs.writeFileSync(localPath, Buffer.from(response.data, 'binary'));
  },

  run: async ({ api, event }) => {
    const musicList = musicGame.getMusicList();
    const randomMusic = musicGame.getRandomMusic(musicList);

    const musicName = randomMusic.music_name;
    const musicUrl = randomMusic.music_url;

    const musicPath = path.join(__dirname, 'cache', 'downloaded.mp3');

    await musicGame.downloadMusic(musicUrl, musicPath);

    const message = `●❯────────────────❮●\n 🎵   |إستمتع بالإستماع للشارة 🥰\n 🧿 | وإحزر إسم الشارة تعودة لأي مسلسل ؟\n●❯────────────────❮●`;
    const musicReadStream = fs.createReadStream(musicPath);
    api.sendMessage({ body: message, attachment: musicReadStream }, event.threadID, async (err, info) => {
      if (!err) {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: "شارات",
          messageID: info.messageID,
          author: event.senderID,
          answer: musicName,
          reward: Math.floor(Math.random() * (100 - 50 + 1) + 50)
        });
      }
    });
  },
};

module.exports = {
  config: {
    name: "شارات",
    aliases: [],
    author: "حسين يعقوبي",
    version: "1.0",
    cooldowns: 15,
    role: 0,
    shortDescription: {
      en: "لعبة أغاني سبيستون القديمة",
    },
    longDescription: {
      en: "يقوم بإقتراح عليك أغاني من شارات سبيستون القديمة وعليك الرد بإسم المسلسل من اجل الفوز",
    },
    category: "لعبة",
    guide: {
      en: "{p}{n}",
    },
  },
  onStart: musicGame.run,
  onReply: async ({ message, Reply, event, usersData, api, commandName }) => {
    const { author, messageID, answer, reward } = Reply;

    const userAnswer = event.body.trim();

    if (userAnswer === answer) {
      global.GoatBot.onReply.delete(messageID);
      message.unsend(event.messageReply.messageID);
      await usersData.addMoney(event.senderID, reward);
      const userName = await api.getUserInfo(event.senderID);
      message.reply(`تهانينا 🎉🎊 ${userName[event.senderID].name}، لقد حزرت إسم الشارة تعود لاي مسلسل وحصلت بذلك على مبلغ ${reward} دولار 💵 !`);
      api.setMessageReaction("✅", event.messageID, (err) => {}, true);
    } else {
      message.reply("❌ | آسف هذا لم يكن إسم الشارة\n 💱 |حظا موفقا في المرة القادمة 🙂.");
      api.setMessageReaction("❌", event.messageID, (err) => {}, true);
    }
  }
};
