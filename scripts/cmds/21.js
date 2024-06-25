const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs")


module.exports = {
    config: {
        name: "عناق",
        aliases: ["us"],
        version: "1.0",
        author: "AceGun",
        countDown: 5,
        role: 0,
        shortDescription: "نحن معا",
        longDescription: "",
        category: "حب",
        guide: {
      vi: "{pn} [@tag]",
      en: "{pn} [@منشن]"
    }
    },



    onStart: async function ({ message, event, args }) {
        const mention = Object.keys(event.mentions);
        if (mention.length == 0) return message.reply(" ⚠️ | المرجو عمل منشن للشخص اللذي تريد عناقه 🙂");
        else if (mention.length == 1) {
            const one = event.senderID, two = mention[0];
            bal(one, two).then(ptth => { message.reply({ body: "فقط أنتي وأنا 🥰", attachment: fs.createReadStream(ptth) }) })
        } else {
            const one = mention[1], two = mention[0];
            bal(one, two).then(ptth => { message.reply({ body: "فقط أنتي وأنا 🥰 <3", attachment: fs.createReadStream(ptth) }) })
        }
    }
};

async function bal(one, two) {

    let avone = await jimp.read(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)
    avone.circle()
    let avtwo = await jimp.read(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)
    avtwo.circle()
    let pth = "حضن.png"
    let img = await jimp.read("https://i.ibb.co/3YN3T1r/q1y28eqblsr21.jpg")

    img.resize(466, 659).composite(avone.resize(150, 150), 320, 100).composite(avtwo.resize(130, 130), 280, 280);

    await img.writeAsync(pth)
    return pth
      }