const axios = require('axios');

module.exports = {
  config: {
    name: 'قهوة',
    version: '1.0',
    author: 'Finn',
    role: 0,
    longDescription: 'يرسل صورة قهوة عشوائية',
    category: 'متعة',
    guide: {en:'{p}قهوة'},
  },

  onStart: async function ({ api, event }) {
    try {
      const apiUrl = 'https://coffee.alexflipnote.dev/random.json';
      const response = await axios.get(apiUrl);
      const coffeeImageUrl = response.data.file;
      const caption = 'قم بالاستمتاع بالقهوة الصباحية ☕ ';
      api.sendMessage({ attachment: await global.utils.getStreamFromURL(coffeeImageUrl), body: caption }, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage('حدث خطأ أثناء جلب صورة القهوة.', event.threadID);
    }
  },
};