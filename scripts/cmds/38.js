module.exports = {
  config: {
    name: "رياضيات",
    version: "1.0",
    author: "mahim",
    role: 0,
    colldown: 5,
    shortDescription: "إجراء العمليات الحسابية الأساسية;.",
    category: "خدمات",
    guide: "{prefix}calculate <expression>"
  },
  onStart: async function ({ message, args }) {
    const expression = args.join(" ");

    if (!expression) {
      return message.reply("المرجو إضافة تعبير!");
    }

    let result;
    try {
      result = eval(expression);
    } catch (error) {
      console.error(error);
      return message.reply("أُووبس! حدث خطأ ما أثناء محاولة حساب تعبيرك.");
    }

    message.reply(`نتائج ال ${expression} هو ${result}.`);
  },
};