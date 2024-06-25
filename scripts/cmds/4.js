module.exports = {
	config: {
		name: "ميمز",
		aliases: ["مجموعة من الميمز"],
		version: "1.0",
		author: "HUSSEIN",
		countDown: 4,
		role: 0,
		shortDescription: "مجموعة من الميمز المتنوعة و المضحكة😂",
		longDescription: "meme random",
		category: "متعة",
		guide: "{pn}ميمز"
	},
	onStart: async function ({ message }) {
	 var link = ["https://i.imgur.com/lot2AEt.jpg",
"https://i.imgur.com/vk9mTNP.jpg",
"https://i.imgur.com/xE5UYOX.jpg",
"https://i.imgur.com/t5tSvlT.jpg",
"https://i.imgur.com/XKKEsz0.jpg",
"https://i.imgur.com/dJoOraZ.jpg",
"https://i.imgur.com/7DcM0KU.jpg",
"https://i.imgur.com/DT0gXsx.jpg",
"https://i.imgur.com/tCcfMqX.jpg",
"https://i.imgur.com/M70vNPI.jpg",
"https://i.imgur.com/w5o82L4.jpg",
"https://i.imgur.com/PBKwrkK.jpg",
"https://i.imgur.com/XEQRqvg.jpg",
"https://i.imgur.com/2dSxBHG.jpg",
"https://i.imgur.com/SJPFB3S.jpg",
"https://i.imgur.com/fSi4crn.jpg",
"https://i.imgur.com/lBSL3LR.jpg",
"https://i.imgur.com/q95spam.jpg",
"https://i.imgur.com/QZei04d.jpg",
"https://i.imgur.com/qLYC68g.jpg",
"https://i.imgur.com/64ktT9V.jpg",
"https://i.imgur.com/vjwIKjR.jpg",
"https://i.imgur.com/UilbIYA.jpg",
"https://i.imgur.com/4hkJhnN.jpg",
"https://i.imgur.com/LiFT5TV.jpg",
"https://i.imgur.com/7xbD7fv.jpg",
"https://i.imgur.com/dLqDvNE.jpg",
"https://i.imgur.com/AGJslcv.jpg",
"https://i.imgur.com/MCWIPzZ.jpg",
"https://i.imgur.com/rVngNGb.jpg",
"https://i.imgur.com/ebRMvED.jpg",
"https://i.imgur.com/eLMMSFv.jpg",
"https://i.imgur.com/ukOQgfv.jpg",
"https://i.imgur.com/7UKnF3c.jpg",
"https://i.imgur.com/aSlteCa.jpg",
]
let img = link[Math.floor(Math.random()*link.length)]
message.send({
body: 'هنا الميمات الخاصة بك🎭',attachment: await global.utils.getStreamFromURL(img)
})
}
               }