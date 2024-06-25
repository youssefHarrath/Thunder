const DIG = require("discord-image-generation");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "مهرج",
    version: "1.1",
    author: "Xemonx—",
    countDown: 5,
    role: 0,
    shortDescription: "صورة ستونك",
    longDescription: "صورة مهرج ",
    category: "صور",
    guide: {
      en: "{pn} @تاغ"
    }
  },

  langs: {
    vi: {
      noTag: "Bạn phải tag người bạn muốn cho vào mồ"
    },
    en: {
      noTag: "يجب أن تقوم بوضع منشن"
    }
  },

  onStart: async function ({ event, message, usersData, args, getLang }) {
    const uid1 = event.senderID;
    const uid2 = Object.keys(event.mentions)[0];
    if (!uid2)
      return message.reply(getLang("noTag"));
    const avatarURL2 = await usersData.getAvatarUrl(uid2);
    const img = await new DIG.Clown().getImage(avatarURL2);
    const pathSave = `${__dirname}/tmp/${uid2}_Clown.png`;
    fs.writeFileSync(pathSave, Buffer.from(img));
    const content = args.join(' ').replace(Object.keys(event.mentions)[0], "");
    message.reply({
      body: `يا له من مهرج أحمق 🙂`,
      attachment: fs.createReadStream(pathSave)
    }, () => fs.unlinkSync(pathSave));
  }
};