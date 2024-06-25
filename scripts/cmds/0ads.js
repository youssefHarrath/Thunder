const DIG = require("discord-image-generation");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "إعلانات",
    version: "1.0",
    author: "Samir B. Thakuri",
    countDown: 1,
    role: 0,
    shortDescription: "إعلان!",
    longDescription: "",
    category: "المجموعة",
    guide: "{pn} [@منشن|اترك_فارغاً]",
    envConfig: {
      deltaNext: 5
    }
  },

  langs: {
    vi: {
      noTag: "Bạn phải tag người bạn muốn tát"
    },
    en: {
      noTag: "يجب عليك وضع منشن على الشخص الذي تريد "
    }
  },

  onStart: async function ({ event, message, usersData, args, getLang }) {
    let mention = Object.keys(event.mentions)
    let uid;

    if (event.type == "message_reply") {
      uid = event.messageReply.senderID
    } else {
      if (mention[0]) {
        uid = mention[0]
      } else {
        console.log(" jsjsj")
        uid = event.senderID
      }
    }

    let url = await usersData.getAvatarUrl(uid)
    let avt = await new DIG.Ad().getImage(url)

    const pathSave = `${__dirname}/tmp/ads.png`;
    fs.writeFileSync(pathSave, Buffer.from(avt));

    let body = "أحدث العلامات التجارية في السوق 🥳"
    if (!mention[0]) body = "أحدث العلامات التجارية في السوق 🥳"

    // Send the image as a reply to the command message
    message.reply({
      body: body,
      attachment: fs.createReadStream(pathSave)
    }, () => fs.unlinkSync(pathSave));
  }
};