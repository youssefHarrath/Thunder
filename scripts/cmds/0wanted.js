const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs-extra");

module.exports = {
    config: {
        name: "مطلوب",
        aliases: ["wanted"],
        version: "1.0",
        author: "حسين يعقوبي",
        countDown: 5,
        role: 0,
        shortDescription: "وضع صورتك على ملصق المطلوبين",
        longDescription: "",
        category: "متعة",
        guide: {
            vi: "{pn}",
            en: "{pn}"
        }
    },

    onStart: async function ({ api, event, args }) {
        const uid = args.length > 0 ? Object.keys(event.mentions) : event.senderID;
        const imagePath = await generateWantedImage(uid);
        api.sendMessage({ attachment: fs.createReadStream(imagePath) }, event.threadID);
    }
};

async function generateWantedImage(uid) {
    const pathImg = __dirname + "/cache/wanted.png";
    const pathAva = __dirname + "/cache/avt.png";

    const Avatar = (
        await axios.get(
            `https://graph.facebook.com/${uid}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,
            { responseType: "arraybuffer" }
        )
    ).data;

    fs.writeFileSync(pathAva, Buffer.from(Avatar, "utf-8"));

    const getWanted = (
        await axios.get(`https://i.imgur.com/2FarLuj.jpg`, {
            responseType: "arraybuffer",
        })
    ).data;

    fs.writeFileSync(pathImg, Buffer.from(getWanted, "utf-8"));

const baseImage = await jimp.read(pathImg);
    const baseAva = await jimp.read(pathAva);

    // ازالة هذا الخط لجعل الصورة مربعة بدلاً من دائرية
    // baseAva.circle(); 

    baseImage.resize(600, 800);
    baseImage.composite(baseAva.resize(345, 300), 120,200);

    await baseImage.writeAsync(pathImg);

    fs.removeSync(pathAva);

    return pathImg;
}


