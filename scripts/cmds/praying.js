const axios = require('axios');
 
module.exports = {
  config: {
    name: "حديث",
    aliases: ["bukhari","حديث","بخاري","হাদীস"],
    version: "1.0",
    author: "mahim",
    countDown: 5,
    role: 0,
    shortDescription: "الحديث من صحيح البخاري",
    longDescription: "الحديث من صحيح البخاري",
    category: "إسلام",
    guide: "{pn}"
  },
 
  async onStart({ message, args }) {
    try {
      const response = await axios.get('https://api.simsimipro.xyz/v1/hadith/bukhari');
      const { author, hadithNo, edition, arabicHadith, banglaHadith, englishHadith } = response.data;
      const messageText = `حديث : ${hadithNo}\nالتحرير: ${edition}\n${arabicHadith.replace(/\n/g, "")}\n${banglaHadith.replace(/\n/g, "")}\n${englishHadith.replace(/\n/g, "")}\n\nالمؤلف: ${author}`;
      message.reply(messageText);
    } catch (error) {
      message.reply('عفوا لقد حصل خطأ');
      console.error(error);
    }
  }
};