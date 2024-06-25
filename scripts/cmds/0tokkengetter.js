const axios = require('axios');

module.exports = {
  config: {
  name: "توكن",
  version: "1.8.7",
  hasPermission: 0,
  author: "Jas",
  shortDescription: {
      en: "( قم بالحصول على توكن)"
    },
    longDescription: {
      en: ""
    },
  category: "خدمات",
  usage: { en: "( قم بالحصول على توكن خاص بك )"
         },
  cooldowns: 3,
},

onChat: async function ({ api, event }) {
  const message = event.body;
  const command = "توكن";

  if (message.indexOf(command) === 0 || message.indexOf(command.charAt(0).toUpperCase() + command.slice(1)) === 0) {
    const args = message.split(/\s+/);
    args.shift();

    if (args.length === 2) {
      const username = args[0];
      const password = args[1];

      api.sendMessage(`🕟 | جاري الحصول على التوكن للمستخدم '${username}' ، المرجو الإنتظار...`, event.threadID);

      try {
        const response = await axios.get('https://hazeyy-token-gen-api.kyrinwu.repl.co/api/token', {
          params: {
            username: username,
            password: password,
          },
        });

        if (response.data.status) {
          const token = response.data.data.access_token;
          api.sendMessage(`✨ تم إنشاء التوكن الخاص بك بنجاح ✅ ✨\n\n${token}`, event.threadID);
          console.log("✨ تم إستقبال التوكن :", token);
        } else {
          api.sendMessage(` 🔴 | خطا: ${response.data.message}`, event.threadID);
        }
      } catch (error) {
        console.error("🔴 𝖤𝗋𝗋𝗈𝗋 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗍𝗈𝗄𝖾𝗇", error);
        api.sendMessage(" 🔴 | حدث خطأ أثناء جلب توكن المستخدم .", event.threadID);
      }
    } else {
      api.sendMessage("  ⚠️ | كيفية الإستعمال : توكن [ البريد الإلكتروني ] [ كلمة المرور ]", event.threadID);
    }
  }
},

onStart: async function ({ api, event }) {
  
}
};