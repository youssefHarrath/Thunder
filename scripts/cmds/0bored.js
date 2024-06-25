const axios = require("axios");

module.exports = {
    config: {
        name: "ملل",
        version: "1.0",
        author: "SiAM",
        countdown: 2,
        role: 0,
        category: "خدمات",
        ShortDescription: "قم بالحصول على إقتراح لنشاك ما حين تشعر بالملل",
        LongDescription: "سيقترح عليك البوت نشاطًا يمكنك القيام به عندما تشعر بالملل.",
        guide: {
            en: "أكتب {pn} للحصول على إقتراح للقيام بشيء ما عندما تشعر بالملل."
        }
    },

    onStart: async function({ api, args, message }) {
        try {
            const response = await axios.get("http://www.boredapi.com/api/activity/");
            const activity = response.data.activity;

            // Translate the activity to Arabic
            const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(activity)}`);
            const translatedText = translationResponse.data[0][0][0];

            message.reply(`إذا أنت تشعر بالملل\n مارأيك بالقيام ب ${translatedText}?`);
        } catch (error) {
            message.reply(" ❌ |عذرًا، واجهة برمجة التطبيقات (API) لا تستجيب. الرجاء معاودة المحاولة في وقت لاحق.");
        }
    }
};
