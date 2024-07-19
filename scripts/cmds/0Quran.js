const axios = require("axios");

module.exports = {
  config: {
    name: "قران",
    version: "1.0",
    author: "Your Name",
    countDown: 5,
    role: 0,
    shortDescription: {
      id: "Perintah untuk mendapatkan ayat Quran",
      en: "Command to get Quranic verses"
    },
    longDescription: {
      id: "Perintah ini mengirimkan nomor surah dan ayah untuk mendapatkan ayat Quran.",
      en: "This command sends surah and ayah numbers to get the Quranic verse."
    },
    category: "القرآن الكريم",
    guide: {
      id: "Penggunaan: .quran <nomor surah> <nomor ayah>",
      en: "{p} quran <surah number> <ayah number>"
    }
  },

  onStart: async function ({ api, args, message, event }) {
    // تحقق من أن الأمر يبدأ بـ ".قران"
    if (!args[0] || !args[0].startsWith(".قران")) {
      message.reply("الأمر غير معروف. يرجى استخدام الصيغة الصحيحة: .قران <رقم السورة> <رقم الآية>");
      return;
    }

    // إزالة البادئة ".قران" للحصول على الأرقام
    const commandArgs = args.slice(1);
    const surahNumber = parseInt(commandArgs[0], 10);
    const ayahNumber = parseInt(commandArgs[1], 10);

    if (isNaN(surahNumber) || isNaN(ayahNumber)) {
      message.reply("يرجى إدخال رقم السورة ورقم الآية بشكل صحيح.");
      return;
    }

    const typingIndicator = api.sendTypingIndicator(event.threadID);

    try {
      const { data } = await axios.get(`https://api.alquran.cloud/v1/ayah/${surahNumber}:${ayahNumber}/ar.alafasy`);
      typingIndicator();

      const replyMessage = data.data.text;
      message.reply(replyMessage);
    } catch (error) {
      console.error("❌ | حدث خطأ:", error.message);
      typingIndicator();
      message.reply(`❌ | حدث خطأ: ${error.message}`);
    }
  }
};
