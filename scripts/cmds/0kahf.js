const fs = require('fs');
const moment = require("moment-timezone");
const axios = require('axios');

module.exports = {
  config: {
    name: "كهف",
    version: "1.1",
    author: "NTKhang | Aesther",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "Nhận quà hàng ngày",
      en: "قم بالعمل في الكهوف و تلقى أجرا"
    },
    longDescription: {
      vi: "Nhận quà hàng ngày",
      en: "قم بإشتغال في الكهوف و تلقى أجرا"
    },
    category: "إقتصاد",
    guide: {
      vi: "   {pn}: Nhận quà hàng ngày" + "\n   {pn} info: Xem thông tin quà hàng ngày",
      en: "   {pn}" + "\n   {pn} معلومات: قم برؤية معلومات الهدية"
    },
    envConfig: {
      rewardFirstDay: {
        coin: 100,
        exp: 10
      }
    }
  },

  langs: {
    en: {
      cooldown: " ⚠️ |لقد عملت اليوم، لتجنب الإرهاق يرجى العودة غدا",
      rewarded: "لقد قمت بالمهمة: %1 واستلمتها: %2$."
    }
  },

  onStart: async function ({ args, message, event, envCommands, usersData, commandName, getLang }) {
    try {
      const kahfData = JSON.parse(fs.readFileSync('kahf.json'));
      const selectedCountry = kahfData[Math.floor(Math.random() * kahfData.length)];

      const reward = envCommands[commandName].rewardFirstDay;
      const dateTime = moment.tz("Africa/Casablanca").format("DD/MM/YYYY");
      const { senderID } = event;
      const userData = await usersData.get(senderID);
      
      if (userData.data.lastTimeGetReward === dateTime)
        return message.reply(getLang("cooldown"));

      userData.data.lastTimeGetReward = dateTime;
      await usersData.set(senderID, {
        money: userData.money + reward.coin,
        data: userData.data
      });

      // Get stream from the URL of the country's image
      const imageStream = await global.utils.getStreamFromURL(selectedCountry.image);

      message.reply({
        body: `❏أنت إشتغلت بالكهوف في 『${selectedCountry.name}』\n❏و قد حصلت على 『${reward.coin}』 دولار 💵`,
        attachment: imageStream
      });
    } catch (error) {
      console.error(error);
      message.reply("حدث خطأ أثناء جلب معلومات الدولة.");
    }
  }
};
