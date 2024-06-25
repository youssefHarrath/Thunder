const os = require("os");

module.exports = {
  config: {
    name: "حالة_البوت",
    aliases: ["up", "upt"],
    version: "2.1",
    author: "SiAM",
    longDescription: "قم بتفقد حالة البوت",
    category: "خدمات",
    guide: {
      en: "{pn}",
    },
  },

  onStart: async function ({ api, message, event }) {
    try {
      const uptimeInSeconds = process.uptime();

      const days = Math.floor(uptimeInSeconds / 86400);
      const hours = Math.floor((uptimeInSeconds % 86400) / 3600);
      const minutes = Math.floor((uptimeInSeconds % 3600) / 60);

      const uptimeString = `${days} أيام ${hours} ساعة ${minutes} دقيقة`;

      const pingStart = Date.now();
      await api.sendMessage({ body: " ⏱️ |جاري التحقق من حالة البوت يرجى الإنتظار..." }, event.threadID);
      const pingEnd = Date.now();
      const ping = Math.floor((pingEnd - pingStart) / 10); 

      const isStable = ping < 110;  

      const memoryUsage = (os.totalmem() - os.freemem()) / (1024 ** 2); 

      let statusMessage = "البوت يعمل بشكل سلس 🚀";
      if (!isStable) {
        statusMessage = "يواجه البوت حاليًا بعض المشاكل ⚠";
      }

      let uptimeGreeting = "Greetings!"; 
      if (days > 5) {
        uptimeGreeting = " 🤩 | مثير للأعجاب البوت يعمل ننذ 5 أيام";
      } else if (days > 2) {
        uptimeGreeting = " هذا رائع البوت يبدو في حالة جيدة 😉";
      } else if (days > 1 || (days === 1 && hours >= 1)) {
        uptimeGreeting = "مسرور لرؤيتك مجددا البوت قد كان يعمل منذ يوم 😁";
      } else if (hours >= 12) {
        uptimeGreeting = "البوت كان يعمل لمدة 12 ساعة هذا مثير للإعجاب 😗";
      } else if (hours >= 6) {
        uptimeGreeting = "نصف يوم يبدو أن البوت في تقدم جيد 😘";
      } else if (hours >= 3) {
        uptimeGreeting = "ثلاث ساعات هذا شيء جيد ☺️";
      } else if (hours >= 1) {
        uptimeGreeting = "مسرور لرؤيتك مجددا لقد كان يعمل منذ ساعة 😏";
      } else if (minutes > 30) {
        uptimeGreeting = "نصف ساعة قد مرت ولازال يعمل 😗";
      } else if (minutes > 15) {
        uptimeGreeting = "ربع ساعة هذا شيء مبهر 🙃";
      } else if (minutes > 5) {
        uptimeGreeting = "البوت لقد بدأ العمل للتو منذ 5 دقائق 😌";
      } else if (minutes > 1) {
        uptimeGreeting = "دقيقة قد مرت وقد بدأ فقط لعو العمل 😅";
      } else {
        uptimeGreeting = " أهلا لقد بدأ البوت بالعمل للتو 🙂";
      }

      const additionalMessages = [
        "إستمتع بوقتك مع ميدوريا",
        "أشعر بحرية في إستخدامي",
        "إستمتع بالذكاء الإصطناعي مع ميدوريا !",
        "هل تعرف أن البوت بحب البرمجة",
        "شكرا على أستضافتي في مجموعتكم",
        "هل أنت جاهز لإستعمال بعض الأوامر المدهشة",
        "حقائق ممتعة : يمكنني أن أقول لك نكات",
        "تحتاج إلى مساعدة ? أنا هنا للمساعدة !",
      ];

      const randomAdditionalMessage = additionalMessages[Math.floor(Math.random() * additionalMessages.length)];

      const replyMessage = `🤖 مدة التشغيل : ${uptimeString}\n🚦 الحالة : ${statusMessage}\n🕒 الوقت: ${ping} ميلي ثانية\n💾 الذاكرة المستخدمة : ${memoryUsage.toFixed(2)} ميغابايت\n\n${uptimeGreeting}\n\n🌟 ${randomAdditionalMessage}`;

      message.reply(replyMessage);
    } catch (error) {
      console.error(error);
      message.reply("Error getting uptime and ping.");
    }
  },
};