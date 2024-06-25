module.exports = {
  config: {
    name: "زخرفة",
    version: "1.0",
    author: "Ayoub-ßťøçïo",
    category: "خدمات",
    countDown: 5,
    role: 0,
  },

  onStart: async function ({ api, args, message }) {
    // قائمة بالحروف المراد تحويلها
    const replaceChars = {
      "ا": "ٱ",
      "ب": "بّےـ ـ",
      "ت": "تُےـ",
      "ث": "ثًےـ",
      "ج": "جَےـ",
      "ح": "حًےـ",
      "خ": "خٌےـ",
      "د": "دِ",
      "ذ": "ذٌ",
      "ر": "ر",
      "ز": "ِّ",
      "س": "سًےـ",
      "ش": "شّےـ",
      "ص": "صِےـ",
      "ض": "ضےـ",
      "ط": "طٌےـ",
      "ظ": "ظٌےـ",
      "ع": "عَےـ",
      "غ": "غّےـ",
      "ف": "فُےـ",
      "ق": "قَےـ",
      "ك": "كےـ",
      "ل": "لَ",
      "م": "مِےـ",
      "ن": "نٌےـ",
      "ه": "هےـِ",
      "و": "وٌ",
      "ى": "يّےـ",
      "ي": "يّےـ",
    };

    // النص الذي سيتم تحويله
    const inputText = args.join("");

    let result = "";

    // محول النص
    for (let i = 0; i < inputText.length; i++) {
      const char = inputText[i].toLowerCase();
      result += replaceChars[char] || inputText[i];
    }

    // إرسال النتيجة
    message.send(result);
  },
};
