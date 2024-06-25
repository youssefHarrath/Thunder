const fs = require("fs-extra");
const { utils } = global;

module.exports = {
    config: {
        name:"توجيه" ,
        version: "1.1",
        author: "Ohio",
        countDown: 5,
        role: 0,
        shortDescription: "",
        longDescription: "",
        category: "النظام",
        guide: {
            en: ""
        }
    },

    langs: {
        ar: {
            myPrefix: "مرحبًا، اسم البوت الخاص بك يتحدث! 💥\n\n🌐 البادئة الخاصة بي: %1\n🛸 بادئة المجموعة الخاصة بك: %2"
        }
    },
onStart: async function ({ message, role, args, commandName, event, threadsData, getLang }) {
  if (!args[0])
            return message.SyntaxError();
  },
  
  onChat: async function ({ event, message, getLang }) {
        if (event.body && event.body.toLowerCase() === "إسم البوت الخاص بك")
            return () => {
        //console.log(global.GoatBot.onReaction)
                return message.reply(getLang("بادئة", global.GoatBot.config.prefix, utils.getPrefix(event.threadID)));
            };
    }
};