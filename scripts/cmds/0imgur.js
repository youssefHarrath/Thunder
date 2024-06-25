module.exports = {
  config: {
    name: "رابط",
    version: "1.0",
    author: "AceGun",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: {
      en: ".",
    },
    category: "خدمات",
    guide: {
      en: "{prefix} <قم بالرد على صورة أو فيديو>",
    },
  },

  onStart: async function ({ api, event, getText }) {
    const { messageReply } = event;

    if (event.type !== "message_reply" || !messageReply.attachments || messageReply.attachments.length !== 1) {
      return api.sendMessage(getText("invalidFormat"), event.threadID, event.messageID);
    }

    return api.sendMessage(messageReply.attachments[0].url, event.threadID, event.messageID);
  }
};