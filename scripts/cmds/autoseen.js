const fs = require('fs-extra');
const pathFile = __dirname + '/tmp/autoseen.txt';

module.exports = {
  config: {
    name: 'رؤية',
    aliases: ['seen'],
    version: '1.0',
    author: 'Eugene Codm',
    countDown: 5,
    role: 2,
    shortDescription: 'قم بتشغيل و إيقاف الرؤية التلقائية للرسائل الجديدة',
    longDescription: 'قم بتشغيل و إيقاف الرؤية التلقائية و إجعل البوت يرى الرسائل الجديدة للأعضاء ',
    category: 'النظام',
    guide: {
     en: "إيقاف/تشغيل"
   }
  },

onChat: async ({ api, event, args}) => {

if (!fs.existsSync(pathFile))
  fs.writeFileSync(pathFile, 'false');
  const isEnable = fs.readFileSync(pathFile, 'utf-8');
  if (isEnable == 'true')
    api.markAsReadAll(() => {});
},
   onStart: async ({ api, event,args }) => {




  try {
    if (args[0] == 'تشغيل') {
     fs.writeFileSync(pathFile, 'true');
     api.sendMessage(' ✅ |» تم تشغيل الرؤية التلقائية للبوت للرسائل الجديدة بالنسبة للأعضاء', event.threadID, event.messageID);
    } else if (args[0] == 'إيقاف') {
     fs.writeFileSync(pathFile, 'false');
     api.sendMessage(' ❌ | تم إيقاف الرؤية التلقائية للرسائل الأعضاء', event.threadID, event.messageID);
    } else {
     api.sendMessage('[❌]\nبناء خاطئ', event.threadID, event.messageID);
    }
  }
  catch(e) {
    console.log(e);
  }
}
  };