module.exports = {
  config: {
    name: "أنمي",
    aliases: ["anime"],
    version: "1.0",
    author: "HUSSEIN",
    countDown: 5,
    role: 0,
    shortDescription: "يقوم بإرسال لك صور لشخصيات الأنمي ",
    longDescription: "",
    category: "أنمي",
    guide: "{pn}أنمي"
  },

  onStart: async function ({ api, event }) {
    var link = [
      "https://i.imgur.com/STbzVzE.jpg",
"https://i.imgur.com/1BtL3xt.jpg",
"https://i.imgur.com/gtn6yGM.jpg",
"https://i.imgur.com/KirOPqX.jpg",
"https://i.imgur.com/DnvyJKf.jpg",
"https://i.imgur.com/5JaWn3U.jpg",
"https://i.imgur.com/RlTHVIO.jpg",
"https://i.imgur.com/u8CNofc.jpg",
"https://i.imgur.com/vNrHyAR.jpg",
"https://i.imgur.com/P0ojenL.jpg",
"https://i.imgur.com/p7LUVyZ.jpg",
"https://i.imgur.com/FE2ig0h.jpg",
"https://i.imgur.com/z0JI2G4.jpg",
"https://i.imgur.com/CDLFnDs.jpg",
"https://i.imgur.com/qQU8cRV.jpg",
"https://i.imgur.com/uTj47XE.jpg",
"https://i.imgur.com/Hb4Dg26.jpg",
"https://i.imgur.com/oJW3DF7.jpg",
"https://i.imgur.com/zXOth4y.jpg",
"https://i.imgur.com/B54ekJA.jpg",
"https://i.imgur.com/V7nQRZB.jpg",
"https://i.imgur.com/WeyzqC0.jpg",
"https://i.imgur.com/wJaNjZ8.jpg",
"https://i.imgur.com/sAcK8Iu.jpg",
"https://i.imgur.com/Zf09ask.jpg",
"https://i.imgur.com/8fg6BZq.jpg",
"https://i.imgur.com/kxcwC1t.jpg",
"https://i.imgur.com/BEgICzb.jpg",
"https://i.imgur.com/JXqjOwy.jpg",
"https://i.imgur.com/B4gGSP2.jpg",
"https://i.imgur.com/eYT9c0E.jpg",
"https://i.imgur.com/vh5eqJe.jpg",
"https://i.imgur.com/EWVvpPD.jpg",
"https://i.imgur.com/pkFgWKS.jpg",
"https://i.imgur.com/TNHqo4b.jpg",
"https://i.imgur.com/P89pj57.jpg",
"https://i.imgur.com/HIOGDst.jpg",
"https://i.imgur.com/lNDkhzD.jpg",
"https://i.imgur.com/r38eirX.jpg",
"https://i.imgur.com/ldwp4Rh.jpg",
"https://i.imgur.com/ZvfZ6WR.jpg",
"https://i.imgur.com/ENJNsEg.jpg",
"https://i.imgur.com/Os4A7hs.jpg",
"https://i.imgur.com/p99aSKf.jpg",
"https://i.imgur.com/CfbuSUT.jpg",
"https://i.imgur.com/rZnX99a.jpg",
"https://i.imgur.com/PS1pR8V.jpg",
"https://i.imgur.com/WXimaBD.jpg",
"https://i.imgur.com/HoiDXY7.jpg",
"https://i.imgur.com/r2egHOG.jpg",
"https://i.imgur.com/lQ8PaYV.jpg",
"https://i.imgur.com/wi60ix3.jpg",
"https://i.imgur.com/SSv6Mcf.jpg",
"https://i.imgur.com/gznQchH.jpg",
"https://i.imgur.com/SK2Io59.jpg",
"https://i.imgur.com/3pZeaLM.jpg",
"https://i.imgur.com/4oV5Egc.jpg",
"https://i.imgur.com/zvuYRFj.jpg",
"https://i.imgur.com/Bjz05vD.jpg",
"https://i.imgur.com/szehA87.jpg",
"https://i.imgur.com/hPRBM08.jpg",
"https://i.imgur.com/A7JSoBG.jpg",
"https://i.imgur.com/BT9ojDC.jpg",
"https://i.imgur.com/NBa804M.jpg",
"https://i.imgur.com/kG8EPp7.jpg",
"https://i.imgur.com/uDEzIuI.jpg",
"https://i.imgur.com/KFOpmtg.jpg",
"https://i.imgur.com/Pk0Vf47.jpg",
"https://i.imgur.com/ebOYYBy.jpg",
"https://i.imgur.com/8EXyLsz.jpg"
    ];

    let img = link[Math.floor(Math.random() * link.length)];

    // React to the message with a check mark
    api.setMessageReaction("✅", event.messageID, (err) => {}, true);

    api.sendMessage({
      body: '「 💫 | تفضل إليك صورة الأنمي  」',
      attachment: await global.utils.getStreamFromURL(img)
    }, event.threadID);
  }
};
