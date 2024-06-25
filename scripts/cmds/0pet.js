const axios = require("axios");
const { getStreamFromURL } = global.utils;


const models = {
  "1": "أنيمي الأولي",
  "2": "الحرتون الأولي",
  "3": "نمط الأنمي: زي الخادمة",
  "4": "نمط الأنمي: فاتنة الشاطئ",
  "5": "نمط الأنمي: خيال حلو",
  "6": "نمط الأنمي: قصة حب كوميدية",
  "7": "نمط الأنمي: ذكريات المدرسة الثانوية",
  "8": "نمط الأنمي: عيد الميلاد الاحتفالي",
  "9": "فن الأنمي: مغامرة القراصنة ( ونبيس)",
  "10": "فن الأنمي: إحساس نجم البوب ​​(أومشي نوحو)",
  "11": "فن الأنمي: تراث النينجا (ناروتو )",
  "12": "فن الأنمي: سوبر ووريورز ( دراغون بول زيد )",
  "13": "فن الأنمي: دفتر الظلام (مذكرة الموت )",
  "14": "فن الأنمي: المعركة الأبدية ( بليتش )",
  "15": "فن الأنمي: أجنحة القدر ( أوت )",
  "16": "فن الأنمي : الخطأ السحري  (جوجيتسو كايسن)",
  "17": "فن الأنمي: معجزة التنس (أمير التنس).)",
  "18": "فن الأنمي: سجلات قاتل الشياطين (قاتل الشياطين)",
  "19": "فن الرسوم المتحركة: مغامرات كيميائية (الكيميائي المعدني الكامل)",
  "20": "فن الأنمي: المستقبل البطولي (أكاديمية بطلي).)",
  "21": "فن الأنمي: مهمة ما قبل التاريخ (دكتور ستون)",
  "22": "فن الأنمي: صراع المحكمة (هايكيو)"
};

module.exports = {
  config: {
    name: "تحويل_إلى_أنمي",
    version: "1.0",
    author: "SiAM",// Don't change 
    countDown: 15,
    role: 0,
    shortDescription: "قم بتحويل نفسك إلى شخصبة أنمي",
    longDescription: "تقوم بتحويل الشخص إلى شخصية انمي بفضل فيلتر.",
    category: "خدمات",
    guide: {
      en: "{pn} [رقم النموذج]\nمثال : {pn} 2\n\nوهنا النماذج المتاحة:\n" + Object.entries(models).map(([number, name]) => `❏ ${number} : ${name}`).join("\n")
    }
  },

  onStart: async function ({ api, args, message, event }) {
    try {
      if (args[0] === "قائمة") {
            const modelList = Object.entries(models).map(([number, name]) => `❏ ${number} : ${name}`).join("\n");
            return message.reply("⚜️ | أليك قائمة النماذج المتاحة :\n" + modelList);
      }
      const [modelNumber] = args;

      if (!modelNumber || isNaN(modelNumber) || !models[modelNumber]) {
        return message.reply(" ⚠️ | النموذج اللذي أدخلته غير موجود في القائمة .\n\nأكتب : ©تحويل_إلى_أنمي قائمة\nلترى كل النماذج المتاحة");
      }

      if (!(event.type === "message_reply" && event.messageReply.attachments && event.messageReply.attachments.length > 0 && ["photo", "sticker"].includes(event.messageReply.attachments[0].type))) {
        return message.reply("يرجى الرد على الصورة لتطبيق فيلتر الأنمي على الصورة.⚠");
      }

      const imageUrl = event.messageReply.attachments[0].url;
      const encodedImageUrl = encodeURIComponent(imageUrl);

      const processingMessage = message.reply(` ⚙️ |جارٍ تطبيق عامل التصفية، برجاء الانتظار...\nالنموذج المستخدم : ${modelNumber} (${models[modelNumber]})\n ⌛ | يرجى الإنتظار...`);

      const response = await axios.get(`https://simoapi-aimirror.onrender.com/generate?imageUrl=${encodedImageUrl}&modelNumber=${modelNumber}`);

      const { imageUrl: generatedImageUrl } = response.data;
      const Stream = await getStreamFromURL(generatedImageUrl);

      await message.reply({
        body: ` ✨ | تم تطبيق فيلتر الأنمي \nالنموذج المستخدم : ${modelNumber} (${models[modelNumber]})`,
        attachment: Stream,
      });

      message.reaction("✅", event.messageID);
      message.unsend((await processingMessage).messageID);

    } catch (error) {
      console.error(error);
      message.reply(" ⚠️ |فشل في تطبيق مرشح الأنيمي.⚠");
    }
  }
};