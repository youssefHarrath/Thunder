module.exports = {
  config: {
    name: "عمري",
    author: "Samir Œ",
    countDown: 5,
    role: 0,
    category: "خدمات",
    shortDescription: {
      en: "منشن صديقك واكتب شيء لنشره✍️",
    },
  },

  onStart: async function ({ api, event, args }) {
    const birthday = args[0];

    if (!birthday) {
      return api.sendMessage(" ⚠️ |يرجى إدخال تاريخ ميلادك مثل هذه الصيغة السنة-الشهر-اليوم .", event.threadID);
    }

    const currentDate = new Date();
    const birthDate = new Date(birthday);
    const age = currentDate.getFullYear() - birthDate.getFullYear();

    birthDate.setFullYear(currentDate.getFullYear());
    const isBeforeBirthday = currentDate < birthDate;

    const finalAge = isBeforeBirthday ? age - 1 : age;

    api.sendMessage(` ✅ | عمرك هو ${finalAge}\nهل أنا على صواب '-`, event.threadID);
  },
};
