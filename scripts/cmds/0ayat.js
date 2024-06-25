const fetch = require('node-fetch');
const fs = require('fs');
const request = require('request');

async function getQuranVerse({ api, event, args }) {
  var s1 = args[0];
  var s2 = args[1];

  if (!s1 || !s2) {
    return api.sendMessage("تأكد أنك وضعت الأمر بهذا الشكل:\n\n آيات رقم السورة مسافة ثم رقم الآية \n مثال:\n آيات 1 2", event.threadID, event.messageID);
  }

  var url = `https://api.quran.gading.dev/surah/${s1}/${s2}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    var audioLink = data.data.audio.secondary[0];

    request({ url: audioLink, encoding: null }, function (error, response, body) {
      if (error) throw error;
      fs.writeFileSync(__dirname + '/cache/quran_aud.mp3', body);
      api.sendMessage({ body: `${data.data.text.arab}`, attachment: fs.createReadStream(__dirname + `/cache/quran_aud.mp3`) }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/quran_aud.mp3`), event.messageID);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = {
  config: {
    name: "آيات",
    version: "1.0",
    author: "حسين يعقوبي",//made by Gry converted by HUSSEIN 
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "đây là mô tả ngắn của lệnh",
      en: "يقوم بإرسال آيات مع صوت"
    },
    longDescription: {
      vi: "đây là mô tả dài của lệnh",
      en: "يقوم بإرسال آيات مع صوت و"
    },
    category: "إسلام",
    guide: {
      vi: "đây là hướng dẫn sử dụng của lệnh",
      en: "{pn}"
    }
  },
  langs: {
    vi: {
      hello: "xin chào",
      helloWithName: "xin chào, id facebook của bạn là %1"
    },
    en: {
      hello: "hello world",
      helloWithName: "hello, your facebook id is %1"
    }
  },
  onStart: getQuranVerse,
};
