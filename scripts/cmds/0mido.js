const axios = require('axios');

// وظيفة للحصول على استجابة الذكاء الاصطناعي
async function getAIResponse(prompt, userId) {
  try {
    const response = await axios.get(`https://c-v1.onrender.com/api/chatgpt?prompt=${encodeURIComponent(prompt)}`);
    return response.data.answer; // استخدام "answer" بدلاً من "gpt4"
  } catch (error) {
    console.error("Error fetching AI response:", error.message || error);
    throw new Error("حدث خطأ أثناء محاولة الحصول على إجابة من الذكاء الاصطناعي. حاول مرة أخرى لاحقًا.");
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
    await message.reply("📝 | قم بطرح السؤال بعد كتابة البادئة .ميدو وسأجيب عليه فورًا.");
    return;
  }

  try {
    const userId = event.senderID;

    // إعلام المستخدم بأن الإجابة قيد التحضير
    await message.reply("⏳ | جارٍ تحضير الإجابة، يرجى الانتظار...");

    const answer = await getAIResponse(prompt, userId);
    await message.reply(answer, (err, info) => {
      if (err) {
        console.error("Error sending message:", err.message || err);
      } else {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: "ميدوريا",
          uid: userId
        });
      }
    });
  } catch (error) {
    console.error("Error in handleAIQuestion:", error.message || error);
    await message.reply("⚠️ | حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى لاحقًا.");
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
    longDescription: "قم بالدردشة مع ميدوريا باستخدام الذكاء الاصطناعي.",
    category: "الذكاء الاصطناعي",
    guide: {
      en: "{p}.ميدو {سؤال أو استفسار} - تفاعل مع الذكاء الاصطناعي."
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
