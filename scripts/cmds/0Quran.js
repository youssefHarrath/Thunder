const fetch = require('node-fetch');

async function getQuranText({ api, event, args }) {
  var s1 = args[0];
  var s2 = args[1];

  if (!s1 || !s2) {
    return api.sendMessage("تأكد أنك وضعت الأمر بهذا الشكل:\n\n .قران رقم السورة مسافة ثم رقم الآية أو نطاق الآيات \n مثال:\n .قران 2 15-18", event.threadID, event.messageID);
  }

  var [startAyah, endAyah] = s2.split('-').map(Number);
  if (!endAyah) endAyah = startAyah;

  if (isNaN(startAyah) || isNaN(endAyah)) {
    return api.sendMessage("تأكد من أن رقم الآية أو نطاق الآيات صحيح.", event.threadID, event.messageID);
  }

  var verses = [];

  for (let i = startAyah; i <= endAyah; i++) {
    let url = `https://api.quran.gading.dev/surah/${s1}/${i}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      verses.push(`${data.data.text.arab} (${s1}:${i})`);
    } catch (error) {
      console.error('Error:', error);
      return api.sendMessage(`حدث خطأ في جلب الآية (${s1}:${i}).`, event.threadID, event.messageID);
    }
  }

  var message = verses.join('\n\n');
  api.sendMessage({ body: message }, event.threadID, event.messageID);
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
      en: "يجلب آيات مكتوبة من القرآن"
    },
    longDescription: {
      vi: "đây là mô tả dài của lệnh",
      en: "يجلب آيات مكتوبة من القرآن"
    },
    category: "إسلام",
    guide: {
      vi: "đây là hướng dẫn sử dụng của lệnh",
      en: "{pn} رقم السورة مسافة ثم رقم الآية أو نطاق الآيات \n مثال: .قران 2 15-18"
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
