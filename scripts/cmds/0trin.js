const DIG = require("discord-image-generation");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "قطار",
    version: "1.1",
    author: "milan-says",
    countDown: 5,
    role: 0,
    shortDescription: "صورة القطار",
    longDescription: "صورة القطار",
    category: "متعة",
    guide: {
      vi: "{pn} [@tag | blank]",
      en: "{pn} [@تاغ | أو فارغ]"
    }
  },

  onStart: async function ({ event, message, usersData }) {
 const uid = Object.keys(event.mentions)[0]
 if(!uid) return message.reply(" ⚠️ | أرجوك قم بعمل منشن للشخص ما")
    const avatarURL = await usersData.getAvatarUrl(uid);
    const img = await new DIG.Thomas().getImage(avatarURL);
 const pathSave = `${__dirname}/tmp/${uid}_Thomas.png`;
    fs.writeFileSync(pathSave, Buffer.from(img));
    message.reply({
      attachment: fs.createReadStream(pathSave)
    }, () => fs.unlinkSync(pathSave));
  }
};