const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const userDataFilePath = path.join(__dirname, 'users.json');

module.exports = {
  config: {
    name: "حزورة",
    aliases: [],
    version: "1.0",
    author: "Kshitiz",
    role: 0,
    shortDescription: "لعبة الإجابة بصحيح أو خطأ",
    longDescription: "لعبة الإجابة صحيح أو خطأ",
    category: "لعبة",
    guide: {
      en: "{p}حزورة"
    }
  },

  onStart: async function ({ event, message, usersData, api }) {
    const quizData = await fetchQuiz();
    if (!quizData) {
      return message.reply("فشل في جلب سؤال الاختبار. يرجى المحاولة مرة أخرى لاحقًا.");
    }

    const { question, correct_answer, incorrect_answers } = quizData;
    const correctAnswerLetter = correct_answer.split(',')[0].trim().toUpperCase();
    const incorrectAnswerLetter = incorrect_answers.split('[')[0].trim().toUpperCase();

    let optionsString = '';
    if (correctAnswerLetter === 'أ') {
      optionsString += `صحيح ✅ = A\nخطأ ❌ = B`;
    } else {
      optionsString += `خطأ ❌ = A\nصحيح ✅ = B`;
    }

    const sentQuestion = await message.reply(` ⚜️ | الأسئلة : ${question}\n 🌟 |الخيارات :\n${optionsString}\n 🎭 | قم بالرد على الرسالة ب A أو B`);

    global.GoatBot.onReply.set(sentQuestion.messageID, {
      commandName: this.config.name,
      messageID: sentQuestion.messageID,
      correctAnswerLetter: correctAnswerLetter
    });

    setTimeout(async () => {
      try {
        await message.unsend(sentQuestion.messageID);
      } catch (error) {
        console.error("خطأ أثناء حذف السؤال:", error);
      }
    }, 20000);
  },

  onReply: async function ({ message, event, Reply }) {
    const userAnswer = event.body.trim().toUpperCase();
    const correctAnswerLetter = Reply.correctAnswerLetter;

    if (userAnswer === correctAnswerLetter) {
      const userID = event.senderID;
      await addCoins(userID, 1000);
      await message.reply("🎉🎊 مبروك! إجابتك صحيحة. لقد حصلت على 1000 د.ولار");
    } else {
      await message.reply(`🥺 عذرًا! إجابتك خاطئة. الإجابة الصحيحة كانت: ${correctAnswerLetter}`);
    }

    try {
      await message.unsend(event.messageID);
    } catch (error) {
      console.error("خطأ أثناء حذف الرسالة:", error);
    }

    const { commandName, messageID } = Reply;
    if (commandName === this.config.name) {
      try {
        await message.unsend(messageID);
      } catch (error) {
        console.error("خطأ أثناء حذف السؤال:", error);
      }
    }
  }
};

async function fetchQuiz() {
  try {
    const response = await axios.get('https://trueorfalse.onrender.com/kshitiz');
    const quizData = response.data;

    // ترجمة السؤال إلى اللغة العربية
    const translatedQuestion = await translateToArabic(quizData.question);
    quizData.question = translatedQuestion;

    return quizData;
  } catch (error) {
    console.error("خطأ في جلب سؤال الاختبار:", error);
    return null;
  }
}

async function addCoins(userID, amount) {
  let userData = await getUserData(userID);
  if (!userData) {
    userData = { money: 0 };
  }
  userData.money += amount;
  await saveUserData(userID, userData);
}

async function getUserData(userID) {
  try {
    const data = await fs.readFile(userDataFilePath, 'utf8');
    const userData = JSON.parse(data);
    return userData[userID];
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(userDataFilePath, '{}');
      return null;
    } else {
      console.error("خطأ في قراءة بيانات المستخدم:", error);
      return null;
    }
  }
}

async function saveUserData(userID, data) {
  try {
    const userData = await getUserData(userID) || {};
    const newData = { ...userData, ...data };
    const allUserData = await getAllUserData();
    allUserData[userID] = newData;
    await fs.writeFile(userDataFilePath, JSON.stringify(allUserData, null, 2), 'utf8');
  } catch (error) {
    console.error("خطأ في حفظ بيانات المستخدم:", error);
  }
}

async function getAllUserData() {
  try {
    const data = await fs.readFile(userDataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error("خطأ في قراءة بيانات المستخدم:", error);
    return {};
  }
}

async function translateToArabic(query) {
  try {
    const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(query)}`);
    const translatedQuery = translationResponse?.data?.[0]?.[0]?.[0];
    return translatedQuery;
  } catch (error) {
    console.error("خطأ في الترجمة:", error);
    return query; // في حالة حدوث خطأ، قم بإعادة السؤال باللغة الأصلية
  }
}
