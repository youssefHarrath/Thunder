const axios = require('axios');

module.exports = {
  config: {
    name: "لعبة_فيديو",
    aliases: ["gvdo"],
    version: "1.0",
    author: "Strawhat Luffy & kshitiz",//remodified by kshitiz
    countDown: 20,
    role: 0,
    shortDescription: "قم بالحصول على فيديوهات من ألعاب مشهورة",
    longDescription: "لبوت سيرسل ثلاث فيديوهات من ثلاث ألعاب مشهورين كال أوف ديتي و فالورون و دوتا 2",
    category: "متعة",
    guide: "{pn}"
  },

  onStart: async function ({ message, args }) {
    const BASE_URL = `https://apibard.hvcker2004.repl.co/videogame`;
    message.reply("Loading random game video");

    try {
      let res = await axios.get(BASE_URL);

      if (res.data && res.data.data && res.data.data.play) {
        let mlbb = res.data.data.play;
        const form = {
          body: `هاهو ذا الفيديو الخاص بك🎮`
        };
        form.attachment = await global.utils.getStreamFromURL(mlbb);
        message.reply(form);
      } else {
        message.reply("الفيديو لم يحد إستجابة.");
      }
    } catch (e) {
      message.reply("حدث خطأ أثناء معالجة طلبك.");
      console.log(e);
    }
  }
};