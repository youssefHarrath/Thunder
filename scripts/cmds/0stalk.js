module.exports = {
  config: {
    name: "معلومات",
    version: "1.0.0",
    author: "Eugene Auguilar",//converted
    countDown: 5,
    role: 0,
    shortDescription: "ستالك",
    longDescription: "قم برؤية معلومات بإستخدام منشن رد على رسالة أو .",
    category: "معلومات",
    guide: {
      en: "{p} <الأمر>"
    }
  },
    
onStart: async function({ api, event, args, utils, Users, Threads }) {
    try {
        const axios = require('axios');
        const fs = require("fs-extra");
        const request = require("request");
        const { threadID, senderID, messageID } = event;

        let id;
        if (args.join().indexOf('@') !== -1) {
            id = Object.keys(event.mentions);
        } else {
            id = args[0] || event.senderID;
        }

        if (event.type == "message_reply") {
            id = event.messageReply.senderID;
        }

        const res = await axios.get(`https://eurix-api.replit.app/info?uid=${id}`);
        const { username, name, gender, relationship, love, uid, link, followers, birthday, hometown, location } = res.data;
        const avatar = `https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;

        const callback = function() {
            return api.sendMessage({
                body: `•——[معلومات]——•\n\nالإسم : ${name}\nرابط.الفيسبوك : ${link}\nإسم المستخدم أو المعرف: ${username}\nتاريخ الإزدياد : ${birthday}\nالمتابعون : ${followers}\nالنوع : ${gender}\nآيدي : ${uid}\nالموقع : ${location}\nمسقط الرأس : ${hometown}\nالحالة الإجتماعية : ${relationship}\nفي علاقة مع : ${love}\n\n•——[معلومات]——•`,
                attachment: fs.createReadStream(__dirname + `/cache/image.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/image.png`), event.messageID);
        };

        return request(encodeURI(avatar)).pipe(fs.createWriteStream(__dirname + `/cache/image.png`)).on("close", callback);
    } catch (err) {
        console.log(err);
        return api.sendMessage(`Error`, event.threadID);
     }
  },
};