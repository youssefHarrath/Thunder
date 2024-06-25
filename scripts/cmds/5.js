const axios = require('axios');

module.exports = {
  config: {
    name: "اي_تيونز",
    aliases: ["اي تيونز"],
    version: "1.0",
    author: "Munem",
    countDown: 45,
    role: 0,
    shortDescription: "الحصول على بيانات اي تيونز",
    longDescription: "ابحث واحصل على معلومات iTunes",
    category: "الدراسة",
    guide: "{pn} {{<الإسم>}}"
  },

  onStart: async function ({ message, args }) {
    const name = args.join(" ");
    if (!name)
      return message.reply(`اسم غير صالح`);
    else {
      const BASE_URL = `https://api.popcat.xyz/itunes?q=${name}`;
      try {
        let res = await axios.get(BASE_URL);

        let name = res.data.name;
        let artist = res.data.artist;
        let album = res.data.album;
        let release_date = res.data.release_date;
        let price = res.data.price;
        let length = res.data.length;
        let genre = res.data.genre;
        let url = res.data.url;
        let img = res.data.thumbnail;

        const form = {
          body: `===「 معلومات الموسيقى 」===`
            + `\nالإسم: ${name}`
            + `\nالفنان: ${artist}`
            + `\nالألبوم: ${album}`
            + `\nتاريخ الرفع : ${release_date}`
            + `\nسعر: ${price}`
            + `\nطول: ${length}`
            + `\nالنوع: ${genre}`
            + `\nالرابط: ${url}`
        };
        if (img)
          form.attachment = await global.utils.getStreamFromURL(img);
        message.reply(form);
      } catch (e) {
        message.reply(`غير معثور عليه`);
      }
    }
  }
};
            