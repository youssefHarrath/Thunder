const fs = require('fs');
const path = require('path');
const axios = require('axios');
const jimp = require('jimp');

async function downloadCanvasImage() {
    const dirMaterial = path.join(__dirname, 'cache', 'canvas');
    const filePath = path.join(__dirname, 'cache', 'canvas', 'sato.png');
    if (!fs.existsSync(dirMaterial)) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(filePath)) await downloadImage("https://i.imgur.com/dsrmtlg.jpg", filePath);
}

async function downloadImage(url, localPath) {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    fs.writeFileSync(localPath, Buffer.from(response.data, 'binary'));
}

async function makeImage({ one, two }) {
    const dirMaterial = path.join(__dirname, 'cache', 'canvas');
    const avatarDir = path.join(__dirname, 'cache', 'canvas', `avt_${one}.png`);
    const avatarTwoDir = path.join(__dirname, 'cache', 'canvas', `avt_${two}.png`);
    const imagePath = path.join(__dirname, 'cache', 'canvas', `sato${one}_${two}.png`);

    const getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarDir, Buffer.from(getAvatarOne, 'utf-8'));

    const getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarTwoDir, Buffer.from(getAvatarTwo, 'utf-8'));

    const batgiamImg = await jimp.read(path.join(__dirname, 'cache', 'canvas', 'sato.png'));
    const circleOne = await jimp.read(await circle(avatarDir));
    const circleTwo = await jimp.read(await circle(avatarTwoDir));

    batgiamImg.composite(circleOne.resize(150, 150), 80, 190).composite(circleTwo.resize(150, 150), 260, 80);
    await batgiamImg.writeAsync(imagePath);

    fs.unlinkSync(avatarDir);
    fs.unlinkSync(avatarTwoDir);

    return imagePath;
}

async function circle(image) {
    const imageJimp = await jimp.read(image);
    imageJimp.circle();
    return await imageJimp.getBufferAsync("image/png");
}

module.exports = {
    config: {
        name: "صفع",
        version: "1.0",
        author: "حسين يعقوبي",
        role: 0,
        countdown: 10,
        category: "متعة",
        shortDescription: {
            en: " "
        },
        longDescription: {
            en: ""
        },
        guide: {
            en: "{prefix}"
        }
    },
    onStart: async function ({ event, api }) {
        await downloadCanvasImage();
        const { threadID, messageID, senderID } = event;
        const mention = Object.keys(event.mentions);
        if (!mention[0]) return api.sendMessage("تاغ للبني ادم", threadID, messageID);
        else {
            const one = senderID, two = mention[0];
            return makeImage({ one, two }).then(path => api.sendMessage({ body: "", attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path), messageID));
        }
    }
};
