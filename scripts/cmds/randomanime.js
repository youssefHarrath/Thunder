const allou_server = "https://games.proarcoder.repl.co/QSR";
const axios = require('axios');
module.exports = {
  config: {
    name: "آدمز",
    version: "1.0",
    author: "حسين يعقوبي",
    role: 0,
    countdown: 10,
    category: "لعبة",
    shortDescription: {
      en: "مغامرات مع عائلة آدمز"
    },
    longDescription: {
      en: "لعبة مغامرات مع عائلة آدمز"
    },
    guide: {
      en: "{prefix}آدمز - ابدأ لعبة آدمز"
    }
  },
  onStart: async function({ api, event, onReply }) {
    // تحقق من وجود البيانات قبل الاستمرار
    if (!onReply || !onReply.messageID || !onReply.author) {
      return api.sendMessage('حدث خطأ في جلب البيانات اللازمة لبدء اللعبة.', event.threadID);
    }
    
    const { messageID, author } = onReply;
    const uid = event.senderID;
    if (uid != author) return api.sendMessage(' ⚠️ |أنت لست لاعب القصة', event.threadID);
    const ans = { "1": "A", "2": "B", "3": "C" };
    const answer = ans[event.body];
    const res = await axios.get(allou_server, {
      params: {
        playerID: uid,
        playerAnswer: answer
      }
    });
    api.unsendMessage(messageID);
    return api.sendMessage({ body: res.data.message }, event.threadID, (error, info) => {
      if (!error) {
        global.client.onReply.push({
          name: "آدمز", // قم باستخدام اسم مختلف هنا
          author: event.senderID,
          messageID: info.messageID
        });
      }
    });
  }
};
