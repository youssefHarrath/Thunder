const cron = require('node-cron');
const axios = require("axios");
const request = require('request');
const fs = require("fs");

const activeThreads = {};

module.exports = {
  config: {
    name: "شوتي_تلقائي",
    author: "Cliff",//owner of api lib_Pogi
    version: "1.0.0",
    role: 2,
    shortDescription: "يرسل فيديوهات لفتيات في التيك توك كل خمس دقائق",
    longDescription: "يرسل فيديوهات لفتيات التيك توك كل خمس دقائق",
    category: "وسائط",
    guide: "{pn}"
  },
  onStart: async function({ api, event, input }) {
    const args = event.body.split(" ");
    const threadID = event.threadID;

    if (args[1] === "تشغيل") {
      if (!activeThreads[threadID]) {
        activeThreads[threadID] = true;
        api.sendMessage(` ✅ | تم تفعيل مود إرسال شوتي_تلقائي وسيتم إرسال فيديوهات لفتيات التيك توك كل خمس دقائق`, event.threadID);
        cron.schedule('*/5 * * * *', async () => {
          try {
            if (activeThreads[threadID]) {
              let response = await axios.post(
                "https://shoti-server-v2.onrender.com/api/v1/get",
                {
                  apikey: "$shoti-1hnqbk45ppatrh94fi8",
                }
              );

              const data = response.data.data;

              const username = data.user.username;
              const nickname = data.user.nickname;
              const duration = data.duration;
              const tid = event.threadID;

              var file = fs.createWriteStream(__dirname + "/cache/shoti.mp4");
              var rqs = request(encodeURI(data.url));
              rqs.pipe(file);

              file.on('finish', () => {
                api.sendMessage(
                  {
                    body: ` ⚜️ | فيديو كل خمس دقائق\n\nإسم المستخدم: ${username}\nاللقب : ${nickname}\n المدة : ${duration}\nمعرف المجموعة : ${tid}`,
                    attachment: fs.createReadStream(__dirname + '/cache/shoti.mp4')
                  },
                  threadID,
                  (error, info) => {
                    if (!error) {
                      fs.unlinkSync(__dirname + '/cache/shoti.mp4');
                    }
                  }
                );
              });
            }
          } catch (error) {
            console.error('Error:', error);
          }
        });
      } else {
        api.sendMessage(" ⚠️ | تم تشغيل مود شوتي_تلقائي بالفعل وهو قيد إرسال لفيديو لفتيات التيك توك كل خمس دقائق", threadID);
      }
    } else if (args[1] === "إيقاف") {
      if (activeThreads[threadID]) {
        activeThreads[threadID] = false;
        api.sendMessage(` ❌ | تم تعطيل مود شوتي_تلقائي وسيتم إيقاف إرسال الفيديوهات بشكل تلقائي`, threadID);
      } else {
        api.sendMessage(" ❌ | تم إيقاف مود شوتي_تلقائي بالفعل لذالك لن يتم إرسال أي فيديو", threadID);
      }
    }
  }
};