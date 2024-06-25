const fs = require('fs');
module.exports = {
  config: {
    name: "ويمين",
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
    if (event.body && event.body.toLowerCase() === "wemen") {
      return message.reply({
        body: "wemen☕☕",
        attachment: fs.createReadStream("wemen.mp4"),
      });
    }
  }
};