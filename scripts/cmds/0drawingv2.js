const fs = require("fs");
const axios = require("axios");

module.exports = {
  config: {
    name: "أنمي3",
    aliases: [],
    author: "kshitiz",
    version: "1.0",
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: "قم بالحصول على صور انمي عشوائية"
    },
    category: "أنمي",
    guide: {
      en: ""
    }
  },
  onStart: async function ({ api, event }) {
    let path = __dirname + "/cache/anipic_image.png";

    let tid = event.threadID;
    let mid = event.messageID;

    try {
      // Send a reaction before fetching the image
      api.setMessageReaction("✅", mid, () => { }, true);

      let response = await axios.get("https://pic.re/image", { responseType: "stream" });

      if (response.data) {
        let imageResponse = response.data;
        imageResponse.pipe(fs.createWriteStream(path));

        imageResponse.on("end", () => {
          // Remove the reaction after sending the image
          api.setMessageReaction("", mid, () => { }, true);
          api.sendMessage({ attachment: fs.createReadStream(path) }, tid, () => fs.unlinkSync(path), mid);
        });
      } else {
        // Remove the reaction if failed to fetch the image
        api.setMessageReaction("", mid, () => { }, true);
        return api.sendMessage("Failed to fetch random anime picture. Please try again.", tid, mid);
      }
    } catch (e) {
      // Remove the reaction if an error occurs
      api.setMessageReaction("", mid, () => { }, true);
      return api.sendMessage(e.message, tid, mid);
    }
  }
};
