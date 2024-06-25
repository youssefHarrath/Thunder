module.exports = {
  config: {
    name: "مانهوا",
    aliases: ["manhwa"],
    version: "1.0",
    author: "HUSSEIN",
    countDown: 5,
    role: 0,
    shortDescription: "يقوم بإقتراح منهوا لقرائتها ",
    longDescription: "",
    category: "أنمي",
    guide: "{pn} مانهو"
  },

  onStart: async function ({ api, event }) {
    var link = [
      
"https://i.imgur.com/Toz6idU.jpg",
"https://i.imgur.com/bjRfO9j.jpg",
"https://i.imgur.com/OtYoJi3.jpg",
 "https://i.imgur.com/3eosy6m.jpg",
  "https://i.imgur.com/FhoBQXa.jpg",
  "https://i.imgur.com/DVYPXpK.jpg",
  "https://i.imgur.com/dDHOkhE.jpg",    
  "https://i.imgur.com/cKY16UR.jpg",
  "https://i.imgur.com/dZn9AGk.jpg",
  "https://i.imgur.com/yGql1cQ.jpg",
"https://i.imgur.com/Hheejlg.jpg",
  "https://i.imgur.com/Or8h7SS.jpg",
  "https://i.imgur.com/ljWJ455.jpg",
  "https://i.imgur.com/PV9kaBS.jpg",
"https://i.imgur.com/FLuDAU3.jpg",
  "https://i.imgur.com/FLuDAU3.jpg",
  "https://i.imgur.com/f6XZhur.jpg",
"https://i.imgur.com/rWIj2lO.jpg",
"https://i.imgur.com/7Ba2f3r.jpg",
"https://i.imgur.com/q2CFFew.jpg",
"https://i.imgur.com/XXQe4dn.jpg",
"https://i.imgur.com/g2vQbNo.jpg",
"https://i.imgur.com/u9oNC2f.jpg",
"https://i.imgur.com/fifr5jf.jpg",
"https://i.imgur.com/BVy1wND.jpg",
"https://i.imgur.com/YilWA9R.jpg",
"https://i.imgur.com/8zbnIIl.jpg",
"https://i.imgur.com/Qm38kxW.jpg",
"https://i.imgur.com/oFBHZ6w.jpg",
"https://i.imgur.com/MFKmxAH.jpg",
"https://i.imgur.com/mAl4Bi1.jpg",
"https://i.imgur.com/Ftyay51.jpg",
"https://i.imgur.com/KFTJThz.jpg",
"https://i.imgur.com/tc45zOM.jpg",
"https://i.imgur.com/FfJwtwz.jpg",
"https://i.imgur.com/xUyY6dd.jpg",
"https://i.imgur.com/Zvi0DP8.jpg",
"https://i.imgur.com/sw6DIMG.jpg",
"https://i.imgur.com/DzVurBu.jpg",
"https://i.imgur.com/adc4z5L.jpg",
"https://i.imgur.com/neX11Ab.jpg",   
"https://i.imgur.com/nfqicvq.jpg",
"https://i.imgur.com/92jtAsB.jpg",
"https://i.imgur.com/hKI1JnU.jpg",
"https://i.imgur.com/NyqIXdt.jpg",
"https://i.imgur.com/yQoSnqe.jpg",
"https://i.imgur.com/WCGEqSU.jpg",
"https://i.imgur.com/CQwGg0R.jpg",
"https://i.imgur.com/by9dvf3.jpg",
    ];

    let img = link[Math.floor(Math.random() * link.length)];

    // React to the message with a check mark
    api.setMessageReaction("👑", event.messageID, (err) => {}, true);

    api.sendMessage({
      body: '「 👑 | هذا إقتراحي لك  」',
      attachment: await global.utils.getStreamFromURL(img)
    }, event.threadID);
  }
};
