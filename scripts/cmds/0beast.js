module.exports = {
  config: {
    name: "سيارات",
    aliases: ["cars"],
    version: "1.0",
    author: "HUSSEIN",
    countDown: 5,
    role: 0,
    shortDescription: "يقوم بإرسال لك صور  سيارات بجودة عالية ",
    longDescription: "",
    category: "متعة",
    guide: "{pn} سيارات"
  },

  onStart: async function ({ api, event }) {
    var link = [
      "https://i.imgur.com/4aCU6mc.jpg",
"https://i.imgur.com/vwzM7Bg.jpg",
"https://i.imgur.com/ydehZVF.jpg",
"https://i.imgur.com/nnEne7N.jpg",
"https://i.imgur.com/e2OXxHz.jpg",
"https://i.imgur.com/RMwBD5r.jpg",
"https://i.imgur.com/a2fppxx.jpg",
"https://i.imgur.com/TUHsmnL.jpg",
"https://i.imgur.com/GJ3cNN6.jpg",
"https://i.imgur.com/djHOTHx.jpg",
"https://i.imgur.com/tpzwYCk.jpg",
"https://i.imgur.com/FeEduLN.jpg",
"https://i.imgur.com/SVV5O62.jpg",
"https://i.imgur.com/OcTiv05.jpg",
"https://i.imgur.com/RMwBD5r.jpg",
"https://i.imgur.com/t3yQgZC.jpg",
"https://i.imgur.com/5VSIdsI.jpg",
"https://i.imgur.com/2yKqfQW.jpg",
"https://i.imgur.com/r2BmOSa.jpg",
"https://i.imgur.com/tpzwYCk.jpg",
"https://i.imgur.com/I9EYtwm.jpg",
"https://i.imgur.com/wT7Gzia.jpg",
"https://i.imgur.com/7zgYTUM.jpg",
"https://i.imgur.com/Eyh1iau.jpg",
"https://i.imgur.com/hpKfRDO.jpg",
    ];

    let img = link[Math.floor(Math.random() * link.length)];

    // React to the message with a check mark
    api.setMessageReaction("🏎️", event.messageID, (err) => {}, true);

    api.sendMessage({
      body: '「 🧿 | تفضل إليك صورة السيارة  」',
      attachment: await global.utils.getStreamFromURL(img)
    }, event.threadID);
  }
};
