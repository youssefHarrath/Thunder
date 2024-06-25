module.exports = {
  config: {
    name: "المطور",
    version: "1.0",
    author: "Jaychris Garcia",
    countDown: 5,
    role: 0,
    shortDescription: "بدون بادئة",
    longDescription: "بدون بادئة",
    category: "معلومات",
  },
  onStart: async function(){},
  onChat: async function({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "مطور") {
      return message.reply({
        body: "   أهلا أيها المستخدم إسمي حسين الملقب ب (صائد الأرواح).",
        attachment: await global.utils.getStreamFromURL("https://i.postimg.cc/JzL1M2QS/1694907065351.jpg")
      });
    }
  }
}