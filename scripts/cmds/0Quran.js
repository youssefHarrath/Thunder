const fetch = require('node-fetch');

async function getQuranText({ api, event, args }) {
  var s1 = args[0];
  var s2 = args[1];

  if (!s1 || !s2) {
    return api.sendMessage("تأكد أنك وضعت الأمر بهذا الشكل:\n\n قران رقم السورة مسافة ثم رقم الآية \n مثال:\n قران 1 2", event.threadID, event.messageID);
  }

  var url = `https://api.quran.gading.dev/surah/${s1}/${s2}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    var verseText = data.data.text.arab;

    api.sendMessage({ body: verseText }, event.threadID, event.messageID);
  } catch (error) {
    console.error('Error:', error);
    api.sendMessage("حدث خطأ في جلب الآية. تأكد من صحة رقم السورة والآية.", event.threadID, event.messageID);
  }
}

module.exports = {
  config: {
    name: "قران",
    version: "1.0",
    author: "يوسف", // made by Gry converted by HUSSEIN
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "đây là mô tả ngắn của lệnh",
      en: "يجلب آية مكتوبة من القرآن"
    },
    longDescription: {
      vi: "đây là mô tả dài của lệnh",
      en: "يجلب آية مكتوبة من القرآن"
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
  onStart: getQuranText,
};
