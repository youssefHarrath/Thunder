const axios = require("axios");

module.exports = {
  config: {
    name: "قران",
    version: "1.0",
    author: "يوسف",
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
      id: "Penggunaan: قران. <nomor surah> <nomor ayah>",
      en: "{p} quran <surah number> <ayah number>"
    }
  },

  onStart: async function ({ api, args, message, event }) {
    // التحقق من وجود الأمر وبدءه بـ ".قران"
    const command = args[0];

    if (!command || !command.startsWith(".قران")) {
      message.reply("الأمر غير معروف. يرجى استخدام الصيغة الصحيحة: .قران <رقم السورة> <رقم الآية>");
      return;
    }

    // إزالة البادئة للحصول على الأرقام
    const commandArgs = args.slice(1);

    // التحقق من وجود عدد كافٍ من الأرجومنتات
    if (commandArgs.length < 2) {
      message.reply("يرجى توفير رقم السورة ورقم الآية.");
      return;
    }

    // تحويل الأرقام إلى قيم عددية
    const surahNumber = parseInt(commandArgs[0], 10);
    const ayahNumber = parseInt(commandArgs[1], 10);

    // التحقق من صحة الأرقام
    if (isNaN(surahNumber) || isNaN(ayahNumber)) {
      message.reply("يرجى إدخال رقم السورة ورقم الآية بشكل صحيح.");
      return;
    }

    // إرسال إشارة الكتابة
    const typingIndicator = api.sendTypingIndicator(event.threadID);

    try {
      // طلب البيانات من API
      const response = await axios.get(`https://api.alquran.cloud/v1/ayah/${surahNumber}:${ayahNumber}/ar.alafasy`);
      typingIndicator();

      // التحقق من وجود البيانات
      if (response.data && response.data.data && response.data.data.text) {
        const replyMessage = response.data.data.text;
        message.reply(replyMessage);
      } else {
        message.reply("لم أتمكن من العثور على الآية المطلوبة.");
      }
    } catch (error) {
      console.error("❌ | حدث خطأ:", error.message);
      typingIndicator();
      message.reply(`❌ | حدث خطأ: ${error.message}`);
    }
  }
};
