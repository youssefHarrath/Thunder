const moment = require('moment-timezone');
moment.tz.setDefault('Africa/Casablanca');
const os = require('os');

module.exports = {
  config: {
    name: "أوبتايم",
    aliases: ["stats"],
    version: "1.0",
    countDown: 10,
    author: "Hadi V", //jangan diganti ya
    role: 0,
    shortDescription: {
      en: "قم بتفقد حالة البوت"
    },
    longDescription: {
      en: "قم بتفقد حالة البوت"
    },
    category: "النظام",
    guide: {
      en: "{pn}"
    }
  },
  
onStart: async function ({ message, event, usersData, threadsData }) {
     const uptime = process.uptime();
     const startTime = Date.now();
     const jam = Math.floor(uptime / 3600);
     const menit = Math.floor((uptime % 3600) / 60);
     const detik = Math.floor(uptime % 60);
     
     const arif = `${jam} ساعة ${menit} دقيقة ${detik} ثانية`;
     
     const edi = "https://www.facebook.com/profile.php?id=100076269693499";
     const vania = await global.utils.getStreamFromURL("https://i.imgur.com/b3FlmVD.jpeg");
   
     const now = moment();
     const riley = now.format('DD-MMMM-Y/hh.mm.ss A');
     
     const veli = `${Math.round(os.totalmem() / (1024 * 1024 * 1024))} جيجابايت`;
     const putra = await usersData.getAll();
     const loufi = await threadsData.getAll(); 
     const luxion = `${os.type()} ${os.release()}`;
     const rizky = `${os.cpus()[0].model} (${os.cpus().length} cores)`
     
     const endTime = Date.now();
     const raffa = endTime - startTime;
     
     const hadi = `${arif}\n━━━━━━━━━━━\nالبينغ : ${raffa}\nإجملي عدد المستخدمين : ${putra.length}\nإجمالي عدد المجموعات: ${loufi.length}\nالذاكرة : ${veli}\nالمعالج : ${rizky}\n\nالمطور : ${edi}`

     message.reaction("✔️", event.messageID);
     message.reply({ body: hadi, attachment: vania }, event.threadID);
  },
};