const fs = require('fs');
const path = require('path');
const axios = require('axios');
const jimp = require('jimp');
const { createCanvas, loadImage } = require('canvas');

module.exports = {
    config: {
        name: "قبر",
        version: "1.0",
        author: "Mahim",
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

    circle: async (image) => {
        image = await jimp.read(image);
        image.circle();
        return await image.getBufferAsync("image/png");
    },

    onStart: async function ({ event, api }) {
        try {
            const canvas = createCanvas(500, 670);
            const ctx = canvas.getContext('2d');
            const background = await loadImage('https://i.imgur.com/A4quyh3.jpg');

            const { threadID, messageID } = event;
            const mention = Object.keys(event.mentions);
            if (!mention[0]) return api.sendMessage(" ⚠️ | إعمل تاغ يا بني", threadID, messageID);
            else {
                const one = event.senderID, two = mention[0];
                const avatar = await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' });
                const circleOne = await module.exports.circle(avatar.data);
                
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                ctx.drawImage(await loadImage(circleOne), 160, 70, 160, 160);

                const imageBuffer = canvas.toBuffer();
                const imagePath = path.join(__dirname, 'cache', 'canvas', `sato${one}_${two}.png`);
                fs.writeFileSync(imagePath, imageBuffer);

                api.sendMessage({ body: "الله يرحمو 🤲\nكان إنسانا طيبا 🥺", attachment: fs.createReadStream(imagePath) }, threadID, () => fs.unlinkSync(imagePath), messageID);
            }
        } catch (e) {
            api.sendMessage(e.stack, event.threadID);
        }
    }
};
