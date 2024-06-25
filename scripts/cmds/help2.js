const fs = require('fs');
 
module.exports = {
  config: {
    name: "حقيقة_أم_جرأة",
    version: "1.0",
    author: "Loid Butter",
    countDown: 5,
    role: 0,
    shortDescription: "هذا الأمر يسمح للمستخدمين بلعب لعبة حقيقة أم جرأة.",
    longDescription: "يمكّن هذا الأمر المستخدمين من لعب لعبة حقيقة أم جرأة الكلاسيكية;. يمكنهم أن يختارو 'جرأة' أو 'حقيقة' واحصل على سؤال أو تحدي تم اختياره عشوائيًا.",
    category: "لعبة",
    guide: {
      en: "للعب لعبة الحقيقة أو الجرأة، استخدم الأمر '{pn} حقيقة' من أجل أسئلة الحقيقة أو '{pn} جرأة' من أجل أسئلة التحدي."
    }
  },
 
  onStart: async function ({ api, args, message }) {
 
    const [arg1] = args;
 
    if (!arg1) {
      message.reply("إذا كنت تريد لعب حقيقة أم جرأة أرجوك إستخدم  'حقيقة' أو 'جرأة'.");
      return;
    }
 
    if (arg1.toLowerCase() === 'حقيقة') {
      const truthQuestions = JSON.parse(fs.readFileSync(`TRUTHQN.json`));
      const randomIndex = Math.floor(Math.random() * truthQuestions.length);
      const randomQuestion = truthQuestions[randomIndex];
 
      message.reply(`هاهو ذا سؤال الحقيقة قم بالإجابة بصراحة: ${randomQuestion}`);
    } else if (arg1.toLowerCase() === 'جرأة') {
      const dareChallenges = JSON.parse(fs.readFileSync(`DAREQN.json`));
      const randomIndex = Math.floor(Math.random() * dareChallenges.length);
      const randomChallenge = dareChallenges[randomIndex];
 
      message.reply(`هاهو ذا التحدي الذي يجب أن تقوم به: ${randomChallenge}`);
    } else {
      message.reply("إستخدام غير صالح ، أرجوك إستخدم '©حقيقة_أم_جرأة حقيقة' من أجل أسئلة الحقيقة أو '©حقيقة_أم_جرأة جرأة' من أجل سؤال تحدي.");
    }
  }
    }