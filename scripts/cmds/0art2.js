const axios = require("axios");

module.exports = {
  config: {
    name: "فن",
    role: 0,
    author: "OtinXSandip",
    countDown: 5,
    longDescription: "فن الصور",
    category: "الذكاء الإصطناعي",
    guide: {
      en: "${pn} قم بالرد على صورة بالنموذج من 1 - 10"
    }
  },
  onStart: async function ({ message, api, args, event }) {
    const text = args.join(' ');
    
    if (!event.messageReply || !event.messageReply.attachments || !event.messageReply.attachments[0]) {
      return message.reply(" ⚠️ | المرجو الرد على صورة وإختيار نموذج او رقم من 1 إلى 10");
    }

    const imgurl = encodeURIComponent(event.messageReply.attachments[0].url);

    const [model] = text.split('|').map((text) => text.trim());
    const puti = model || "6";
        
    api.setMessageReaction("⏱️", event.messageID, () => {}, true);
    const lado = `https://sandipbaruwal.onrender.com/art?url=${imgurl}&model=${puti}`;

   const baby = await require('tinyurl').shorten(lado);

message.reply("✅ | جاري تحويل الصورة إلى أنمي.", async (err, info) => {
      const attachment = await global.utils.getStreamFromURL(lado);
      message.reply({  body: `${baby}`,
        attachment: attachment
      });
      let ui = info.messageID;          
      message.unsend(ui);
      api.setMessageReaction("✅", event.messageID, () => {}, true);
    });
  }
};