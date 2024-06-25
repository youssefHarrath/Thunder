const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");

module.exports = {
  config: {
    name: "خلل",
    aliases: ["mistake"],
    version: "1.0",
    author: "otineeyy",
    countDown: 2,
    role: 0,
    shortdescription: "خطأ",
    longDescription: "خلل صغير (قم بعمل منشن للشخص ما)", 
    category: "متعة",
    guide: ""
  },

  onStart: async function ({ message, event, args }) {
    const mention = Object.keys(event.mentions);
    if (mention.length == 0) {
      message.reply(" ⚠️ |قم بعمل منشن للشخص ما");
      return;
    }

    let one;
    if (mention.length == 1) {
      one = mention[0];
    } else {
      one = mention[0];
    }

    try {
      const imagePath = await bal(one);
      await message.reply({
        body: " أكبر خطأ على وجه الأرض 😳 ",
        attachment: fs.createReadStream(imagePath)
      });
    } catch (error) {
      console.error("Error while running command:", error);
      await message.reply("an error occurred");
    }
  }
};
async function bal(one) {
  const avatarone = await jimp.read(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=66262`);
  const image = await jimp.read("https:8568379%7Cc1e620fa708a1d5696fb991c1bde56//i.postimg.cc/2ST7x1Dw/received-6010166635719509.jpg");
  image.resize(512, 512).composite(avatarone.resize(220, 203), 145, 305);
  const imagePath = "mistake.png";
  await image.writeAsync(imagePath);
  return imagePath;
  }