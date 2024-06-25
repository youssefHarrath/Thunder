const axios = require('axios');

module.exports = {
  config: {
    name: "مكة",
    aliases: ["moqqa"],
    version: "1.0",
    author: "JARiF",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "Lấy hình ảnh ngẫu nhiên",
      en: "قم بالحصول على مجموعه من الصور"
    },
    longDescription: {
      vi: "Lấy hình ảnh ngẫu nhiên từ danh sách đã định nghĩa",
      en: "قم بالحصول على مجموعه متنوعة من الصور"
    },
    category: "إسلام",
    guide: {
      vi: "{pn}",
      en: "{pn}"
    }
  },

  getRandomImage: function () {
    const images = [
      "https://i.imgur.com/cbDc9Vk.png",
      "https://i.imgur.com/kzvGfx3.png",
      "https://i.imgur.com/YjklXrx.png",
      "https://i.imgur.com/BacP91h.png",
      "https://i.imgur.com/nguI7kP.png",
      "https://i.imgur.com/4CODj4B.png"
    ];

    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  },

  onStart: async function ({ message }) {
    try {
      const imageUrl = this.getRandomImage();

      return message.reply({
        attachment: await global.utils.getStreamFromURL(imageUrl)
      });
    } catch (error) {
      console.error("حدث خطأ أثناء استرداد صورة waifu:", error);
      return message.reply("حدث خطأ أثناء معالجة طلبك.");
    }
  }
};