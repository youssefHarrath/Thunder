module.exports = {
 config: {
 name: "حجر_ورقة_مقص",
 version: "1.0",
 author: "kiminonawa",
 shortDescription: "العب لعبة حجر ورقة مقص مع البوت.",
 category: "لعبة",
 guide: "{prefix}حجر_ورقة_مقص  <حجر|ورقة|مقص>"
 },
 onStart: async function ({ message, args }) {
 const choices = ["حجر", "ورقة", "مقص"];
 const userChoice = args[0];
 if (!userChoice || !choices.includes(userChoice.toLowerCase())) {
 return message.reply("يرجى اختيار الحجر أو الورق أو المقص!");
 }

 const botChoice = choices[Math.floor(Math.random() * choices.length)];

 message.reply(`أنت إخترت ${userChoice}. أنا إخترت ${botChoice}.`);

 if (userChoice.toLowerCase() === botChoice) {
 message.reply("إنها ربطة عنق!");
 } else if (
 (userChoice.toLowerCase() === "حجر" && botChoice === "مقص") ||
 (userChoice.toLowerCase() === "ورقة" && botChoice === "حجر") ||
 (userChoice.toLowerCase() === "مقص" && botChoice === "ورقة")
 ) {
 message.reply("تهانينا! لقد فزت!");
 } else {
 message.reply("انا فزت! حظ أوفر في المرة القادمة!");
 }
 },
};module.exports = {
 config: {
 name: "حجر_ورقة_مقص",
 version: "1.0",
 author: "Your name",
 shortDescription: "العب لعبة حجر ورقة مقص مع الروبوت باستخدام الرموز التعبيرية.",
 category: "لعبة",
 guide: "{prefix}حجر_ورقة_مقص <✊|✋|✌️>"
 },
 onStart: async function ({ message, args }) {
 const choices = ["✊", "✋", "✌️"];
 const userChoice = args[0];
 if (!userChoice || !choices.includes(userChoice)) {
 return message.reply("يرجى اختيار أي منهما ✊, ✋, أو ✌️!");
 }

 const botChoice = choices[Math.floor(Math.random() * choices.length)];

 message.reply(`أنت إخترت ${userChoice}. أنا إخترت ${botChoice}.`);

 if (userChoice === botChoice) {
 message.reply("إنها ربطة عنق! ⚖️");
 } else if (
 (userChoice === "✊" && botChoice === "✌️") ||
 (userChoice === "✋" && botChoice === "✊") ||
 (userChoice === "✌️" && botChoice === "✋")
 ) {
 message.reply("تهانينا! لقد فزت! 🎉");
 } else {
 message.reply("انا فزت! حظ أوفر في المرة القادمة! 😎");
 }
 },
};