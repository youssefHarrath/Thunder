const axios = require("axios");
const { getStreamFromURL } = global.utils;

module.exports = {
    config: {
        name: "نيجي",
        aliases: ["nijijourneyx"],
        version: "1.0",
        author: "SiAM | Turtle APIs",
        countDown: 5,
        role: 0,
        longDescription: "نص إلى صورة",
        category: "الذكاء الإصطناعي",
        guide: {
            en: "{pn} وصف --ar [نسبة] أو رد على صورة\n\n مثال : {pn} 1فتاة، وجه لطيف، تحفة، أفضل نوعية --ar 16:9\n[ الأصل 1:1 ]"
        }
    },

    onStart: async function({ api, args, message, event }) {
        try {
            
            let prompt = "";
            let imageUrl = "";
            let aspectRatio = ""; 

            const aspectIndex = args.indexOf("--ar");
            if (aspectIndex !== -1 && args.length > aspectIndex + 1) {
                aspectRatio = args[aspectIndex + 1];
                args.splice(aspectIndex, 2); 
            }

            if (event.type === "message_reply" && event.messageReply.attachments && event.messageReply.attachments.length > 0 && ["photo", "sticker"].includes(event.messageReply.attachments[0].type)) {
                imageUrl = encodeURIComponent(event.messageReply.attachments[0].url);
            } else if (args.length === 0) {
                message.reply(" ⚠️ | المرجو إدخال الوصف أو الرد على الصورة.");
                return;
            }
            
            if (args.length > 0) {
                prompt = await translateToEnglish(args.join(" "));
            }

            
            let apiUrl = `https://project-niji.onrender.com/api/v1/generate?prompt=${encodeURIComponent(prompt)}.&aspectRatio=${aspectRatio}&apikey=rehat`;
            if (imageUrl) {
                apiUrl += `&imageUrl=${imageUrl}`;
            }

            const processingMessage = await message.reply(" ⏱️ | جاري المعالجة يرجى الإنتظار....");
            message.reaction("⏱️", event.messageID);

            const response = await axios.post(apiUrl);
            const img = response.data.url;

            const downloadLink = `✿━━━━━━━━━━━━━━━━━✿\n 🌟 | نتيجة الوصف \nتم التحميل ✅ :\n✿━━━━━━━━━━━━━━━━━✿ ${img}`;
            await message.reply({
                body: downloadLink,
                attachment: await getStreamFromURL(img)
            });
            message.unsend(processingMessage.messageID);
            await message.reaction("✅", event.messageID);
        } catch (error) {
            console.error(error);
            message.reply(" ❌ | حدث خطأ.");
            message.reaction("❌", event.messageID);
        }
    }
};

async function translateToEnglish(text) {
    try {
        const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=ar&tl=en&dt=t&q=${encodeURIComponent(text)}`);
        return translationResponse?.data?.[0]?.[0]?.[0];
    } catch (err) {
        console.error("Error translating text:", err);
        return text;
    }
}
