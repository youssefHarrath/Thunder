const axios = require('axios');
const fs = require('fs-extra');

module.exports = {
  config: {
    name: "أنمي2",
    aliases: [],
    version: "1.0",
    author: "حسين يعقوبي",
    countDown: 2,
    role: 0,
    shortDescription: "تحويل الصورة إلى نمط أنيمي",
    longDescription: "تحويل صورة على طريقة الأنمي",
    category: "أنمي",
    guide: "{pn} {قم بالرد على صورة}"
  },

  onStart: async function ({ api, event, args }) {
    const { threadID, messageID } = event;

    const imageUrl = event.messageReply && event.messageReply.attachments[0].url ? event.messageReply.attachments[0].url : args.join(" ");

    try {
      const response = await axios.get(`https://sandipapi.onrender.com/anime`);
      const image = response.data.url;

      const imgResponse = await axios.get(image, { responseType: "arraybuffer" });
      const img = Buffer.from(imgResponse.data, 'binary');

      const pathie = __dirname + `/cache/animefy.jpg`;
      fs.writeFileSync(pathie, img);

      api.sendMessage({
        body: " ✨ إليك صورة الأنمي :",
        attachment: fs.createReadStream(pathie)
      }, threadID, () => fs.unlinkSync(pathie), messageID);

    } catch (e) {
      api.sendMessage(` ❌ | حدث خطأ :\n\n${e}`, threadID, messageID);
    }
  }
};
