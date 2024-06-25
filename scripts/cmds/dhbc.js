const axios = require("axios");
const { getStreamFromURL } = global.utils;

module.exports = {
  config: {
    name: "إمساك_كلمة",
    version: "1.2",
    author: "NTKhang",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "game đuổi hình bắt chữ",
      en: "لعبة إمساك الكلمات"
    },
    longDescription: {
      vi: "chơi game đuổi hình bắt chữ",
      en: "قم بلعب لعبة التقاط الكلمات"
    },
    category: "لعبة",
    guide: {
      en: "{pn}إمساك_كلمة"
    },
    envConfig: {
      reward: 1000
    }
  },

  langs: {
    vi: {
      reply: "Hãy reply tin nhắn này với câu trả lời\n%1",
      isSong: "Đây là tên bài hát của ca sĩ %1",
      notPlayer: "⚠️ Bạn không phải là người chơi của câu hỏi này",
      correct: "🎉 Chúc mừng bạn đã trả lời đúng وحصلت على %1$",
      wrong: "⚠️ Bạn đã trả lời sai"
    },
    en: {
      reply: "الرجاء الرد على هذه الرسالة مع الجواب\n%1",
      isSong: "وهذا اسم الاغنية للمغنية %1",
      notPlayer: "⚠️ أنت لست لاعب هذا السؤال",
      correct: "🎉 تهانينا لقد أجبت بشكل صحيح وحصلت على %1$",
      wrong: "⚠️ لقد أجبت بشكل غير صحيح"
    }
  },

  onStart: async function ({ message, event, commandName, getLang }) {
    const datagame = (await axios.get("https://goatbotserver.onrender.com/api/duoihinhbatchu")).data;
    const { wordcomplete, casi, image1, image2 } = datagame.data;

    const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(wordcomplete)}`);
    const translatedWord = translationResponse.data[0][0][0];

    message.reply({
      body: getLang("reply", translatedWord.replace(/\S/g, "█ ")) + (casi ? getLang("isSong", casi) : ''),
      attachment: [
        await getStreamFromURL(image1),
        await getStreamFromURL(image2)
      ]
    }, (err, info) => {
      global.GoatBot.onReply.set(info.messageID, {
        commandName,
        messageID: info.messageID,
        author: event.senderID,
        wordcomplete: translatedWord
      });
    });
  },

  onReply: async ({ message, Reply, event, getLang, usersData, envCommands, commandName }) => {
    const { author, wordcomplete, messageID } = Reply;

    if (event.senderID != author) {
      message.reply(getLang("notPlayer"));
      return;
    }

    const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(event.body)}`);
    const translatedAnswer = translationResponse.data[0][0][0];

    if (formatText(translatedAnswer) == formatText(wordcomplete)) {
      global.GoatBot.onReply.delete(messageID);
      await usersData.addMoney(event.senderID, envCommands[commandName].reward);
      message.reply(getLang("correct", envCommands[commandName].reward));
    } else {
      message.reply(getLang("wrong"));
    }
  }
};

function formatText(text) {
  return text.normalize("NFD")
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đ|Đ]/g, (x) => x == "đ" ? "d" : "D");
}
