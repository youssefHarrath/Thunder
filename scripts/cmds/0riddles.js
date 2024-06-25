const axios = require('axios');

module.exports = {
  config: {
    name: "لغز",
    version: "1.1",
    author: "Shikaki",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "قم بالحصول على لغز"
    },
    longDescription: {
      en: "احصل على لغز عشوائي وحاول حله!"
    },
    category: "لعبة",
    guide: {
      en: "{prefix}لغز"
    }
  },

  onReply: async function ({ event, api, Reply }) {
    if (event.senderID !== Reply.author || Reply.type !== "reply") return;

    const userReply = event.body.toLowerCase();
    const msg = `Answer: ${Reply.answer}`;
    return api.sendMessage(msg, event.threadID);
  },

  onStart: async function ({ api, event }) {
    const { threadID, messageID } = event;
    const timeout = 60;

    try {
      const response = await axios.get('https://riddles-api.vercel.app/random');
      const riddleData = response.data;
      const { riddle, answer } = riddleData;

      // ترجمة اللغز إلى العربية
      const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(riddle)}`);
      const translatedRiddle = translationResponse.data[0][0][0];

      const msg = {
        body: `🤔 تفضل إليك اللغز \n\n${translatedRiddle}\n\nحظا موفقا في حل اللغز !\n\nإذا لم تعرف قم بالرد على هذه الرسالة من أجل رؤية الحل لهذا اللغز 🙂.`
      };

      api.sendMessage(msg, threadID, async (error, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          type: "reply",
          commandName: "riddle",
          author: event.senderID,
          messageID: info.messageID,
          answer,
        });
      });
    } catch (error) {
      console.error("حدث خطأ:", error);
    }
  }
};
