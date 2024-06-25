module.exports = {
 config: {
 name: "أغنية",
 version: "1.0",
 role: 0,
 author: "kshitiz",
 cooldowns: 5,
 shortdescription: "موسيقى من يوتيوب",
 longdescription: "",
 category: "وسائط",
 usages: "{pn} إسم الأغنية",
 dependencies: {
 "fs-extra": "",
 "request": "",
 "axios": "",
 "ytdl-core": "",
 "yt-search": ""
 }
 },

 onStart: async ({ api, event }) => {
 const axios = require("axios");
 const fs = require("fs-extra");
 const ytdl = require("ytdl-core");
 const request = require("request");
 const yts = require("yt-search");

 const input = event.body;
 const text = input.substring(12);
 const data = input.split(" ");

 if (data.length < 2) {
 return api.sendMessage(" ⚠️ | أرحوك قم قم بإدخال إسم الأغنية.", event.threadID);
 }

 data.shift();
 const musicName = data.join(" ");

 try {
 api.sendMessage(`✔ | جاري البحث عن الأغنية المطلوبة "${musicName}".\ المرجو الإنتظار...`, event.threadID);

 const searchResults = await yts(musicName);
 if (!searchResults.videos.length) {
 return api.sendMessage(" ⚠️ | إنتبه من المتوقع ألا يتم تنزيل الأغنية.", event.threadID, event.messageID);
 }

 const music = searchResults.videos[0];
 const musicUrl = music.url;

 const stream = ytdl(musicUrl, { filter: "audioonly" });

 const fileName = `${event.senderID}.mp3`;
 const filePath = __dirname + `/cache/${fileName}`;

 stream.pipe(fs.createWriteStream(filePath));

 stream.on('response', () => {
 console.info('[DOWNLOADER]', 'Starting download now!');
 });

 stream.on('info', (info) => {
 console.info('[DOWNLOADER]', `Downloading music: ${info.videoDetails.title}`);
 });

 stream.on('end', () => {
 console.info('[DOWNLOADER] Downloaded');

 if (fs.statSync(filePath).size > 26214400) {
 fs.unlinkSync(filePath);
 return api.sendMessage('❌ | تعذر إرسال الملف لأن حجمه أكبر من 25 ميغابايت.', event.threadID);
 }

 const message = {
 body: ` ✅ | تم التحميل \n ❀ العنوان : ${music.title}\ المدة : ${music.duration.timestamp}`,
 attachment: fs.createReadStream(filePath)
 };

 api.sendMessage(message, event.threadID, () => {
 fs.unlinkSync(filePath);
 });
 });
 } catch (error) {
 console.error('[ERROR]', error);
 api.sendMessage('🥱 ❀ حدث خطأ أثناء معالجة الأمر\nتحدث هذه الأخطاء عادة تعود عليها انا كسول لأكمل الشرح.', event.threadID);
 }
 }
};