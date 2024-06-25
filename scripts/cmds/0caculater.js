module.exports = {
config: {
  name: "حاسبة",
  aliases: ["calculator"],
  author: "Kshitiz",
  version: "1.0",
  cooldowns: 5,
  role: 0,
  shortDescription: "العنليات الحسابية الأساسية ",
  longDescription: "قم بحل العمليات الحسابية الأساسية",
  category: "خدمات",
  guide: "{p}حاسبة 68+1",
},


  onStart: async function ({ event, message }) {
    try {
      const input = event.body;
      const data = input.split(" ");

      if (data.length < 2) {
        return message.reply(" ⚠️ | المرجو تقديم عدد من أجل الحساب.");
      }

      data.shift();
      const expression = data.join(" ");

      const result = evaluateExpression(expression);

      const replyMessage = {
        body: ` 🌟 | نتيجة التعبير  ${expression} هو : ${result}`,
      };

      await message.reply(replyMessage);
    } catch (error) {
      console.error('ERROR', error);
      message.reply(" ❌ |حدث خطأ أثناء معالجة الطلب.");
    }
  },
};

function evaluateExpression(expression) {
  try {
    const result = eval(expression);
    return result;
  } catch (error) {
    console.error('ERROR', error);
    return "Error: Invalid expression.";
  }
}