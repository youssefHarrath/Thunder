const axios = require('axios');

module.exports = {
  config: {
    name: "كلب",
    aliases: ["dog"],
    version: "1.0",
    author: "JUNMAR",
    countDown: 5,
    role: 0,
    shortDescription: "صور الكلاب",
    longDescription: "صور الكلاب",
    category: "متعة",
    guide: {
      en: "{pn}"
    },
  },

  onStart: async function ({ message, args, api, event }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  axios.get('https://random.dog/woof.json').then(res => {
  let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);

  let callback = function () {
          api.sendMessage({
            attachment: fs.createReadStream(__dirname + `/assets/dog2.${ext}`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/assets/dog2.${ext}`), event.messageID);
        };
        request(res.data.url).pipe(fs.createWriteStream(__dirname + `/assets/dog2.${ext}`)).on("close", callback);
      })
    }
    };