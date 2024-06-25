module.exports = {
	config: {
		name: "ونبيس",
		aliases: ["ONE_PIECE"],
		version: "1.0",
		author: "HUSSEIN",
    credit: "Upen",
		countDown: 5,
		role: 0,
		shortDescription: "يقوم بإرسال لك صور من أنمي ونبيس",
		longDescription: "يقوم بإرسال صور متنوعة لشخصيات و أماكن متنوعة من أنمي ون بيس",
		category: "أنمي",
		guide: "{pn}"
	},

	onStart: async function ({ message }) {
	 var link = [
"https://i.imgur.com/75oRlcz.jpg",
    "https://i.imgur.com/PZHHJ8c.jpg",
    "https://i.imgur.com/LznMIc0.jpg",
    "https://i.imgur.com/waPXK4H.jpg",
    "https://i.imgur.com/AK2nyNW.jpg",
    "https://i.imgur.com/pTbKyvX.jpg",
    "https://i.imgur.com/GRrKLGw.jpg",
    "https://i.imgur.com/sjGopnt.jpg",
    "https://i.imgur.com/A8SCd7F.jpg",
    "https://i.imgur.com/dumiWfo.jpg",
    "https://i.imgur.com/7cwK0Mb.jpg",
    "https://i.imgur.com/pQfl5Ko.jpg",
    "https://i.imgur.com/VB4l6yp.jpg",
    "https://i.imgur.com/9yRhqeT.jpg",
    "https://i.imgur.com/esNaTCf.jpg",
    "https://i.imgur.com/6L5NxJe.jpg",
    "https://i.imgur.com/imBHx6n.jpg",
    "https://i.imgur.com/bYSx1T7.jpg",
    "https://i.imgur.com/51rWmSw.jpg",
    "https://i.imgur.com/DSRWKSs.jpg",
    "https://i.imgur.com/XHmOy2Z.jpg",
    "https://i.imgur.com/FLucCKx.jpg",
    "https://i.imgur.com/hFV6uJb.jpg",
    "https://i.imgur.com/aaL8y1Q.jpg",
    "https://i.imgur.com/ZVL02fd.jpg",
    "https://i.imgur.com/XS10K6h.jpg",
    "https://i.imgur.com/TvvwRFD.jpg",
    "https://i.imgur.com/EbXr5JB.jpg",
    "https://i.imgur.com/paCGiGT.jpg",
    "https://i.imgur.com/UZy3nns.jpg",
    "https://i.imgur.com/PYvZacP.jpg",
    "https://i.imgur.com/z9YTR60.jpg",
    "https://i.imgur.com/CxqbmHv.jpg"
]

let img = link[Math.floor(Math.random()*link.length)]
message.send({
  body: '「 هاهي ذي صور من أنمي ونبيس 🤓👒⛵ 」',attachment: await global.utils.getStreamFromURL(img)
})
}
     }