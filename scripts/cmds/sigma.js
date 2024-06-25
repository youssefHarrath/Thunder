module.exports = {
  config: {
    name: "سيجما",
    aliases: ["sigma", "sgm"],
    version: "1.0",
    author: "حسين يعقوبي",
    countDown: 10,
    role: 0,
    shortDescription: "يقوم بإرسال مقاطع لقواعد سيجما",
    longDescription: "قواعد السيجما",
    category: "متعة",
    guide: "{pn} سيجما",
  },

  onStart: async function ({ api, event }) {

    api.setMessageReaction("⏱️", event.messageID, (err) => {}, true);
    
    
    const sentMessage = await api.sendMessage(" ⏱️ | جاري تحميل مقطع السيجما يرجى الإنتظار....!", event.threadID);
    const link = [
      "https://drive.google.com/uc?export=download&id=1J0IPBx994G4k0PbssH_2_oFBgsvJOaus",
      "https://drive.google.com/uc?export=download&id=1J-DnGWpDHtMxhULh9xtrV0qY9e7mjxZB",
      "https://drive.google.com/uc?export=download&id=1J2L6tMxEr5_vXMVchcggXNtcOpYNL4fn",
      "https://drive.google.com/uc?export=download&id=1J2grCL5FU-4K5glbj3O_nTd8ueKdwCT5",
      "https://drive.google.com/uc?export=download&id=1JCfMUxzva2SHf-hgeCOMLs4D3UEZaBSt",
      "https://drive.google.com/uc?export=download&id=1JDQtEVBpi-ZdubJGJOnPpsLBr2s3Za--",
      "https://drive.google.com/uc?export=download&id=1J99laXuVeTiW-R_7BEV8hGTJ6g1GjrHq",
      "https://drive.google.com/uc?export=download&id=1JFqMOmTjUUc_kMCDwXKTwlBcFuACsKCa",
      "https://drive.google.com/uc?export=download&id=1JGzy9HTFeGIIMieOl0E7oSAOBWKKbX7-",
      "https://drive.google.com/uc?export=download&id=1JF0inCqpL2ZU0mLAj9oT5WZ_UwK68Czn",
      "https://drive.google.com/uc?export=download&id=1JOZgyOuChj1BusX8shhFVJhBShxs_Pag",
      "https://drive.google.com/uc?export=download&id=1JId2lYxs-vSyD6Z4RbafT1Ie3bXTTaX4",
      "https://drive.google.com/uc?export=download&id=1JSPq3oiIR_qjg8Jqn0Y1zssfIzQvnaYx",
      "https://drive.google.com/uc?export=download&id=1JTsJJoJQdtUQzRjSGaQFG13Xqo_9_dAr",
      "https://drive.google.com/uc?export=download&id=1JawIldd_RebYIxdFnqGyExOt8XWkYFMB",
      "https://drive.google.com/uc?export=download&id=1JuoZNBE-yy2tYirKJixsM4wJNk0wRIO9",
      "https://drive.google.com/uc?export=download&id=1Jpphma6dhagiUUe6efiQiQu3ZvxFdxJk",
      "https://drive.google.com/uc?export=download&id=1Jogu4VWc_tXTieaoFdgzxXIuu-HAsQab",
      "https://drive.google.com/uc?export=download&id=1JoF9cwxb5WpT3vcg7l309DLHwFFccQ1-",
      "https://drive.google.com/uc?export=download&id=1Jkc91UFNhB1YRQm9mT4Vv0t6O-gAYB_G",
      "https://drive.google.com/uc?export=download&id=1Jo1wXzh-Z09F5wGSjIRWHSJGQmDLKKmu",
      "https://drive.google.com/uc?export=download&id=1Jk6TfpoYSpfS-hiA7DpPXviK-p6tGYg5",
      "https://drive.google.com/uc?export=download&id=1JbjUgtrELyr6SkbG8SRSCCe2fca8Uw65",
      "https://drive.google.com/uc?export=download&id=1JfDBNj1oJvJa7eN7wdxjO8x_MhsxnuSS",
      // Add more video links here
    ];

    const randomIndex = Math.floor(Math.random() * link.length);
    const randomVideo = link[randomIndex];

api.setMessageReaction("✅", event.messageID, (err) => {}, true);
    
    
    await api.sendMessage({
      body: '࿇ ══━━━━✥◈✥━━━━══ ࿇\nتفضل مقطع السيجما 🧿\t\t\t\n࿇ ══━━━━✥◈✥━━━━══ ࿇',
      attachment: await global.utils.getStreamFromURL(randomVideo),
    }, event.threadID);

    
    setTimeout(() => {
      api.unsendMessage(sentMessage.messageID);
    }, 10000); 
  },
};