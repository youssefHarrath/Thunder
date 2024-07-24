const axios = require('axios');

// وظيفة للحصول على استجابة الذكاء الاصطناعي
async function getAIResponse(prompt, userId) {
  try {
    const response = await axios.get(`https://ai-tools.replit.app/gpt?prompt=${encodeURIComponent(prompt)}&uid=${userId}`);
    return response.data.gpt4;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// الدالة الأساسية لمعالجة الأوامر
async function handleAIQuestion({ api, message, event }) {
  const Prefix = '.ميدو';
  const body = event.body && event.body.trim();
  
  if (!body || !body.startsWith(Prefix)) {
    return; // بادئة غير صالحة، تجاهل الأمر
  }

  const prompt = body.substring(Prefix.length).trim();
  if (!prompt) {
    await message.reply("📝 | قم بطرح السؤال في الوقت الذي تحتاجه وسأسعى جاهداً للإجابة عنه.");
    return;
  }

  try {
    const userId = event.senderID;
    const answer = await getAIResponse(prompt, userId);
    message.reply(answer, (err, info) => {
      if (err) {
        console.error("Error:", err);
      } else {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: "ميدوريا",
          uid: userId
        });
      }
    });
  } catch (error) {
    console.error("Error:", error.message);
    message.reply("An error occurred while processing the request.");
  }
}

module.exports = {
  config: {
    name: "ميدو",
    aliases: ["chatgpt"],
    version: "1.0",
    author: "kshitiz",
    countDown: 5,
    role: 0,
    longDescription: "قم بالدردشة مع ميدوريا",
    category: "الذكاء الاصطناعي",
    guide: {
      en: "{p}.ميدو {سؤال او استفسار}"
    }
  },
  handleCommand: handleAIQuestion,
  onStart: function ({ api, message, event, args }) {
    return handleAIQuestion({ api, message, event, args });
  },
  onReply: function ({ api, message, event, args }) {
    return handleAIQuestion({ api, message, event, args });
  }
};
