const axios = require("axios");

let simSimiEnabled = false; // قم بتعيين القيمة الافتراضية للتشغيل

module.exports = {
  config: {
    name: "شات",
    version: "1.0",
    author: "Your Name",
    role: 0,
    description: {
      en: "ردود تلقائية تفاعلية مع البوت",
    },
    category: "دردشة",
  },

  onStart: async function ({ api }) {
    console.log(`${this.config.name} module has started.`);
  },

  onChat: async function ({ api, event }) {
    if (simSimiEnabled && event.type === "message" && event.senderID !== api.getCurrentUserID()) {
      const content = encodeURIComponent(event.body);

      try {
        const res = await axios.get(`https://simsimi.fun/api/v2/?mode=talk&lang=ar&message=${content}&filter=false`);
        const respond = res.data.success;

        if (res.data.error) {
          api.sendMessage(`Error: ${res.data.error}`, event.threadID);
        } else {
          api.sendMessage(respond, event.threadID);
        }
      } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while fetching the data.", event.threadID);
      }
    }
  },

  run: async function ({ api, event, args }) {
    const { threadID, messageID } = event;
    const action = args[0]?.toLowerCase();

    if (action === "تشغيل") {
      simSimiEnabled = true;
      return api.sendMessage(" ✅ | تم تفعيل ميزة الدردشة مع للبوت.", threadID, messageID);
    } else if (action === "إيقاف") {
      simSimiEnabled = false;
      return api.sendMessage(" ❌ | تم إيقاف ميزة الدردشة مع البوت.", threadID, messageID);
    } else {
      if (!simSimiEnabled) {
        return api.sendMessage(" ❗ | ميزة الدردشة مع البوت متوقفة حاليا إستخدم ©شات تشغيل من أجل تفعيل الميزة.", threadID, messageID);
      }

      api.sendMessage(" ⚠️ | إستخدام خاطئ للأمر استخدم شات تشغيل أو إيقاف", threadID, messageID);
    }
  },
};