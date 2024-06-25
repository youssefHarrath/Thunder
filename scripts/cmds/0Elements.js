const fs = require('fs');

module.exports = {
  config: {
    name: "عناصر",
    version: "1.0",
    author: "حسين يعقوبي",
    countDown: 60,
    role: 0,
    shortDescription: "احصل على معلومات عن عناصر مختلفة",
    longDescription: "احصل على معلومات عن عناصر مختلفة مثل النار، الهواء، الأرض، الماء، الشمس، الأشجار، والحجر.",
    category: "معلومات",
  },

  onStart: async function ({ message, getLang }) {
    try {
      const furryData = JSON.parse(fs.readFileSync('furry.json'));
      const element = furryData[Math.floor(Math.random() * furryData.length)];

      // Construct and send the information about the selected element
      const elementInformation = `❏ العنصر: ${element.name}\n❏ الصورة: ${element.image}\n❏ الوصف: ${element.description}\n❏ التقييم: ${element.rating}`;

      message.reply({
        body: elementInformation,
        attachment: await global.utils.getStreamFromURL(element.image)
      });
    } catch (error) {
      console.error(error);
      message.reply("حدث خطأ أثناء جلب معلومات العناصر.");
    }
  }
};
