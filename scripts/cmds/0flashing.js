const fs = require('fs-extra');
const axios = require('axios');

module.exports = {
  config: {
    name: "تفليش",
    aliases: ['war'],
    version: "1.0.0",
    author: "Ace",
    countDown: 10,
    role: 2,
    shortDescription: {
      vi: "",
      en: "قم بعمل تفليش المجموعة."
    },
    longDescription: {
      vi: "",
      en: "قم بتفليش المجموعة"
    },
    category: "متعة",
    guide: {
      en: "   {pn}"
    }
  },
  
  onStart: async function({ api, args, Users, event}) {
    var mention = Object.keys(event.mentions)[0];
    
    let name =  event.mentions[mention];
    var arraytag = [];
        arraytag.push({id: mention});
    var a = function (a) { 
       api.sendMessage(a, event.threadID); }
a(" ⏱️ | جاري البدأ في التفليش............");

    setTimeout(() => {a({body: "1" })}, 2000);

    setTimeout(() => {a({body: "2"})}, 4000);
    
    setTimeout(() => {a({body: "3" })}, 6000);
    
    setTimeout(() => {a({body: "4" })}, 8000);
    
    setTimeout(() => {a({body: "5" })}, 10000);
    
    setTimeout(() => {a({body: "6" })}, 12000);
    
    setTimeout(() => {a({body: "7" })}, 14000);
    
    setTimeout(() => {a({body: "8" })}, 16000);
    
    setTimeout(() => {a({body: "9" })}, 18000);
    
    setTimeout(() => {a({body: "10" })}, 20000);
    
    setTimeout(() => {a({body: " ✅ | تمت عملية التفليش بنجاح" })}, 31000);
    
    setTimeout(() => {a({body: "🔖 لا تنسى اللفظ و إن ضاق بك الرد" })}, 36000);
    
    setTimeout(() => {a({body: " ⚠️ |جاري إعادة التفليش يبدو أنه هناك خطأ ما......🔁" })}, 22000);
    
    setTimeout(() => {a({body: "10 " })}, 24000);
    
    setTimeout(() => {a({body: "9" })}, 26000);
    
    setTimeout(() => {a({body: "8" })}, 28000);
    
    setTimeout(() => {a({body: "7" })}, 30000);

    
    setTimeout(() => {a({body: "6" })}, 32000);
    
    setTimeout(() => {a("5")} , 34000);
    
    setTimeout(() => {a({body: "4" })}, 36000);
    
    setTimeout(() => {a({body: "3 " })}, 38000);
    
    setTimeout(() => {a({body: "2" })}, 40000);
    
    setTimeout(() => {a({body: "1"})} , 42000);

    setTimeout(() => {a({body: "0"})} , 44000);

    setTimeout(() => {a({body: "✅"})} , 48000);

    setTimeout(() => {a({body: "🧛‍♀️🧛‍♀️🧛‍♀️🧛‍♀️🧛‍♀️🧛‍♀️🧛‍♀️🧛‍♀️🧛‍♀️"})} , 70000);



  
  }
};