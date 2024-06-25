module.exports = {
  config: {
    name: "رسالة_خاصة",
    aliases: ["privatemessage"],
    version: "1.0",
    author: "luffy",
    countDown: 5,
    role: 2,
    shortDescription: {
      en: "إرسالة رسالة خاصة إلى المستخدم"
    },
    longDescription: {
      en: "إرسال رسالة مجهولة باستخدام سلسلة الرسائل أو معرف المستخدم"
    },
    category: "المجموعة",
    guide:{
      en: "{p}رسالة_مجهولة الآيدي النص"
    }
  },
  onStart: async function ({ api, event, args }) {
    if (args.length < 2) {
      return api.sendMessage(
        "بناء جملة غير صحصح هذا خاطئ , إستخدم: رسالة_خاصة آيدي المجموعة [الرسالة]",
        event.threadID,
        event.messageID
      );
    }

    const idBox = args[0];
    const message = args.slice(1).join(" ");

    api.sendMessage({
      body: message,
      mentions: [{
        tag: "@رسالة_خاصة",
        id: event.senderID
      }]
    }, idBox, () => {
      api.sendMessage(
        `تم إرسالة الرسالة "${message}" إلى ${idBox} بسرية تامة✅`,
        event.threadID
      );
    });
  }
};