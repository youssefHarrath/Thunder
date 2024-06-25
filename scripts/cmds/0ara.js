const fs = require('fs');
module.exports = {
  config: {
    name: "أرا",
    version: "1.0",
    author: "Otineeeeeyyyyyy",
    countDown: 5,
    role: 0,
    shortDescription: "صوت ارا الكيوت",
    longDescription: "صوت ارارا بصوت كيوت",
    category: "متعة",
  },
  onStart: async function(){},
  onChat: async function({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "كيوت") {
      return message.reply({
        body: "『(つ≧▽≦)つ』",
        attachment: fs.createReadStream("ara.mp3"),
      });
    }
  }
};