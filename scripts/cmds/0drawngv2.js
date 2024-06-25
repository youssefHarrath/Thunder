/**
 * @Arabic
 * اقتحم حياة شخص آخر بعناق!
 */

module.exports = {
    config: {
        name: "عناق2",
        version: "1.0.0",
        hasPermssion: 0,
        credits: "John Lester",
        description: "اقتحم حياة شخص بعناق!",
        commandCategory: "حب",
        usages: "[@تاغ]",
        cooldowns: 5,
        dependencies: {
            "axios": "",
            "fs-extra": "",
            "path": "",
            "jimp": ""
        }
    },

onStart: async () => {
    try {
        const { resolve } = global.nodemodule["path"];
        const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
        const { downloadFile } = global.utils;
        const dirMaterial = __dirname + `/cache/canvas/`;
        const path = resolve(__dirname, 'cache/canvas', 'hugv1.png');
        if (!existsSync(dirMaterial + "canvas")) mkdirSync(dirMaterial, { recursive: true });
        if (!existsSync(path)) await downloadFile("https://ibb.co/GtqBKxQ", path);
    } catch (error) {
        console.error(error);
    }
},


    run: async function ({ event, api }) {
        const fs = global.nodemodule["fs-extra"];
        const path = global.nodemodule["path"];
        const axios = global.nodemodule["axios"];
        const jimp = global.nodemodule["jimp"];
        const __root = path.resolve(__dirname, "cache", "canvas");

        const { threadID, messageID, senderID, mentions } = event;
        const mention = Object.keys(mentions);
        if (!mention[0]) return api.sendMessage(" ⚠️ | المرجو عمل منشن لشخص ما.", threadID, messageID);
        
        const one = senderID, two = mention[0];
        let batgiam_img = await jimp.read(__root + "/hugv1.png");
        let pathImg = __root + `/hug_${one}_${two}.png`;
        let avatarOne = __root + `/avt_${one}.png`;
        let avatarTwo = __root + `/avt_${two}.png`;

        let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
        fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));

        let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
        fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8'));

        let circleOne = await jimp.read(await circle(avatarOne));
        let circleTwo = await jimp.read(await circle(avatarTwo));
        batgiam_img.composite(circleOne.resize(150, 150), 320, 100).composite(circleTwo.resize(130, 130), 280, 280);

        let raw = await batgiam_img.getBufferAsync("image/png");

        fs.writeFileSync(pathImg, raw);
        fs.unlinkSync(avatarOne);
        fs.unlinkSync(avatarTwo);

        return api.sendMessage({ body: "", attachment: fs.createReadStream(pathImg) }, threadID, () => fs.unlinkSync(pathImg), messageID);
    }
};

async function circle(image) {
    const jimp = require("jimp");
    image = await jimp.read(image);
    image.circle();
    return await image.getBufferAsync("image/png");
}
