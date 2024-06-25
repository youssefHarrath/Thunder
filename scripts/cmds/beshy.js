module.exports = {
  config: {
    name: "شقلبات",
    aliases: ["beshify"],
    version: 1.0,
    author: "LiANE",
    shortDescription: { en: "شقلب النص الخاص بك" },
    longDescription: { en: "قن بإستبدال الفواصل بالشقابات" },
    category: "خدمات",
    guide: { en: "{prefix}إستبدل نص - يتم إستبدالها ب 🤸" }
  },
  onStart: async function({ api, event, args, message }) {
    const text = args.join(" ").replace(/ /g, "🤸");
    const reply = `🤸 شقلبات:

${text}`;
    message.reply(reply);
  }
};