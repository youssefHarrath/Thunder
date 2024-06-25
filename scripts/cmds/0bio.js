const cron = require("node-cron");
const moment = require("moment");
const prefix = "©"; // Your bot's prefix
const botName = "ميدوريا";
const ownerName = " 🧿 حسين يعقوبي";

module.exports = {
  config: {
    name: "بايو",
    author:"Ron Zedric Laurente",// Convert By Goatbot Zed
     role: 2,
    shortDescription: " ",
    longDescription: "بايو تلقائي",
    category: "المالك",
    guide: {
      en: "{pn}بايو"
    }
  },


onChat: async function ({ api, event, globalModel , globalData, userModel }) {
  var { threadID, messageID } = event;

  cron.schedule('0 * * * *', () => {
    var currentHour = moment().format('HH');
    var bioMessage;
    var currentTime = moment().format('MMM Do, h:mm:ss a');

    if(currentHour >= 8 && currentHour <= 11){
      bioMessage = `صباح الخير أنا ${botName}, أنا حاليا شغال. مالك البوت: ${ownerName}.`;
    }else if(currentHour >= 12 && currentHour <= 18){
      bioMessage = `مساء الخير أنا ${botName}, أنا حاليا شغال. المالك: ${ownerName}.`;
    }else{
      bioMessage = `أهلا أنا ${botName}, أنا حاليا شغال. المالك: ${ownerName}.`;
    }
    
    api.changeBio(bioMessage, (err) => {
      if (err) return console.log("ERR: "+err);
    });
  }, {
    scheduled: true,
    timezone: "Africa/Casablanca"
  });
},

    onStart: async function ({ api, event, globalData, args, globalModel, userModel, usersData, commandName, role }) {
    const zed = (`هاي انا ${botName}\nأنا حاليا شغال » 🟢\nالمالك »  ${ownerName}.`);
         
      api.changeBio(`أهلا أنا  ${botName}\nأنا حاليا شغال  » 🟢\nالمالك »  ${ownerName}.`, (e) => {
      if(e) api.sendMessage(" ❌ |حدث خطأ" + e, event.threadID); return api.sendMessage(`✅ | تم تغيير حالة البوت بنجاح إلى » \n${zed}`, event.threadID, event.messgaeID)
    }
    )
  },
};