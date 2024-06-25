 module.exports = {
  config: {
    name: "الإحترام",
    aliases: [],
    version: "1.0",
    author: "AceGun x Samir Œ",
    countDown: 0,
    role: 0,
    shortDescription: "إعطاء المشرف وإظهار الاحترام",
    longDescription: "يمنح امتيازات المشرف في المجموعة ويظهر رسالة الإحترام و التقدير.",
    category: "المالك",
    guide: "{pn} الإحترام",
  },

  onStart: async function ({ message, args, api, event }) {
    try {
      
api.setMessageReaction("🚫", event.messageID, (err) => {}, true);

      console.log('Sender ID:', event.senderID);

      const permission = ["100076269693499"];
      if (!permission.includes(event.senderID)) {
        return api.sendMessage(
          "(\/)\ •_•)\/ >🧠\لقد أوقعت هذا يا غبي",
          event.threadID,
          event.messageID
        );
      }

      const threadID = event.threadID;
      const adminID = event.senderID;
      
      // Change the user to an admin
      api.setMessageReaction("✅", event.messageID, (err) => {}, true);
      
      await api.changeAdminStatus(threadID, adminID, true);

      api.sendMessage(
        `أنا أحترمك يا رئيسي! أنت الآن مشرف في هذه المجموعة.`,
        threadID
      );
    } catch (error) {
      console.error("حدث خطأ أثناء ترقية المستخدم إلى مسؤول:", error);
      api.sendMessage("حدث خطأ أثناء الترقية إلى المشرف.", event.threadID);
    }
  },
};