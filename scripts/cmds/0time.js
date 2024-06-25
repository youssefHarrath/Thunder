const axios = require('axios');

module.exports = {
  config: {
    name: "الوقت",
    aliases: [],
    author: "kshitiz",  
    version: "2.0",
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: "معرفة المنطقة الزمنية لأي مدينة"
    },
    category: "خدمات",
    guide: {
      en: "{p}{n} إسم المدينة"
    }
  },
  onStart: async function ({ api, event, args }) {
    
    const cityName = args.join(' ');

    if (!cityName) {
      api.sendMessage(" ⚠️ |المرحو إدخال إسم مدينة من أجل رؤية الوقت الحالي بها.", event.threadID, event.messageID);
      return;
    }

   
    try {
      const apiKey = '0Hr3RnpBTgQvQ9np4ibDrQ==CkYJq9yAT5yk6vIn'; // add your own apikey
      const apiUrl = `https://api.api-ninjas.com/v1/worldtime?city=${encodeURIComponent(cityName)}`;
      const response = await axios.get(apiUrl, { headers: { 'X-Api-Key': apiKey } });

    
      const { timezone, datetime, day_of_week, year, month } = response.data;

   
      const currentTime = datetime.split(' ')[1]; 
      const message = `المنطقة الزمنية ل: ${timezone}\nالوقت الحالي: ${currentTime}\nالسنة:${year}\nالشهؤ:${month}\nاليوم: ${day_of_week}`;
      api.sendMessage(message, event.threadID, event.messageID);
    } catch (error) {
 
      api.sendMessage("حدث خطأ أثناء قم بجلب معلومات الوقت \nأضف مفتاح واجهة برمجة التطبيقات الخاص بك في التعليمات البرمجية", event.threadID, event.messageID);
    }
  },
};

/*
in future if code stop working 
add your own apikey in code there is guide
you can get apikey from ninja pai web
*/