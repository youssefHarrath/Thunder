const axios = require('axios');

const Prefixes = [
  'ميدوريا',
  'ai',
];
const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));
if (!prefix) {
  return; // Invalid prefix, ignore the command
}
const prompt = event.body.substring(prefix.length).trim();
if (!prompt) {
  await message.reply("📝 | قم بطرح السؤال في الوقت الذي تحتاجه وسأسعى جاهداً للإجابة عنه.");
  return;
}

async function getAIResponse(prompt, userId) {
  try {
    const response = await axios.get(`https://ai-tools.replit.app/gpt?prompt=${encodeURIComponent(prompt)}&uid=${userId}`);
    return response.data.gpt4;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function handleAIQuestion({ api, message, event, args }) {
  try {
    const userId = event.senderID;
    const question = args.join(" ").trim();

    if (!question) {
      return message.reply(" ⚠️ | أرجوك قم بطرح سؤال.");
    }

    const answer = await getAIResponse(question, userId);
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
    author: "يوسف",
    countDown: 5,
    role: 0,
    longDescription: "قم بالدردشة مع ميدوريا",
    category: "الذكاء الإصطناعي",
    guide: {
      en: "{p}ميدوريا {سؤال او استفسار}"
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
