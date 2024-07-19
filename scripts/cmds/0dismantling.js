const fs = require('fs');

module.exports = {
  config: {
    name: "تفكيك",
    version: "1.0",
    author: " و يوسف حسين",
    role: 0,
    countdown: 10,
    reward: Math.floor(Math.random() * (100 - 50 + 1) + 50),
    category: "لعبة",
    shortDescription: {
      en: "لعبة تفكيك الكلمات"
    },
    longDescription: {
      en: "يقوم هذا الكود بإعطائك كلمة من أجل ان تقوم بتفكيكها"
    },
    guide: {
      en: "{prefix}تفكيك - ابدأ لعبة تفكيك الكلمات"
    }
  },

  onStart: async function ({ message, event, commandName }) {
    const questions = [
      { question: "مكتبة", answer: "م ك ت ب ة" },
      { question: "مدرسة", answer: "م د ر س ة" },
      { question: "جامعة", answer: "ج ا م ع ة" },
      { question: "كمبيوتر", answer: "ك م ب ي و ت ر" },
      { question: "برمجة", answer: "ب ر م ج ة" },
      { question: "تكنولوجيا", answer: "ت ك ن و ل و ج ي ا" },
      { question: "هاتف", answer: "ه ا ت ف" },
      { question: "كتاب", answer: "ك ت ا ب" },
      { question: "مكتب", answer: "م ك ت ب" },
      { question: "قلم", answer: "ق ل م" },
      { question: "ورقة", answer: "و ر ق ة" },
      { question: "سبورة", answer: "س ب و ر ة" },
      { question: "شاشة", answer: "ش ا ش ة" },
      { question: "طاولة", answer: "ط ا و ل ة" },
      { question: "كرسي", answer: "ك ر س ي" },
      { question: "باب", answer: "ب ا ب" },
      { question: "نافذة", answer: "ن ا ف ذ ة" },
      { question: "غرفة", answer: "غ ر ف ة" },
      { question: "منزل", answer: "م ن ز ل" },
      { question: "شقة", answer: "ش ق ة" },
      { question: "بناية", answer: "ب ن ا ي ة" },
      { question: "مدينة", answer: "م د ي ن ة" },
      { question: "قرية", answer: "ق ر ي ة" },
      { question: "شارع", answer: "ش ا ر ع" },
      { question: "سيارة", answer: "س ي ا ر ة" },
      { question: "قطار", answer: "ق ط ا ر" },
      { question: "طائرة", answer: "ط ا ئ ر ة" },
      { question: "مطار", answer: "م ط ا ر" },
      { question: "سفينة", answer: "س ف ي ن ة" },
      { question: "ميناء", answer: "م ي ن ا ء" },
      { question: "جسر", answer: "ج س ر" },
      { question: "حديقة", answer: "ح د ي ق ة" },
      { question: "زهرة", answer: "ز ه ر ة" },
      { question: "شجرة", answer: "ش ج ر ة" },
      { question: "نهر", answer: "ن ه ر" },
      { question: "بحر", answer: "ب ح ر" },
      { question: "محيط", answer: "م ح ي ط" },
      { question: "جبال", answer: "ج ب ا ل" },
      { question: "صحراء", answer: "ص ح ر ا ء" },
      { question: "غابة", answer: "غ ا ب ة" },
      { question: "كوكب", answer: "ك و ك ب" },
      { question: "نجمة", answer: "ن ج م ة" },
      { question: "قمر", answer: "ق م ر" },
      { question: "شمس", answer: "ش م س" },
      { question: "سماء", answer: "س م ا ء" },
      { question: "هواء", answer: "ه و ا ء" },
      { question: "مطر", answer: "م ط ر" },
      { question: "ثلج", answer: "ث ل ج" },
      { question: "رياح", answer: "ر ي ا ح" },
      { question: "عاصفة", answer: "ع ا ص ف ة" },
      { question: "زلزال", answer: "ز ل ز ا ل" },
      { question: "بركان", answer: "ب ر ك ا ن" },
      { question: "فيض", answer: "ف ي ض" },
      { question: "حرارة", answer: "ح ر ا ر ة" },
      { question: "رطوبة", answer: "ر ط و ب ة" },
      { question: "برودة", answer: "ب ر و د ة" },
      { question: "إلكترون", answer: "إ ل ك ت ر و ن" },
      { question: "ذرة", answer: "ذ ر ة" },
      { question: "مادة", answer: "م ا د ة" },
      { question: "طاقة", answer: "ط ا ق ة" },
      { question: "قوة", answer: "ق و ة" },
      { question: "ضغط", answer: "ض غ ط" },
      { question: "حركة", answer: "ح ر ك ة" },
      { question: "سرعة", answer: "س ر ع ة" },
      { question: "زمن", answer: "ز م ن" },
      { question: "ضوء", answer: "ض و ء" },
      { question: "موجة", answer: "م و ج ة" },
      { question: "كهرباء", answer: "ك ه ر ب ا ء" },
      { question: "مغناطيس", answer: "م غ ن ا ط ي س" },
      { question: "جاذبية", answer: "ج ا ذ ب ي ة" },
      { question: "مادة", answer: "م ا د ة" },
      { question: "صلب", answer: "ص ل ب" },
      { question: "سائل", answer: "س ا ئ ل" },
      { question: "غاز", answer: "غ ا ز" },
      { question: "بلازما", answer: "ب ل ا ز م ا" },
      { question: "مخلوط", answer: "م خ ل و ط" },
      { question: "محلول", answer: "م ح ل و ل" },
      { question: "ذائب", answer: "ذ ا ئ ب" },
      { question: "مترسب", answer: "م ت ر س ب" },
      { question: "ضغط", answer: "ض غ ط" },
      { question: "طول", answer: "ط و ل" },
      { question: "عرض", answer: "ع ر ض" },
      { question: "ارتفاع", answer: "ا ر ت ف ا ع" },
      { question: "حجم", answer: "ح ج م" },
      { question: "كتلة", answer: "ك ت ل ة" },
      { question: "كثافة", answer: "ك ث ا ف ة" },
      { question: "سرعة", answer: "س ر ع ة" },
      { question: "عجلة", answer: "ع ج ل ة" },
      { question: "شغل", answer: "ش غ ل" },
      { question: "طاقة", answer: "ط ا ق ة" },
      { question: "كيمياء", answer: "ك ي م ي ا ء" },
      { question: "فيزياء", answer: "ف ي ز ي ا ء" },
      { question: "أحياء", answer: "أ ح ي ا ء" },
      { question: "رياضيات", answer: "ر ي ا ض ي ا ت" },
      { question: "جيولوجيا", answer: "ج ي و ل و ج ي ا" },
      { question: "فلك", answer: "ف ل ك" }
    ];
    const randomQuestionObj = questions[Math.floor(Math.random() * questions.length)];

    message.reply(`❛ ━━━━━･❪ 🌠 ❫ ･━━━━━ ❜\n ⚜️ | قم بتفكيك هذه الكلمة: \n${randomQuestionObj.question}\n❛ ━━━━━･❪ 🌠 ❫ ･━━━━━ ❜`, (err, info) => {
      global.GoatBot.onReply.set(info.messageID, {
        commandName,
        messageID: info.messageID
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
