const axios = require("axios");

module.exports = {
  config: {
    name: "بريد_مؤقت",
    version: "1.0",
    author: "Rishad",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "استرداد رسائل البريد الإلكتروني ورسائل البريد الوارد",
      vi: "استرداد رسائل البريد الإلكتروني ورسائل البريد الوارد",
    },
    longDescription: {
      en: "استرداد رسائل البريد الإلكتروني ورسائل البريد الوارد",
      vi: "retrieve emails and inbox messages",
    },
    category: "خدمات",
    guide: {
      en: "{pn} توليد\n{pn} صندوق_الورائد (البريد الالكتروني)",
      vi: "{pn} توليد\n{pn} صندوق_الورائد (البريد الالكتروني)",
    },
  },

  onStart: async function ({ api, args, event }) {
    const command = args[0];

    if (command === "توليد") {
      try {
        const response = await axios.get("https://for-devs.onrender.com/api/mail/gen?apikey=fuck");
        const email = response.data.email;
        return api.sendMessage(` 🌟 | تم توليد البريد الإلكتروني: ${email}`, event.threadID);
      } catch (error) {
        console.error(error);
        return api.sendMessage("Failed to generate email.", event.threadID);
      }
    } else if (command === "صندوق_الورائد") {
      const email = args[1];

      if (!email) {
        return api.sendMessage(" ⚠️ | قم بإدخال بريد إلكتروني.", event.threadID);
      }

   try {
        const inboxResponse = await axios.get(`https://for-devs.onrender.com/api/mail/inbox?email=${email}&apikey=fuck`);
        const inboxMessages = inboxResponse.data;

        const formattedMessages = inboxMessages.map((message) => {
          return `${message.date} - من 🌟: ${message.sender}\n${message.message}`;
        });

        return api.sendMessage(` 🌟 | رسائل واردة من  ${email}:\n\n${formattedMessages.join("\n\n")}\n\n ⚠️ | ملاحظة : الرسائل القديمة هي مؤقتة وسيتم حذفها بعد مدة .`, event.threadID);

      } catch (error) {
        console.error(error);
        return api.sendMessage(" ❌ | حدث خطأ أثناء جلب رسائل البريد.", event.threadID);
      }
    } else {
      return api.sendMessage(" ⚠️ | فعل غير صالح إستخدم {pn} توليد أو {pn} صندوق_الورائد (البريد الالكتروني).", event.threadID);
    }
  }
};