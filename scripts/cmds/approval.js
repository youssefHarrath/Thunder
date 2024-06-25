const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs")

module.exports = {
	config: {
		name: "إعتقال",
		aliases: ["arrest"],
		version: "1.0",
		author: "milan-says",
		countDown: 5,
		role: 0,
		shortDescription: "قم بإعنقال من خرق القوانين",
		longDescription: "إعتقال أحد ما إنطلاقا من وضعك للمنشن عليه",
		category: "متعة",
		guide:  {
			vi: "{pn} [@tag]",
			en: "{pn} [@تاغ]"
		}
	},

	onStart: async function ({ message, args,api , event, user }) {
        const mention = Object.keys(event.mentions);
        if (mention.length == 0) return message.reply("أرجوك قم بعمل منشن للشخص اللذي تريد إعتقاله");
        else if (mention.length == 1) {
            const one = event.senderID, two = mention[0];
            bal(one, two).then(ptth => { message.reply({ body: "أنت رهن الإعتقال👮🔗", attachment: fs.createReadStream(ptth) }) })
        } else {
            const one = mention[1], two = mention[0];
            bal(one, two).then(ptth => { message.reply({ body: "أنت رهن الإعتقال 👮🔗", attachment: fs.createReadStream(ptth) }) })
        }
    }


};

async function bal(one, two) {

   let avone = await jimp.read(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)
    avone.circle()
    let avtwo = await jimp.read(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)
    avtwo.circle()
    let pth = "fak.png"
    let img = await jimp.read("https://i.imgur.com/ep1gG3r.png")
    img.resize(500, 500).composite(avone.resize(100, 100), 375, 9).composite(avtwo.resize(100, 100), 160, 92);

    await img.writeAsync(pth)
    return pth
        }