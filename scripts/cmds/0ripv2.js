const DIG = require("discord-image-generation");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "قبر2",
    version: "1.1",
    author: "MILAN",
    countDown: 5,
    role: 0,
    shortDescription: "صورة على قبر",
    longDescription: "صورة صديق على قبر من اجل المتعة ليس إلا 😂",
    category: "متعة",
    guide: {
      vi: "{pn} [@tag | blank]",
      en: "{pn} [@منشن]"
    }
  },

  onStart: async function ({ event, message, usersData }) {
 const uid = Object.keys(event.mentions)[0]
 if(!uid) return message.reply(" ⚠️ | المرجو عمل @منشن لشخص ما")
    const avatarURL = await usersData.getAvatarUrl(uid);
    const img = await new DIG.Rip().getImage(avatarURL);
 const pathSave = `${__dirname}/tmp/${uid}_Rip.png`;
    fs.writeFileSync(pathSave, Buffer.from(img));
    message.reply({
      attachment: fs.createReadStream(pathSave)
    }, () => fs.unlinkSync(pathSave));
  }
};