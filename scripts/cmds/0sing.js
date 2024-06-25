const axios = require("axios");

module.exports = {
  config: {
    name: "غني",
    version: "1.1",
    author: "Otinxsandip",
    countDown: 5,
    role: 0,
    longDescription: "صوت",
    category: "وسائط",
    guide: {
      en: "{pn} نص أو رد على رسالة"
    }
  },

  onStart: async function ({ api, event, args, getLang, message, usersData }) {
    try {
      const text = args.join(' ');
      if (!text) {
        return message.reply(' ⚠️ | يرحى إدخال نص أو رد على رسالة');
      }
      const link = `https://sandipapi.onrender.com/music?song=${encodeURIComponent(text)}`;

      message.reply({
        body: ' ✨ | إليك أغنيتك',
        attachment: await global.utils.getStreamFromURL(link)
      });
    } catch (error) {
      console.error(error);
    }
  }
};