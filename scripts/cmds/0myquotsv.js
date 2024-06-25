const axios = require('axios');

module.exports = {
  config: {
    name: "رقص",
    version: "1.0",
    author: "kshitiz",
    countDown: 5,
    role: 0,
    shortDescription: "رقص",
    longDescription: "رقصة أنمي",
    category: "أنمي",
    guide: "{pn}"
  },

  onStart: async function ({ message, args }) {
      const BASE_URL = `https://apiservice1.kisara.app/satou/api/endpoint/dance`;
 message.reply(" "); 
      try {
        let res = await axios.get(BASE_URL)
        let dance = res.data.url;
        const form = {
          body: `هيا لنرقص 🕺`
        };
     if (dance)
          form.attachment = await global.utils.getStreamFromURL(dance);
        message.reply(form); 
      } catch (e) { message.reply(` ❌ |حدث خطأ أثناء معالجة طلبك.`)
 console.log(e);
 }

    }
  };