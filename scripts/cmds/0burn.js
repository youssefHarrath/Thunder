module.exports = {
  config: {
    name: "الذاكرة",
    aliases: ["mt"],
    version: "1.0",
    author: "Kshitiz",
    role: 0,
    shortDescription: "إختبار الذاكرة",
    longDescription: "قم بإختبار ذاكرتك",
    category: "لعبة",
    guide: {
      en: "{p}الذاكرة"
    }
  },

  onStart: async function ({ message }) {
    const emojiSequence = generateHardEmojiSequence(); 
    const originalSequence = generateEmojiMessage(emojiSequence); 
    try {
      const sentMessage = await message.reply(` 🌟 | قم بتذكر هذه الإيموجيات : ${originalSequence}`);
      global.GoatBot.onReply.set(sentMessage.messageID, {
        commandName: this.config.name,
        messageID: sentMessage.messageID,
        author: message.senderID,
        originalSequence: originalSequence,
        tempFilePath: null
      });
      setTimeout(async () => {
        try {
          await message.unsend(sentMessage.messageID);
        } catch (error) {
          console.error("Error while unsending first message:", error);
        }
        const newEmojiSequence = generateHardEmojiSequence();
        const replyMessage = await message.reply(` ⚜️ | قم على بالرد هذه الرسالة\nبأول إيموجي بين الإيموجيات`);
        global.GoatBot.onReply.set(replyMessage.messageID, {
          commandName: this.config.name,
          messageID: replyMessage.messageID,
          author: message.senderID,
          originalSequence: originalSequence, 
          tempFilePath: null
        });
        setTimeout(async () => {
          try {
            await message.unsend(replyMessage.messageID);
          } catch (error) {
            console.error("Error while unsending second reply message:", error);
          }
        }, 180000);
      }, 5000); 
    } catch (error) {
      console.error("Error sending message:", error);
    }
  },

  onReply: async function ({ message, event, Reply }) {
    const repliedMessage = event.body;
    if (!isValidEmojiSequence(repliedMessage)) {
    
      await message.reply("⚔️ | تحتاح لرؤية طبيب\nالذاكرة معدومة في عائلتكم ");
      return;
    }
    const originalSequence = Reply.originalSequence;  
    await message.reply(`🔖 | قم بتفقد قوة ذاكرتك.\nالإيموجيات الخاصة بك: ${repliedMessage}\n& الإيموجي الأول: ${originalSequence}`);
    setTimeout(async () => {
      try {
        await message.unsend(event.messageID);
      } catch (error) {
        console.error("Error while unsending message:", error);
      }
    }, 180000);

  
    const { commandName } = Reply;
    if (commandName === this.config.name) {
      const { messageID } = Reply;
      try {
        await message.unsend(messageID);
      } catch (error) {
        console.error("Error while unsending second reply message:", error);
      }
    }
  }
};


function generateHardEmojiSequence() {
  const emojis = ["🫂", "🔥", "🧺", "🫀", "🪙", "⚡", "🍬", "💤", "💯", "👣", "❤️‍🔥", "🫁", "🦴", "☝🏻", "🤙🏻", "✍🏻", "👆🏻", "🖐🏻", "👊🏻", "👋🏻", "🪨", "🌊", "🌋", "🌒", "☄️", "🪐", "🌗", "🌘", "🌔", "🌠", "🍔", "🍫", "🧊", "🥄", "🥢", "🚲", "🚕", "💺", "🥇", "🏀" , "🤲", "👐", "🙌", "👏", "🤝", "👍", "👎", "👊", "✊", "🤛", "🤜", "🤞", "✌️", "🤟", "🤘", "👌", "👈", "👉", "👆", "👇", "☝️", "✋", "🤚", "🖐️", "🖖", "👋", "🤙", "💪", "🦵", "🦶", "🖕", "✍️", "🤳", "🧠", "👤" ];
  const randomEmojis = [];
  for (let i = 0; i < 5; i++) { 
    const randomIndex = Math.floor(Math.random() * emojis.length);
    randomEmojis.push(emojis[randomIndex]);
    emojis.splice(randomIndex, 1); 
  }
  return randomEmojis;
}


function isValidEmojiSequence(message) {
  const emojiRegex = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;
  return emojiRegex.test(message);
}


function generateEmojiMessage(emojis) {
  return emojis.join("");
}
