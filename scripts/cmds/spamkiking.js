const axios = require("axios");
const fs = require("fs");
const path = require("path");
const request = require("request");

module.exports = {
  config: {
    name: "شعار",
    version: "2.0",
    author: "kshitiz",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: {
      en: ""
    },
    category: "خدمات",
    guide: {
      en: "{pn}شعار [الرقم] [النص]"
    }
  },

  onStart: async function ({ api, event, args, message }) {
    const num = args[0]; 
    const text = args.slice(1).join(' ');

    if (num > 181) return api.sendMessage("[⚠️] 181 هو الحد الأقصى.", event.threadID, event.messageID);
    if (isNaN(num)) return api.sendMessage("[⚠️] أرجوك قم بإدخال رقم وليس حرف.", event.threadID, event.messageID);
    if (!text) return api.sendMessage("[!] قم بإضافة نص.", event.threadID, event.messageID);

    api.sendMessage("[⏱️] جاري المعالجة يرجى الإنتظار...", event.threadID, event.messageID);

    var callback = () => api.sendMessage({ body: "", attachment: fs.createReadStream(__dirname + "/cache/textpro.png") }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/textpro.png"), event.messageID);

    request(encodeURI(`https://sakibin.sinha-apiv2.repl.co/api/textpro?number=${num}&text=${text}&apikey=SAKIBIN-FREE-SY6B4X`)).pipe(fs.createWriteStream(__dirname + '/cache/textpro.png')).on('close', () => callback());
  }
};