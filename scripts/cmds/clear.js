module.exports = {
  config: {
    name: "تنظيف",
    aliases: [],
    author: "kshitiz",  
    version: "2.0",
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: "إلغاء إرسال جميع الرسائل المرسلة بواسطة الروبوت"
    },
    category: "النظام",
    guide: {
      en: "{p}{n}"
    }
  },
  onStart: async function ({ api, event }) {
  
    const unsendBotMessages = async () => {
      const threadID = event.threadID;

     
      const botMessages = await api.getThreadHistory(threadID, 50); // Adjust the limit as needed 50 = 50 msg

      
      const botSentMessages = botMessages.filter(message => message.senderID === api.getCurrentUserID());

      
      for (const message of botSentMessages) {
        await api.unsendMessage(message.messageID);
      }
    };

    
    await unsendBotMessages();
  }
};