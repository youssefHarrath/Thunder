
const axios = require("axios");

module.exports = {
  config: {
    name: "إرسال",
    aliases: [],
    version: "1.0",
    author: "Kshitiz",
    countDown: 5,
    role: 0,
    shortDescription: "قم بإرسال رسالة إلى مجموعة معينة",
    longDescription: "",
    category: "المالك",
    guide: {
      en: "{pn} <الرسالة > [آيدي]",
    },
  },

  onStart: async function ({ api, event, args, message }) {
    if (!args[0]) {
   
      try {
        const groupList = await api.getThreadList(100, null, ['INBOX']);
        const filteredList = groupList.filter(group => group.threadName !== null);

        if (filteredList.length === 0) {
          await api.sendMessage(' ⚠️ | لم يتم العثور على أي مجموعة.', event.threadID);
        } else {
          const formattedList = filteredList.map((group, index) =>
            `│${index + 1}. ${group.threadName}\n│آيدي المجموعة : ${group.threadID}`
          );
          const message = `╭─╮\n│قائمة المجموعات :\n${formattedList.map(line => `${line}`).join("\n")}\n╰───────────⨠`;
          await api.sendMessage(message, event.threadID, event.messageID);
        }
      } catch (error) {
        console.error("Error listing group chats", error);
      }
      return;
    }

    const messageText = args.slice(0, -1).join(" ");

    try {
    
      const repliedAttachment = event.messageReply && event.messageReply.attachments.length > 0
        ? await global.utils.getStreamFromURL(event.messageReply.attachments[0].url)
        : null;

   
      const notificationMessage = `${messageText}`;

      const gcUid = args.length >= 2 ? args[args.length - 1] : null;
      const groupChats = gcUid ? [gcUid] : (await api.getThreadList(100, null, ["INBOX"])).map(group => group.threadID);

      for (const groupChat of groupChats) {
        if (repliedAttachment) {
          
          await api.sendMessage({
            attachment: repliedAttachment,
            body: notificationMessage
          }, groupChat);
        } else {
         
          await api.sendMessage({ body: notificationMessage }, groupChat);
        }
      }

      api.sendMessage(` ✅ | تم إرسال إشعار إلى  ${gcUid ? "المجموعة " + gcUid : "كل المجموعات"}`, event.threadID, event.messageID);
    } catch (error) {
      api.sendMessage(` ⚔️ | كيفية الإستخدام ©إرسال رد على صورة أو فيديو أكتب الرسالا بعدها آيدي المجموعة`, event.threadID, event.messageID);
      console.error(error);
    }
  },
};