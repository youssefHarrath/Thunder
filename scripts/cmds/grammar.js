const axios = require('axios');

module.exports = {
  config: {
    name: "قواعد_النص",
    version: "1.0",
    author: "august quin",
    countDown: 8,
    role: 0,
    shortDescription: "",
    longDescription: "",
    category: "الذكاء الإصطناعي",
    guide: {
      en: "{pn} ",
    }
  },

  onStart: async function ({ api, args, event }) {
    try {
      const prompt = args.join(' ');

      if (!prompt) {
        api.sendMessage(
          'مرحبًا! أنا هنا لمساعدتك في التحليل النحو و من أجل التصحيحات.',
          event.threadID,
          event.messageID
        );
        return;
      }

      api.sendMessage('جاري التحليل والصياغة الإجابة. انتظر من فضلك....', event.threadID, event.messageID);

      const response = await axios.post('https://grammarai.august-api.repl.co/textanalysis', { prompt });

      if (response.status === 200 && response.data && response.data.answer) {
        const messageText = response.data.answer.trim();
        api.sendMessage(`💬 تحليل وتصحيح قواعد الذكاء الاصطناعي: ${messageText}`, event.threadID, event.messageID);
      } else {
        throw new Error('استجابة غير صالحة أو مفقودة من Grammar AI API');
      }
    } catch (error) {
      console.error(`فشل في الحصول على إجابة: ${error.message}`);
      api.sendMessage(`Error: ${error.message}. حدث خطأ؛ الرجاء معاودة المحاولة في وقت لاحق.`, event.threadID, event.messageID);
    }
  }
};