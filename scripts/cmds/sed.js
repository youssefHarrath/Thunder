module.exports = {
  config: {
    name: "غني",
    aliases: [],
    version: "1.0",
    author: "kshitiz",
    shortDescription: "",
    longDescription: "",
    category: "متعة",
    guide: "{pn} @منشن/رد"
  },

  async onStart({ api, event, usersData }) {
    try {
      let imageLink = "";

      if (event.type === "message_reply" && event.messageReply) {

        imageLink = await usersData.getAvatarUrl(event.messageReply.senderID);
      } else {
       avatar
        imageLink = await usersData.getAvatarUrl(event.senderID);
      }

      const gifURL = `https://api.popcat.xyz/drip?image=${encodeURIComponent(imageLink)}`;

      const message = {
        body: "لا يمكنك التعامل مع ثرائي🤑",
        attachment: [await global.utils.getStreamFromURL(gifURL)]
      };

      api.sendMessage(message, event.threadID, event.messageID);
    } catch (err) {
      console.error(err);
      api.sendMessage("يرجى ذكر أو الرد على شخص ما", event.threadID, event.messageID);
    }
  }
};