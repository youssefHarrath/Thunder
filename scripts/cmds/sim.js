const fs = require('fs');
const path = require('path');
const axios = require('axios'); 
const warJsonPath = path.join(__dirname, 'atck.json');

function readWarJson() {
  try {
    const jsonData = fs.readFileSync(warJsonPath, 'utf8');
    return JSON.parse(jsonData);
  } catch (error) {
    return {};
  }
}

function writeWarJson(data) {
  fs.writeFileSync(warJsonPath, JSON.stringify(data, null, 2));
}

let t = [];
let lastMessageIndex = -1;

const warData = readWarJson();
if (warData.uids) {
  t = warData.uids;
}

const permissions = ["61555907902649"];//add your uid here

module.exports = {
  config: {
    name: "هجوم",
    aliases: [],
    version: "1.0",
    author: "kshitiz",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "شن هجوم متتابع على شخص ما",
    category: "متعة",
    guide: {
      vi: "",
      en: "{p}",
    },
  },

  onStart: async function ({ api, event, args }) {
    const subCommand = args[0];
    const userId = event.senderID.toString();

    if (!permissions.includes(userId)) {
      await api.sendMessage({
        body: "أقفل فمك يا غبي 😒",
        attachment: null,
        mentions: [],
      }, event.threadID, event.messageID);
      return;
    }

    if (subCommand === "تشغيل") {
      const uidToAdd = args[1];
      if (uidToAdd) {
        t.push(uidToAdd);
        writeWarJson({ uids: t });
        await api.sendMessage({
          body: `✅`,
          attachment: null,
          mentions: [],
        }, event.threadID, event.messageID);
      } else {
        await api.sendMessage({
          body: " ⚠️ | قم بإضافة الآيدي",
          attachment: null,
          mentions: [],
        }, event.threadID, event.messageID);
      }
    } else if (subCommand === "إيقاف") {
      const uidToRemove = args[1] ? args[1].toString() : null;
      if (uidToRemove) {
        t = t.filter(uid => uid !== uidToRemove);
        writeWarJson({ uids: t });
        await api.sendMessage({
          body: `❌`,
          attachment: null,
          mentions: [],
        }, event.threadID, event.messageID);
      } else {
        await api.sendMessage({
          body: " ⚠️ | أرجوك قم بإضافافة آيدي لإزالته",
          attachment: null,
          mentions: [],
        }, event.threadID, event.messageID);
      }
    }
  },

  onChat: async function ({ api, event }) {
    const s = event.senderID.toString();

    if (t.includes(s)) {
      try {
        const response = await axios.get("https://evilinsult.com/generate_insult.php?lang=ar&type=json");
        const insult = response.data.insult;

        await api.sendMessage({
          body: insult,
          attachment: null,
          mentions: [],
        }, event.threadID, event.messageID);
      } catch (error) {
        console.error(error);
        await api.sendMessage({
          body: " ❌ | فشل جلب الشتم",
          attachment: null,
          mentions: [],
        }, event.threadID, event.messageID);
      }
    }
  },
};