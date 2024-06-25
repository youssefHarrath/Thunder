const tinyurl = require('tinyurl');
const axios = require("axios");
const fs = require("fs");

let imageUrl;
let sauceUrl;

/* لا تقم بتغيير
        الإشارة 🐢👑*/

module.exports = {
  config: {
    name: "مصدر",
    version: "1.0",
    author: "rehat--",
    role: "0",
    category: "أنمي",
    guide: {
      en: "{pn} رد على صورة"
    },
    longDescription: {
      en: "البحث عن مصدر الصورة الأنمي عن طريق الرد على صورة"
    },
  },

  onStart: async function ({ message, args, event, api }) {
    
    if (event.type === "message_reply") {
      const replyAttachment = event.messageReply.attachments[0];

      if (["photo", "sticker"].includes(replyAttachment?.type)) {
        imageUrl = replyAttachment.url;
      } else {
        return api.sendMessage(
          { body: "❌ | يجب أن يكون الرد على صورة." },
          event.threadID
        );
      }
    } else if (args[0]?.match(/(https?:\/\/.*\.(?:png|jpg|jpeg))/g)) {
      imageUrl = args[0];
    } else {
      return api.sendMessage({ body: "❌ | الرجاء الرد على صورة." }, event.threadID);
    }

    const url = await tinyurl.shorten(imageUrl);
    const replyMessage = await message.reply(" ⏱️ | الرجاء الانتظار...");

    try {
      const response = await axios.get(`https://turtle-apis.onrender.com/api/sauce?url=${url}`);
      const result = response.data.result;
      const title = result.title;
      const similarity = result.similarity;

      const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ar&dt=t&q=${encodeURIComponent(title)}`);
      const translation = translationResponse.data[0][0][0];
      
      message.reply({
        body: `الاسم : ${title}\nالتشابه : ${similarity}`,
        attachment: await global.utils.getStreamFromURL(result.video),
      });
    } catch (err) {
      message.unsend(replyMessage);
      message.reply(err.message);
      console.log(err);
    }
  },
};
