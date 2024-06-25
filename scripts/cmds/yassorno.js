module.exports = {
  config: {
    name: "نعم&لا",
    version: "1.0",
    author: "Hassan",
    role: 0,
    shortDescription: "قم بالحصول على إختيار نعم أم لا",
    longDescription: "سيعطيك هذا الأمر إجابة عشوائية بنعم أو لا مع رسم متحرك.",
    category: "متعة",
  },

  async onStart({ message }) {
    const spinningMessage = "جاري الإختيار من طرف البوت... 👀";
    await message.reply(spinningMessage);

    return new Promise((resolve) => {
      setTimeout(() => {
        const responses = ["نعم", "لا"];
        const randomIndex = Math.floor(Math.random() * responses.length);
        const response = responses[randomIndex];

        resolve(response);
      }, 2000);
    })
    .then((response) => {
      message.reply(response);
    });
  }
};