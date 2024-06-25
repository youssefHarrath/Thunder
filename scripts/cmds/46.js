const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "جيفي",
    version: "1.0",
    author: "kshitiz",
    role: 0,
    countDown: 10,
    shortDescription: {
      en: "البحث عن الصور المتحركة"
    },
    category: "وسائط",
    guide: {
      en: "{prefix}جيفي أو جيفي -عدد الصور المتحركة"
    }
  },

  onStart: async function ({ api, event, args, usersData }) {
    try {
      const searchQuery = args.join(" ");
      let apiUrl = `https://giphy-search-five.vercel.app/kshitiz?search=${encodeURIComponent(searchQuery)}`;

      let gifIndex = 0;
      const numberIndex = args.findIndex(arg => arg.startsWith("-"));
      if (numberIndex !== -1) {
        gifIndex = parseInt(args[numberIndex].substring(1)) - 1; 
        args.splice(numberIndex, 1);
      }

      const res = await axios.get(apiUrl);
      const data = res.data;

      if (!data || !Array.isArray(data) || data.length === 0) {
        return api.sendMessage(` ⚠️ | لم يتم إيجاد صورة متحركة بالنسبة للكلمة البحث  "${searchQuery}".`, event.threadID, event.messageID);
      }

      if (gifIndex < 0 || gifIndex >= data.length) {
        return api.sendMessage(` ⚠️ | رقم غير صالح.`, event.threadID, event.messageID);
      }

      const selectedGifUrl = data[gifIndex];

      const gifResponse = await axios.get(selectedGifUrl, { responseType: 'arraybuffer' });
      const gifPath = path.join(__dirname, 'cache', `${searchQuery}_selected.gif`);
      await fs.outputFile(gifPath, gifResponse.data);
      const gifData = fs.createReadStream(gifPath);

      await api.sendMessage({
        attachment: gifData,
        body: ``
      }, event.threadID, event.messageID);

      await fs.remove(path.join(__dirname, 'cache'));
    } catch (error) {
      console.error(error);
      return api.sendMessage(` ❌ | حدث خطأ حاول لاحقا`, event.threadID, event.messageID);
    }
  }
};