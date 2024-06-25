const fs = require('fs');
module.exports = {
  config: {
    name: "ياميتي",
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
    if (event.body && event.body.toLowerCase() === "ياميتي") {
      return message.reply({
        body: "『🥵』",
        attachment: fs.createReadStream("yamate.mp3"),
      });
    }
  }
};