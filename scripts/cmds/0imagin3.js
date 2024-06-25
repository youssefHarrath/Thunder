const fs = require('fs');
module.exports = {
  config: {
    name: "هش",
    version: "1.0",
    author: "KSHITIZ",
    countDown: 5,
    role: 0,
    shortDescription: "بدون بادئة",
    longDescription: "بدون بادئة",
    category: "بدون بادئة",
  },
  onStart: async function(){},
  onChat: async function({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "باي") {
      return message.reply({
        body: "وداعا مع السلامة",
        attachment: fs.createReadStream("hchhh.mp4"),
      });
    }
  }
};