module.exports = {
  config: {
    name: "التفاعل_التلقائي",
    version: "1.0",
    author: "jvb",
    countDown: 5,
    role: 0,
    shortDescription: "تفاعل مع رسائل",
    longDescription: "تفاعل مع رسائل",
    category: "النظام",
  },
  onStart: async function () {},
  onChat: async function ({ api, event, client, __GLOBAL }) {
    var { threadID, messageID } = event;
    let react = event.body.toLowerCase();
    if (
      event.body.indexOf("حب") == 0 ||
      event.body.indexOf("من") == 0 ||
      event.body.indexOf("كيف الحال") == 0 ||
      event.body.indexOf("أهلا") == 0 ||
      event.body.indexOf("السلام عليكم") == 0 ||
      event.body.indexOf("بخير") == 0 ||
      event.body.indexOf("أنا") == 0 ||
      event.body.indexOf("إجيت") == 0 ||
      event.body.indexOf("كيفكم") == 0 ||
      event.body.indexOf("صباح الخير") == 0 ||
      event.body.indexOf("مساء الخير") == 0 ||
      event.body.indexOf("تصبحون على خير") == 0 ||
      event.body.indexOf("وأنت من أهله") == 0 ||
      event.body.indexOf("وأنتي من أهله") == 0 ||
      event.body.indexOf("وأنتم من أهله") == 0 ||
      event.body.indexOf("بوت") == 0 ||
      event.body.indexOf("ميدوريا") == 0 ||
      event.body.indexOf("حسين") == 0 ||
      event.body.indexOf("جيد") == 0 ||
      event.body.indexOf("رائع") == 0 ||
      event.body.indexOf("مدهش") == 0 ||
      event.body.indexOf("أحسنت") == 0 ||
      event.body.indexOf("المدرسة") == 0 ||
      event.body.indexOf("المسجد") == 0 ||
      event.body.indexOf("أحبك") == 0 ||
      event.body.indexOf("دوم") == 0 ||
      event.body.indexOf("دومك") == 0 ||
      event.body.indexOf("أخي") == 0 ||
      event.body.indexOf("يدوم عزك") == 0 ||
      event.body.indexOf("يدوم نبضك") == 0 ||
      event.body.indexOf("سأذهب لأنام") == 0 ||
      event.body.indexOf("وداعا") == 0 ||
      event.body.indexOf("أهلا يا جماعة") == 0 ||
      event.body.indexOf("مرحبا") == 0 ||
      event.body.indexOf("أهلا") == 0 ||
      event.body.indexOf("مجموعة") == 0 ||
      event.body.indexOf("حيوانات") == 0 ||
      event.body.indexOf("طعام") == 0 ||
      event.body.indexOf("أنا جائع") == 0 ||
      event.body.indexOf("أنا رائع") == 0 ||
      event.body.indexOf("هو") == 0 ||
      event.body.indexOf("يا") == 0 ||
      event.body.indexOf("ماذا") == 0 ||
      event.body.indexOf("مهلا") == 0 ||
      event.body.indexOf("مممممم") == 0 ||
      event.body.indexOf("هههههههه") == 0 && !bot.includes(event.senderID)
    ) {
      var msg = {
        body: "",
      };
      api.sendMessage(msg, threadID, messageID);
      api.setMessageReaction("❤️", event.messageID, (err) => {}, true);
    }
  },
};
      