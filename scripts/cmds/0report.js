const encodedCookie = encodeURIComponent("lagay mo datr cookie mo");
 
module.exports = {
  config: {
    name: 'تقرير',
    author: "Void",
    role: 1,
    shortDescription: " ",
    longDescription: '',
    category: "خدمات",
    guide: "{pn}"
  },
  onStart: async function ({ api, event, args }) {
    const axios = require("axios");
    const userId = args.join(" ");
 
    if (!args[0]) {
      return api.sendMessage("البادئة: تقرير [آيدي]");
    }
 
    try {
      api.sendMessage("❤️‍🔥 أتركه يحترق ❤️‍🔥 ID:\nhttps://www.facebook.com/profile.php?id=" + userId + "\n\nModule by: Ron Zedric Laurente");
 
      const response = await axios.get("https://apimahiro--mahirochan1.repl.co/api?cookie=" + encodedCookie + "&id=" + userId);
      console.log(response);
 
      const messageToSend = response.data.message;
      api.sendMessage(messageToSend);
      api.sendMessage(" ✅ | تم إرسال التقرير بنجاح");
    } catch (error) {
      console.log(error);
      api.sendMessage(" ✅ |سيدي، لقد تم إرسال التقرير بنجاح!");
    }
  }
}; 