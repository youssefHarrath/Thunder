const fs = require("fs");

module.exports = {
  config: {
    name: "شخصيتي",
    aliases: ["my-character"],
    version: "1.0",
    author: "HUSSEIN",
    countDown: 5,
    role: 0,
    shortDescription: "يقوم بإقتراح عليك شخصيتك من الأنمي ",
    longDescription: "",
    category: "أنمي",
    guide: "{pn}أنمي"
  },

  onStart: async function ({ api, event, usersData, message, args }) {

  api.setMessageReaction("🤔", event.messageID, (err) => {}, true);
    
    const { senderID } = event;
    const userData = await usersData.get(senderID);
    if (!userData) {
      return api.sendMessage("حدث خطأ في العثور على بيانات المستخدم.", event.threadID);
    }

    const name = userData.name || "الشخص";
    const gender = userData.gender || 2; // يمكنك تعديل هذا الجزء حسب بيانات المستخدم الخاصة بك

    const amount = 500; // قيمة الدفع المطلوبة

    if (userData.money < amount) {
      return api.sendMessage(" ⚠️ |عذراً، ليس لديك ما يكفي من الأموال لإستخدام هذا الأمر يرحى دفع المبلغ 500 دولار 💵 كاش.", event.threadID);
    }

    // خصم المبلغ من حساب المستخدم
    userData.money -= amount;
    await usersData.set(senderID, userData);

    let img;
    if (args.includes("فتيات")) {
      // جلب صور شخصيات الأنمي للفتيات
      const femaleCharacters = [ "https://i.imgur.com/4PqzyWP.jpg",
"https://i.imgur.com/iQ3DWx5.jpg","https://i.imgur.com/Foi1zGB.jpg",
"https://i.imgur.com/B10Hy1N.jpeg",
"https://i.imgur.com/fGuBKSc.jpeg",  
"https://i.imgur.com/kLWxwib.jpeg",
"https://i.imgur.com/n7L9meS.jpeg",
"https://i.imgur.com/6fLSuK7.jpeg",                              "https://i.imgur.com/SKvuHXU.jpeg",
"https://i.imgur.com/6byGgAQ.jpeg",
"https://i.imgur.com/PYgxq1Y.jpeg",     
"https://i.imgur.com/oao1LZ7.jpeg",
"https://i.imgur.com/PojnX8J.jpeg",
"https://i.imgur.com/Kdn7pbC.jpeg", 
"https://i.imgur.com/n2BvFP1.jpeg",                              "https://i.imgur.com/VcAbjRG.jpeg",
"https://i.imgur.com/Eoc5qrb.jpeg",
"https://i.imgur.com/36fSXg7.jpeg",     
"https://i.imgur.com/rbdPmsr.jpeg",
"https://i.imgur.com/iozzKna.jpeg",
"https://i.imgur.com/uZ3cXp8.jpeg", 
"https://i.imgur.com/FzAqLO7.jpeg",                              "https://i.imgur.com/Ica2l2X.jpeg",
"https://i.imgur.com/kGyiHxH.jpeg",
"https://i.imgur.com/n2xOzUS.jpeg",     
"https://i.imgur.com/Ki2h2Ju.jpeg",
"https://i.imgur.com/zMtTu2a.jpeg",
"https://i.imgur.com/XBx9NYa.jpeg", 
"https://i.imgur.com/BATCRAA.jpeg",                              "https://i.imgur.com/RpyIjXw.jpeg",
"https://i.imgur.com/36M9C7V.jpeg",
"https://i.imgur.com/7xvT71l.jpeg",     
"https://i.imgur.com/PgjVuz1.jpeg",
"https://i.imgur.com/qVKi8V2.jpeg",
"https://i.imgur.com/jfJtPVK.jpeg", 
"https://i.imgur.com/JcK7lPx.jpeg",                              "https://i.imgur.com/RRnddBS.jpg",
"https://i.imgur.com/0C40VMA.jpg",
"https://i.imgur.com/b0YCfBO.jpg",     
"https://i.imgur.com/EF63R6y.jpg",
"https://i.imgur.com/uaBmGDh.jpg",
"https://i.imgur.com/co4wnOI.jpg",      
"https://i.imgur.com/d9KlCjt.jpg",
"https://i.imgur.com/SdO0pM9.jpg",
"https://i.imgur.com/wJ8Xf7y.jpg",
"https://i.imgur.com/vMNBrY3.jpg",
"https://i.imgur.com/Sg3Ai4Y.jpg",
"https://i.imgur.com/KFdJypu.jpg",
"https://i.imgur.com/PChQ6Ea.jpg",
"https://i.imgur.com/pekp4LZ.jpg",
"https://i.imgur.com/iQ3DWx5.jpg",        ];
      img = femaleCharacters[Math.floor(Math.random() * femaleCharacters.length)];
      api.sendMessage({
        body: `✿━━━━━━━━━━━━━━━━━✿\n💫 | لو كانت ${name} شخصية أنمي ستكون  :\n✿━━━━━━━━━━━━━━━━━✿`,
        attachment: await global.utils.getStreamFromURL(img)
      }, event.threadID);
    } else if (args.includes("فتيان")) {
      // جلب صور شخصيات الأنمي للأولاد
      const maleCharacters = [     "https://i.imgur.com/HX2HxPS.jpeg",                              "https://i.imgur.com/P3xPruS.jpeg",                             "https://i.imgur.com/r8yrFRw.jpg",
"https://i.imgur.com/GKL14dJ.jpeg",
"https://i.imgur.com/GFrI0C6.jpeg",
"https://i.imgur.com/JhsVMVn.jpeg",  
"https://i.imgur.com/s1yhtnN.jpeg",
"https://i.imgur.com/45gNmgt.jpeg",
"https://i.imgur.com/uSuRIaY.jpeg",  
"https://i.imgur.com/3uC72YW.jpeg",
"https://i.imgur.com/mOT09Jk.jpeg",
"https://i.imgur.com/WGbxgqW.jpeg",  
"https://i.imgur.com/alZ009T.jpeg",
"https://i.imgur.com/f5rjNmI.jpeg",
"https://i.imgur.com/jSXnC50.jpeg",
"https://i.imgur.com/LjUjnxn.jpeg",
"https://i.imgur.com/6ULasi2.jpeg",
"https://i.imgur.com/EsKVzEi.jpeg", 
"https://i.imgur.com/YDHwSXE.jpeg",                              "https://i.imgur.com/cDdamMq.jpeg",
"https://i.imgur.com/QuKSOUO.jpeg",
"https://i.imgur.com/pV9PDyG.jpeg",     
"https://i.imgur.com/CfJuvXn.jpeg",
"https://i.imgur.com/ZHXHvCA.jpeg",
"https://i.imgur.com/dZNcL7F.jpeg",
"https://i.imgur.com/RIKmUYk.jpeg",                              "https://i.imgur.com/rku2mXb.jpeg",
"https://i.imgur.com/UYM7wy8.jpeg",
"https://i.imgur.com/OuUuLr4.jpeg",     
"https://i.imgur.com/EAKPxvg.jpeg",
"https://i.imgur.com/TbOvvzH.jpeg",
"https://i.imgur.com/YvJ7omV.jpeg",
"https://i.imgur.com/QJ3VPZT.jpeg",                              "https://i.imgur.com/hoShMJ5.jpeg",
"https://i.imgur.com/9hO0Bjl.jpeg",
"https://i.imgur.com/1AA3Y1b.jpeg",     
"https://i.imgur.com/4av6OnG.jpg",
"https://i.imgur.com/bID48JU.jpg",
"https://i.imgur.com/Kkc5CZs.jpg",
"https://i.imgur.com/T9WwPxL.jpg",
"https://i.imgur.com/pp3L51v.jpg",
"https://i.imgur.com/nmTpfIV.jpg",
"https://i.imgur.com/G7Cmlm5.jpg",
"https://i.imgur.com/gyk1KTE.jpg",
"https://i.imgur.com/rcXzlbD.jpg",  
"https://i.imgur.com/4K2Lx2E.jpg",
"https://i.imgur.com/KriNOKQ.jpg",
"https://i.imgur.com/phrVQXt.jpg",
"https://i.imgur.com/QHZN13e.jpg",
"https://i.imgur.com/ci4PEdV.jpg",
"https://i.imgur.com/aakLRDZ.jpeg",             ];
      img = maleCharacters[Math.floor(Math.random() * maleCharacters.length)];
      api.sendMessage({
        body: `✿━━━━━━━━━━━━━━━━━✿\n💫 | لو كان ${name} شخصية أنمي سيكون  :\n✿━━━━━━━━━━━━━━━━━✿`,
        attachment: await global.utils.getStreamFromURL(img)
      }, event.threadID);
    } else {
      // رسالة الاستخدام الصحيح
      api.sendMessage(" ⚠️ |عذراً، يرجى كتابة '©شخصيتي فتيات' أو '©شخصيتي فتيان' للحصول على شخصية أنمي مناسبة.", event.threadID);
    }

    // حفظ تحديثات بيانات المستخدم
    await usersData.set(senderID, userData);
  }
};
