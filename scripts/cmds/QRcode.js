const qrcode = require('qrcode');
const jimp = require('jimp');
const { createCanvas, loadImage } = require('canvas');
const jsQR = require('jsqr');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "مسح_الكود",
    version: "1.0",
    author: "SiAM",
    countDown: 5,
    role: 0,
    shortDescription : "قم بإنشاء رمز للمسح أو لمسح الرمز",
    longDescription: "سوف يجعلك الروبوت رمز الاستجابة السريعة بناءً على النص الخاص بك، كما يمكنه فك رمز الاستجابة السريعة من صورة كيو آر كود",
    category: "خدمات ",
    guide:{
      en: "\n{pn} قم 'بصنع نصك الخاص'\n{pn} قم بمسح الرمز  (عن طريق الرد على صورة)"
    }
  
  },

  onStart: async function ({ api, args, message, event }) {
    const command = args[0];
    const text = args.slice(1).join(" ");

    if (command === "إنشاء") {
      if (!text) {
        return message.reply("يرجى تقديم النص المراد ترميزه كرمز QR.");
      }

      const filePath = path.join(__dirname, `${Date.now()}.jpeg`);

      try {
        await qrcode.toFile(filePath, text);
        message.reply({
          body: "إليك رمز الاستجابة السريعة الذي طلبته:",
          attachment: fs.createReadStream(filePath),
        }, () => fs.unlinkSync(filePath));
      } catch (error) {
        console.log(error);
        message.reply("حدث خطأ أثناء إنشاء رمز الاستجابة السريعة.");
      }
    } else if (command === "مسح") {
      let imageUrl;

      if (event.type === "message_reply") {
        if (["photo", "sticker"].includes(event.messageReply.attachments[0].type)) {
          imageUrl = event.messageReply.attachments[0].url;
        }
      } else if (args[1]?.match(/(https?:\/\/.*\.(?:png|jpg|jpeg))/g)) {
        imageUrl = args[1];
      } else {
        return message.reply("يرجى تقديم عنوان رابط صالح للصورة أو الرد على الصورة.");
      }

      const decodedText = await decodeQRCode(imageUrl);

      if (decodedText) {
        message.reply(`النص الذي تم فك تشفيره من رمز الاستجابة السريعة هو:\n\n ${decodedText}`);
      } else {
        message.reply("لا يمكن فك رمز الاستجابة السريعة.");
      }
    } else {
      message.reply("إدخال غير صالح ⚠️\nأرحوك قم بإتباع الخطوات التالية:\n©مسح_الكود إنشاء 'النص الخاص بك'\nمسح_الرمز مسح\n\n مثال:\n©مسح_الرمز قم بإنشاء كود الواتساب\n\nمن أجل مسح الرمز فقك قم بالرد على صورة و أكتب:\n©مسح_الرمز مسح");
    }
  },
};

async function decodeQRCode(imageUrl) {
  try {
    const image = await loadImage(imageUrl);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
    const imageData = ctx.getImageData(0, 0, image.width, image.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);
    const decodedText = code ? code.data : null;
    return decodedText;
  } catch (error) {
    console.log(error);
    throw error;
  }
  }
    