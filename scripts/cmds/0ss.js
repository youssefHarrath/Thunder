const axios = require('axios');
module.exports = {
  config: {
    name: "لقطة_شاشة",
    aliases: ["screenshot"],
    version: "1.0",
    author: "MILAN",
    countDown: 5,
    role: 0,
    shortDescription: "قم بالحصول على لقطة شاشةلموقع معين",
    longDescription: "قم بالحصول على لقطة شاشة بالرد على رابط لموقع معين",
    category: "خدمات",
    guide: "{pn} رابط"
  },

  onStart: async function ({ message, args }) {
    const url = args.join(" ");
    if (!url) {
      return message.reply(`⚠️ | أرجوك قم بإدخال رابط الموقع !`);
    } else {
      try {
        const BASE_URL = `https://milanbhandari.imageapi.repl.co/screenshot?url=${encodeURIComponent(url)}`;
        const form = {
          body: ``
        };
        form.attachment = []
        form.attachment[0] = await global.utils.getStreamFromURL(BASE_URL);
        message.reply(form); 
      } catch (e) { 
        message.reply(`Error`);
      }
    }
  }
};