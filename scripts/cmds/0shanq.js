const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs")


module.exports = {
 config: {
 name: "شنق",
 aliases: ["shanq"],
 version: "1.0",
 author: "HUSSEIN YACOUBI ",
 countDown: 5,
 role: 0,
 shortDescription: "قم بشنق احد ما 😂",
 longDescription: "",
 category: "متعة",
 guide: "{pn} شنق"
 },



 onStart: async function ({ message, event, args }) {
 const mention = Object.keys(event.mentions);
 if (mention.length == 0) return message.reply(" ⚠️ |المرجو عمل منشن أو رد على رسالة");
 else if (mention.length == 1) {
 const one = event.senderID, two = mention[0];
 bal(one, two).then(ptth => { message.reply({ body: " ✅ | لا تنسى اللفظ وإن ضاق بك الرد", attachment: fs.createReadStream(ptth) }) })
 } else {
 const one = mention[1], two = mention[0];
 bal(one, two).then(ptth => { message.reply({ body: " ✅ | لا تنسى اللفظ وإن ضاق بك الرد", attachment: fs.createReadStream(ptth) }) })
 }
 }


};

async function bal(one, two) {

 let avone = await jimp.read(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)
 avone.circle()
 let avtwo = await jimp.read(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)
 avtwo.circle()
 let pth = "toilet.png"
 let img = await jimp.read("https://i.postimg.cc/brq6rDDB/received-1417994055426496.jpg")

 img.resize(700,800).composite(avone.resize( 100, 200), 100, 25005).composite(avtwo.resize(120, 118), 300, 80);

 await img.writeAsync(pth)
 return pth
   }