const fs = require("fs-extra");
const axios = require("axios");

module.exports = {
  
  threadStates: {},

  config: {
    name: 'تيك_تلقائي',
    version: '1.0',
    author: 'Kshitiz',
    countDown: 5,
    role: 0,
    shortDescription: 'تنزيل تلقائي لفيديوهات التيك توك',
    longDescription: '',
    category: 'وسائط',
    guide: {
      en: '{p}{n}',
    }
  },
  onStart: async function ({ api, event }) {
    const threadID = event.threadID;

    
    if (!this.threadStates[threadID]) {
      this.threadStates[threadID] = {
        autoTikEnabled: false,
      };
    }

    
    if (event.body.toLowerCase().includes('autotik')) {
    
      if (event.body.toLowerCase().includes('تشغيل')) {
       
        this.threadStates[threadID].autoTikEnabled = true;
        api.sendMessage(" ✅ | تم تشغيل التلقائي لفيديوهات التيك توك عن طريق الرابط .", event.threadID, event.messageID);
      } else if (event.body.toLowerCase().includes('إيقاف')) {
       
        this.threadStates[threadID].autoTikEnabled = false;
        api.sendMessage(" ❎ | تم تعطيل التنزيل التلقائي لفيديوهات التيك توك عبر رابط .", event.threadID, event.messageID);
      } else {
  
        api.sendMessage(" ⚠️ | إستخدم 'تيك_تلقائي تشغيل' من أجل تشغيل \n'تيك_تلقائي إيقاف' من اجل الإيقاف.", event.threadID, event.messageID);
      }
    }
  },
  onChat: async function ({ api, event }) {
    const threadID = event.threadID;

    
    if (this.threadStates[threadID] && this.threadStates[threadID].autoTikEnabled && this.checkLink(event.body)) {
      var { url } = this.checkLink(event.body);
      this.downLoad(url, api, event);
      api.setMessageReaction("✅", event.messageID, (err) => {}, true);
    }
  },
  downLoad: function (url, api, event) {
    var time = Date.now();
    var path = __dirname + `/cache/${time}.mp4`;
    this.getLink(url).then(res => {
      axios({
        method: "GET",
        url: res,
        responseType: "arraybuffer"
      }).then(res => {
        fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
        if (fs.statSync(path).size / 1024 / 1024 > 25) {
          return api.sendMessage(" ❌ | عذرا لكن الفيدو كبير جدا لتحميله و إرساله", event.threadID, () => fs.unlinkSync(path), event.messageID);
        }
        api.sendMessage({
          body: "تم تحميل الفيديو بنجاح ✅",
          attachment: fs.createReadStream(path)
        }, event.threadID, () => fs.unlinkSync(path), event.messageID);
      }).catch(err => console.error(err));
    }).catch(err => console.error(err));
  },
  getLink: function (url) {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: `https://api.nayan-project.repl.co/tiktok/downloadvideo?url=${url}`
      }).then(res => resolve(res.data.data.play)).catch(err => reject(err));
    });
  },
  checkLink: function (url) {
    if (url.includes("tiktok")) {
      return {
        url: url
      };
    }
    return null;
  }
};