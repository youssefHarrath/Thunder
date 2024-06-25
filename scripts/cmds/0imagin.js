module.exports = {
  config: {
    name: "تخيل2",
    version: "1.0",
    author: "Kp Sharma Oli",
    shortDescription: {
      en: "إنشاء صور من خلال الوصف."
    },
    longDescription: {
      en: "إنشاء صور من خلال الوصف."
    },
    category: "الذكاء الإصطناعي",
    role: 0,
    guide: {
      en: "{pn} الوصف",
      vi: "{pn}"
    }
  },

  onStart: async function ({ api, event, args }) {
    const axios = require('axios');
    const fs = require('fs-extra');

    // Translate the text from Arabic to English
    const query = args.join(" ");
    try {
      const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=ar&tl=en&dt=t&q=${encodeURIComponent(query)}`);
      const translatedQuery = translationResponse?.data?.[0]?.[0]?.[0];

      if (!translatedQuery) {
        throw new Error("Translation failed or returned null.");
      }

      const { threadID, messageID } = event;
      let path = __dirname + `/assets/poli.png`;
      const poli = (await axios.get(`https://image.pollinations.ai/prompt/${translatedQuery}`, {
        responseType: "arraybuffer",
      })).data;

      fs.writeFileSync(path, Buffer.from(poli, "utf-8"));

      api.setMessageReaction("✅", event.messageID, (err) => {}, true);

      api.sendMessage({
        body: " ✅ | تم توليد الصورة بنجاح \n ⚠️ | ستحذف الصورة بعد ساعة",
        attachment: fs.createReadStream(path)
      }, threadID, () => fs.unlinkSync(path), messageID);
    } catch (error) {
      console.error(error);
      api.sendMessage(" ⚠️ |  خطأ قم بإدخال وصف", event.threadID);
    }
  }
};
