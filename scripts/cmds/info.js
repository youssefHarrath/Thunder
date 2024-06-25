const fs = require('fs');
const moment = require('moment-timezone');

module.exports = {
  config: {
    name: "معلومات",
    version: "1.3",
    author: "AceGun",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "يرسل معلومات حول البوت والمسؤول مع صورة."
    },
    longDescription: {
      vi: "",
      en: "يرسل معلومات حول البوت والمسؤول مع صورة."
    },
    category: "المالك",
    guide: {
      en: "{pn}"
    },
    envConfig: {}
  },

  onStart: async function ({ message }) {
    const botName = "ميدوريا";
    const botPrefix = "©";
    const authorName = "حسين يعقوبي ";
    const authorFB = "https://www.facebook.com/profile.php?id=100076269693499";
    const authorInsta = "https://www.instagram.com/hussein_yacoubu/";
    const status = "أعزب";

    const urls = JSON.parse(fs.readFileSync('Hussein.json'));
    const link = urls[Math.floor(Math.random() * urls.length)];

    const now = moment().tz('Africa/Casablanca');
    const date = now.format('MMMM Do YYYY');
    const time = now.format('h:mm:ss A');

    const uptime = process.uptime();
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const days = Math.floor(uptime / (60 * 60 * 24));
    const uptimeString = `${days} أيام ${hours} ساعات ${minutes} دقائق ${seconds} ثواني`;

    message.reply({
      body: `===「 معلومات حول البوت و المالك 」===\nإسم البوت❏: ${botName}\n❏بادئة البوت: ${botPrefix}\n❏الإسم: ${authorName}\n❏فيسبوك: ${authorFB}\n❏إنستجرام: ${authorInsta}\n❏الحالة: ${status}\n❏التاريخ: ${date}\n❏الوقت: ${time}\n❏مدة التشغيل: ${uptimeString}\n=====================`,
      attachment: await global.utils.getStreamFromURL(link)
    });
  },

  onChat: async function({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "المطور") {
      this.onStart({ message });
    }
  }
};