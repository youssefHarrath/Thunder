module.exports = {
  config: {
    name: "حساب_الكلمات",
    aliases: ["wcount"],
    version: 1.0,
    author: "LiANE",
    countDown: 5,
    role: 0,
    shortDescription: { en: "عد الكلمات والأحرف في الدردشة" },
    longDescription: { en: "عد الكلمات والأحرف في الدردشة" },
    category: "خدمات",
    guide: { en: "{pn} حاسب_الكلملات [نص] -  سيقوم بحسابها أواتوملتياي" }
  },
  onStart: async function ({ api, event, message, args }) {
    const chat = args.join(" ");
    const wordCount = chat.trim().split(" ").length;
    const charCount = chat.length;

    message.reply(` 🧿 |عدد الكلمات في والحروف في المجموعة هو كالتالي :

${wordCount} الكلمات🔖.
${charCount} الحروف💭`);
  }
};