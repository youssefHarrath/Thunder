const fs = require('fs');
module.exports = {
  config: {
    name: "كيوت",
    version: "1.0",
    author: "KSHITIZ",
    countDown: 5,
    role: 0,
    shortDescription: "بدون بادئة",
    longDescription: "بطون بادئة",
    category: "بدون بادئة",
  },
  onStart: async function(){},
  onChat: async function({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "uwu") {
      return message.reply({
        body: "كيوت😚🥰",
        attachment: fs.createReadStream("uwu.mp4"),
      });
    }
  }
};