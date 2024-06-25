const moment = require("moment-timezone");

const destination = "61552791186880"; // ADD YOUR UID HERE

module.exports = {
  config: {
    name: "أشعارات",
    aliases: [],
    version: "1.0",
    author: "kshitiz", // CODE AUTHOR
    shortDescription: "البوت سيرسل لك إشعاؤ إذا قام أحد ما بعمل منشن لك",
    longDescription: "البوت سوف يقوم بإرسال لك إشعار إذا قام أحد بعمل منشن لك من أي مجموعة",
    category: "المالك",
    guide: "{pn} إشعارات",
  },

  onStart: async function ({ api, args, message, event, usersData }) {
    message.reply("تم تكوين هذا الأمر من أجل الإعلام عند ذكر إسم مسؤول البوت في مجموعة معينة.");
  },
  onChat: async function ({ api, args, message, usersData, threadsData, event }) {
    const data = await usersData.get(event.senderID);
    const name = data.name;
    const thread = await threadsData.get(event.threadID);
    const threadName = thread.threadName;

    const chat = event.body;
    if (chat.includes(`kshitiz`)) { // SET YOUR NAME HERE
      const formattedDate = moment.tz("Africa/Casablanca").format("dddd, DD MMMM YYYY, HH:mm:ss");//ADD YOUR COUNTRY TIME ZONE

      api.sendMessage(`⚠لقد تم ذكر إسمك :
✾إسم المرسل: ${name}
✾آيدي المرسل: ${event.senderID}
✾إسم المجموعة: ${threadName}
✾آيدي المجموعة: ${event.threadID}
✾رسالة المنشن:
${event.body}
✾التاريخ و الوقت: [${formattedDate}]`, destination);
    }
  }
};