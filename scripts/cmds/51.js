const axios = require('axios');


module.exports = {

  config: {

    name: "إيمجور",

    version: "1.0",

    author: "kaizenji",//cliff API 

    countDown: 5,

    role: 0,

    longDescription: { en: "قم برفع صورة، صورة متحركة ، أو مقطع"},

    category: "صور",

    guide: {

      en: "{pn} فقط رد على المرفق"

    }

  },


  onStart: async function ({ message, api, event }) {

    const pogi = event.messageReply?.attachments[0]?.url;


    if (!pogi) {

      return message.reply(' ❗ | أرجوك.قم بالرد على صورة ، صورة متحركة ، أو مقطع');

    }


    try {

      const res = await axios.get(`https://69070.replit.app/imgur2?link=${encodeURIComponent(pogi)}`);

      const kaiz = res.data.uploaded.image;

      return message.reply(kaiz);

    } catch (error) {

      console.error(error);

      return message.reply('api sucks bro.');

    }

  }

};