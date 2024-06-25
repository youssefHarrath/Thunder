const fs = require('fs');
 
module.exports = {
  config: {
    name: "تحفيز",
    version: "1.0",
    author: "حسين يعقوبي",
    countDown: 5,
    role: 0,
    shortDescription: "هذا الأمر يسمح للمستخدمين بالحصول على رسائل تحفيزية حول الحياة أو النفس.",
    longDescription: "يمكّن هذا الأمر المستخدمين من الحصول على رسائل تحفيزية حول الحياة و النفس;. يمكنهم أن يختارو بين 'الحياة' أو 'النفس' واحصل على رسالة تحفيزية عن الحياة أو النفس يتم اختياره عشوائيًا.",
    category: "خدمات",
    guide: {
      en: "من أجل الحصول على رسائل، تحفيزية استخدم الأمر '{pn} الحساة' من أجل رسائل تحفيزية عن الحياة أو '{pn} النفس' من أجل رسائل تحفيزية عن النفس ."
    }
  },
 
  onStart: async function ({ api, args, message }) {
 
    const [arg1] = args;
 
    if (!arg1) {
      message.reply("⚠️ |إستخدام غير صالح  إستخدم ©تحفيز 'الحياة' أو 'النفس'.");
      return;
    }
 
    if (arg1.toLowerCase() === 'الحياة') {
      const truthQuestions = JSON.parse(fs.readFileSync(`life.json`));
      const randomIndex = Math.floor(Math.random() * truthQuestions.length);
      const randomQuestion = truthQuestions[randomIndex];
 
      message.reply(`✨إليك الرسالة التحفيزية حول الحياة : ${randomQuestion}`);
    } else if (arg1.toLowerCase() === 'النفس') {
      const dareChallenges = JSON.parse(fs.readFileSync(`self.json`));
      const randomIndex = Math.floor(Math.random() * dareChallenges.length);
      const randomChallenge = dareChallenges[randomIndex];
 
      message.reply(`✨ إليك الرسالة التحفيزية عن النفس : ${randomChallenge}`);
    } else {
      message.reply("⚠️ |إستخدام غير صالح، أرجوك إستخدم '©تحفيز الحياة' من أجل رسائل تحفيزية عن الحياة\n أو '©تحفيز النفس' من أجل رسائل تحفيزية عن النفس.");
    }
  }
    }