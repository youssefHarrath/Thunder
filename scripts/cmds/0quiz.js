let axios = require('axios');

module.exports = {
  config: {
    name: "فزورة",
    aliases: ['mcq', 'mcqs'],
    version: "1.0",
    author: "JARiF",
    countDown: 5,
    role: 0,
    category: "لعبة"
  },

  onReply: async function ({ args, event, api, Reply, commandName, usersData }) {
    let { dataGame, answer, nameUser } = Reply;
    if (event.senderID !== Reply.author) return;

    switch (Reply.type) {
      case "reply": {
        let userReply = event.body.toLowerCase();

        if (userReply === answer.toLowerCase()) {
          api.unsendMessage(Reply.messageID).catch(console.error);
          let rewardCoins = 860;
          let rewardExp = 50;
          let senderID = event.senderID;
          let userData = await usersData.get(senderID);
          await usersData.set(senderID, {
            money: userData.money + rewardCoins,
            exp: userData.exp + rewardExp,
            data: userData.data
          });
          let msg = {
            body: `✅ | ${nameUser}, إجابتك صحيحة وتم منحك ${rewardCoins} دولار.`
          };
          return api.sendMessage(msg, event.threadID, event.messageID);
        } else {
          api.unsendMessage(Reply.messageID);
          let msg = `❌ | لقد قمت بإختيار يا ${nameUser} الإجابة الخاطئة ، الإجابة الصحيحة هو الإختيار : ${answer}`;
          return api.sendMessage(msg, event.threadID);
        }
      }
    }
  },

  onStart: async function ({ api, event, usersData, commandName }) {
    let { threadID, messageID } = event;
    let timeout = 60;

    try {
      let response = await axios.get('https://jarif99.ameliagadha.repl.co/quiz?apikey=jarif99');
      let quizData = response.data;
      let { question, answer } = quizData;
      let translatedQuestion = await translateToArabic(question);
      let A = await translateToArabic(quizData.A);
      let B = await translateToArabic(quizData.B);
      let C = await translateToArabic(quizData.C);
      let D = await translateToArabic(quizData.D);
      let namePlayerReact = await usersData.getName(event.senderID);

      let msg = {
        body: `${translatedQuestion} 

 [ A ]  ${A}
 [ B ]  ${B}
 [ C ]  ${C}
 [ D ]  ${D}

الرجاء الرد بالإجابة الصحيحة بإستخدام الحروف 🙂 `,
      };

      api.sendMessage(msg, threadID, async (error, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          type: "reply",
          commandName,
          author: event.senderID,
          messageID: info.messageID,
          dataGame: quizData,
          answer,
          nameUser: namePlayerReact
        });

        setTimeout(function () {
          api.unsendMessage(info.messageID);
        }, timeout * 1000);
      });
    } catch (error) {
      console.error("حدث خطأ:", error);
    }
  }
};

async function translateToArabic(query) {
  const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(query)}`);
  return translationResponse.data[0][0][0];
}
