const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: " التشغيل_التلقائي",
    aliases: ["autores"],
    version: "1.0",
    author: "Mart John Labaco", // DO NOT CHANGE THE AUTHOR! Important: Author field is locked.
    countDown: 5,
    role: 0,
    shortDescription: "قم بجعل البوت يعيد التشغيل لتجنب الإنطفاء.",
    longDescription: "قم بجعل البوت يعيد التشغيل عن طريق التحكم في ذالك بالإستخدام تشغيل/إيقاف.",
    category: "النظام",
    guide: "مثال : {p}إعادة_التشغيل <تشغيل/إيقاف/تعديل/قائمة> [<الوقت>]"
  },
  onStart: async function ({ api, event, args, isAdminBot }) {
    const yourID = "100076269693499"; //Change the I'd with your I'd. 
    const adminBotIds = [yourID];

    if (event.senderID !== yourID) {
      api.sendMessage(" ❌ |» ليس لديك الصلاحية لإستخدام هذا الأمر", event.threadID, event.messageID);
      return;
    }

    if (args.length < 1) {
      api.sendMessage(" 🤲 |صيغة خاطئة ، إستخدم : {p}إعادة_التشغيل قائمة", event.threadID, event.messageID);
      return;
    }

    const [action, time] = args;

    const configPath = path.join(__dirname, '../../config.json');
    try {
      const configFile = require(configPath);

      const validActions = ['تشغيل', 'إيقاف', 'تعديل', 'قائمة'];

      if (!validActions.includes(action.toLowerCase())) {
        api.sendMessage(' ⚠️ | إستخدام غير صالح , أكتب ©إعادة_التشغيل قائمة', event.threadID, event.messageID);
        return;
      }

      if (action.toLowerCase() === 'قائمة') {
        const listActions = [
          {
            action: 'تشغيل',
            description: 'يقوم بتشغيل البوت تلقائيا.'
          },
          {
            action: 'إيقاف',
            description: 'يقوم بإيقاف التشغيل التلقائي للبوت.'
          },
          {
            action: 'تعديل',
            description: 'تعديل الفاصل الزمني لإعادة التشغيل التلقائي.'
          },
          {
            action: 'قائمة',
            description: 'قائمة الأوامر المتاحة.'
          }
        ];

        const formattedList = listActions.map(item => `${item.action} - ${item.description}`).join('\n');
        api.sendMessage(`List:\n${formattedList}`, event.threadID);
        return;
      }

      if (action.toLowerCase() === 'تشغيل') {
        if (configFile.autoRestart.time !== null) {
          api.sendMessage(" ⚠️ | الميزة قد تم تفعيلها بالفعل في هذه المجموعة", event.threadID);
          return;
        }
        configFile.autoRestart.time = 1000000;
        fs.writeFileSync(configPath, JSON.stringify(configFile, null, 2));
        api.sendMessage(" ✅ | تم تفعيل خاصية التشغيل التلقائي في كل زمن محدد", event.threadID);
      } else if (action.toLowerCase() === 'إيقاف') {
        if (configFile.autoRestart.time === null) {
          api.sendMessage(" ⚠️ | الميزة بالفعل تم تعطيلها", event.threadID);
          return;
        }
        configFile.autoRestart.time = null;
        fs.writeFileSync(configPath, JSON.stringify(configFile, null, 2));
        api.sendMessage(" ❎ | تم تعطيل ميزة التشغيل التلقائي في كل زمن محدد", event.threadID);
      } else if (action.toLowerCase() === 'تعديل') {
        if (!time || isNaN(time)) {
          api.sendMessage(" ⚠️ |تنسيق الوقت غير صالح. يرجى تقديم وقت صالح بالمللي ثانية.", event.threadID);
          return;
        }
        configFile.autoRestart.time = parseInt(time);
        fs.writeFileSync(configPath, JSON.stringify(configFile, null, 2));
        const timeRemaining = configFile.autoRestart.time;
        api.sendMessage(`✅ | تم تحديث إعادة التشغيل لتكون كل  ${timeRemaining} ميلي ثانية.`, event.threadID);
      }
    } catch (err) {
      console.error(err);
      api.sendMessage("❌ | فشل في تحديث الإعدادات لإعادة التشغيل التلقائي", event.threadID);
    }
  }
};