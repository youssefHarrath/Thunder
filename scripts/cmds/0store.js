const axios = require("axios");

module.exports = {
  config: {
    name: 'المتجر',
    version: '1.0',
    author: 'Vex_Kshitiz',
    role: 0,
    shortDescription: 'متجر الأوانر',
    longDescription: 'متجر الأوامر من طرف خيزيتس',
    category: 'خدمات',
    guide: {
      en: 'من أجل رؤبة كل الأوامر : {p}المتجر\nإلى الملفات: {p}المتجر {الصفحة}\nإلى البحث: {p}المتجر {بحث}'
    }
  },

  onStart: async function ({ api, event, args, message }) {
    try {
      let page = 1;
      let searchQuery = "";

      if (args.length === 1 && !isNaN(parseInt(args[0]))) {
        page = parseInt(args[0]);
      } else if (args.length === 1 && typeof args[0] === 'string') {
        searchQuery = args[0];
      } else if (args.length === 2 && args[0] === 'بحث' && typeof args[1] === 'string') {
        searchQuery = args[1];
      }

      const response = await axios.get("https://cmd-store.vercel.app/kshitiz");
      const commands = response.data;

      // Translate command descriptions to Arabic
      for (const cmd of commands) {
        const translatedDescription = await this.translateToArabic(cmd.description);
        cmd.descriptionArabic = translatedDescription;
      }

      let filteredCommands = commands;
      if (searchQuery) {
        filteredCommands = commands.filter(cmd => cmd.cmdName.toLowerCase().includes(searchQuery.toLowerCase()));
      }

      const startIndex = (page - 1) * 10;
      const endIndex = page * 10;
      const paginatedCommands = filteredCommands.slice(startIndex, endIndex);

      let replyMessage = "";
      paginatedCommands.forEach(cmd => {
        replyMessage += `
المعرف:${cmd.id}
        إسم الأمر :${cmd.cmdName}
        رابط الأمر:${cmd.codeLink}
        معلومات:${cmd.descriptionArabic} // Display Arabic description here
      ----------------------------------------------`;
      });

      if (replyMessage === "") {
        replyMessage = " ⚠️ | لم يتم العثور على الأمر";
      }

      message.reply(replyMessage, (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: "المتجر",
          messageID: info.messageID,
          author: event.senderID,
          commands,
        });
      });
    } catch (error) {
      console.error(error);
      message.reply("An error occurred while fetching commands.");
    }
  },

  onReply: async function ({ api, event, Reply, args, message }) {
    const { author, commandName, commands } = Reply;

    if (event.senderID !== author || !commands) {
      return;
    }

    const commandID = parseInt(args[0], 10);

    if (isNaN(commandID) || !commands.some(cmd => cmd.id === commandID)) {
      message.reply(" ⚠️ | فعل غير صالح يرجى تقديم معرف صالح.");
      return;
    }

    const selectedCommand = commands.find(cmd => cmd.id === commandID);

    let replyMessage = `
    المعرف :${selectedCommand.id}
   إسم الأمر 𝗗:${selectedCommand.cmdName}
   رابط الأمر 𝗘:${selectedCommand.codeLink}
   معلومات 𝗢:${selectedCommand.description}`;

    message.reply(replyMessage);
    global.GoatBot.onReply.delete(event.messageID);
  },

  translateToArabic: async function (text) {
    try {
      const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(text)}`);
      return translationResponse?.data?.[0]?.[0]?.[0];
    } catch (error) {
      console.error(error);
      return "Translation not available";
    }
  }
};