const axios = require("axios");
const fs = require('fs-extra');
const path = require('path');
const ytdl = require("ytdl-core");
const yts = require("yt-search");

async function sing(api, event, args, message) {
    api.setMessageReaction("🕢", event.messageID, (err) => {}, true);
    try {
        let title = '';

        const extractShortUrl = async () => {
            const attachment = event.messageReply.attachments[0];
            if (attachment.type === "video" || attachment.type === "audio") {
                return attachment.url;
            } else {
                throw new Error("Invalid attachment type.");
            }
        };

        if (event.messageReply && event.messageReply.attachments && event.messageReply.attachments.length > 0) {
            const shortUrl = await extractShortUrl();
            const musicRecognitionResponse = await axios.get(`https://youtube-music-sooty.vercel.app/kshitiz?url=${encodeURIComponent(shortUrl)}`);
            title = musicRecognitionResponse.data.title;
        } else if (args.length === 0) {
            message.reply(" ⚠️ | المرجو إدخال إسم الأغنية");
            return;
        } else {
            title = args.join(" ");
        }

        const searchResults = await yts(title);
        if (!searchResults.videos.length) {
            message.reply(" ⚠️ | لم يتم إيجاد الأغنية أو الكلمات للكلمة المعطى");
            return;
        }

        const videoUrl = searchResults.videos[0].url;
        const stream = ytdl(videoUrl, { filter: "audioonly" });

        const fileName = `lado.mp3`;
        const filePath = path.join(__dirname, "cache", fileName);
        const writer = fs.createWriteStream(filePath);

        stream.pipe(writer);

        writer.on('finish', async () => {
            const audioStream = fs.createReadStream(filePath);

           
            const lyricsResponse = await axios.get(`https://lyrist.vercel.app/api/${encodeURIComponent(title)}`);
            const { lyrics } = lyricsResponse.data;

          
            const messageBody = `🎧 تشغيل : ${title}\n\n${lyrics}`;

            
            message.reply({ body: messageBody, attachment: audioStream });

            api.setMessageReaction("✅", event.messageID, () => {}, true);
        });

        writer.on('error', (error) => {
            console.error("Error:", error);
            message.reply("حدث خطأ أثناء معالجة الأغنية.");
        });
    } catch (error) {
        console.error("Error:", error);
        message.reply("حدث خطأ أثناء معالجة الأغنية.");
    }
}

module.exports = {
    config: {
        name: "كلمات",
        version: "1.0",
        author: "Vex_Kshitiz",
        countDown: 10,
        role: 0,
        shortDescription: "قم بتشغيل الأغاني مع الكلمات",
        longDescription: "قم بتشغيل الأغاني مع الكلمات.",
        category: "وسائط",
        guide: "{p] كلمات إسم الأغنية"
    },
    onStart: function ({ api, event, args, message }) {
        return sing(api, event, args, message);
    }
};