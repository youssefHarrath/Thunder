const axios = require("axios");
const fs = require("fs-extra");
const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "بانتريست",
    version: "1.0.0",
    author: "حسين يعقوبي",
    role: 0,
    category: "وسائط",
    shortDescription: {
      en: "قم بالبحث عن صور من موقع بانتريت.",
      vi: "Tìm kiếm và lấy hình ảnh từ Pinterest."
    },
    longDescription: {
      en: "يبحث هذا الأمر عن الصور على موقع بانتريست بناءً على الكلمة الأساسية المتوفرة.",
      vi: "Lệnh này tìm kiếm hình ảnh trên Pinterest dựa trên từ khóa được cung cấp."
    }
  },

  onStart: async function ({ api, event, args }) {
    try {
      const keySearch = args.join(" ");
      if (!keySearch.includes("-")) {
        return api.sendMessage(' ⚠️ |الرجاء إدخال التنسيق، على سبيل المثال:  بانتريست ناروتو - 10 (يعتمد الأمر عليك على عدد الصور التي تريد ظهورها في النتيجة)', event.threadID, event.messageID);
      }

      const keySearchs = keySearch.substr(0, keySearch.indexOf('-'));
      const numberSearch = keySearch.split("-").pop() || 6;

      // Translate the query from Arabic to English
      const translatedQuery = await translateToEnglish(keySearchs);

      const res = await axios.get(`https://eurix-api.replit.app/pinterest?search=${encodeURIComponent(translatedQuery)}`);
      const data = res.data.data;

      var num = 0;
      var imgData = [];

      for (var i = 0; i < parseInt(numberSearch); i++) {
        let path = __dirname + `/cache/${num+=1}.jpg`;
        let getDown = (await axios.get(`${data[i]}`, { responseType: 'arraybuffer' })).data;
        fs.writeFileSync(path, Buffer.from(getDown, 'utf-8'));
        imgData.push(fs.createReadStream(__dirname + `/cache/${num}.jpg`));
      }

      const dateString = moment.tz("Africa/Casablanca").format("YYYY-MM-DD HH:mm:ss");

      api.sendMessage({
        attachment: imgData,
        body: `✿━━━━━━━━━━━━━━━━━✿\n🔮 | إليك ${numberSearch} نتيجة ل : ${keySearchs}\n📆 | تاريخ التنفيذ : ${dateString}\n✿━━━━━━━━━━━━━━━━━✿`
      }, event.threadID, event.messageID);

      for (let ii = 1; ii < parseInt(numberSearch); ii++) {
        fs.unlinkSync(__dirname + `/cache/${ii}.jpg`);
      }
    } catch (error) {
      console.error(error);
      api.sendMessage(" ❌ |حدث خطأ أثناء معالجة طلبك. الرجاء معاودة المحاولة في وقت لاحق.", event.threadID, event.messageID);
    }
  }
};

async function translateToEnglish(query) {
  try {
    const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=ar&tl=en&dt=t&q=${encodeURIComponent(query)}`);
    const translatedQuery = translationResponse?.data?.[0]?.[0]?.[0];
    return translatedQuery || query; // Use the original text if no translation is available
  } catch (error) {
    console.error('Error translating text:', error);
    return query; // Use the original text in case of an error
  }
}
