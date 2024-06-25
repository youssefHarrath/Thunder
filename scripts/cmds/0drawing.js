const axios = require("axios");

module.exports = {
  config: {
    name: "إهانة",
    aliases: [],
    version: "1.0",
    author: "kshitiz",//تم تعريب الأمر من طرف حسين يعقوبي 
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "إهانة شخص ما باستخدام هذا الأمر",
    category: "متعة",
    guide: "{pn} @الإشارة",
  },

  onStart: async function ({ api, event, args }) {
    try {
      const mention = Object.keys(event.mentions);

      if (mention.length !== 1) {
        api.sendMessage(" ⚠️ |الرجاء عمل منشن للشخص اللذي تريد اهانته.", event.threadID);
        return;
      }

      const mentionName = event.mentions[mention[0]].replace("@", ""); 

      if (mentionName.toLowerCase().includes("HUSSEIN YACOUBI")) {// قم بتغيير "اسمك" بالاسم الذي ترغب به
        api.sendMessage("لا يمكنك إهانة مالك البوت! 🤬 ", event.threadID);
        return;
      }

      const url = "https://evilinsult.com/generate_insult.php?lang=ar&type=json"; // تم تغيير اللغة إلى العربية

      const response = await axios.get(url);
      const insult = response.data.insult;

      const insultMessage = `${mentionName}, ${insult}`;
      api.sendMessage(insultMessage, event.threadID);

    } catch (error) {
      console.error(error);
      api.sendMessage("حدث خطأ!", event.threadID);
    }
  },
};
