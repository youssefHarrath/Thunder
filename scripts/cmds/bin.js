
const PastebinAPI = require('pastebin-js');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "مشاركة",
    version: "1.0",
    author: "SANDIP",
    countDown: 5,
    role: 2,
    shortDescription: {
      en: "إرفع الملفات إلى بين لنسخ و قم بمشاركة الرابط"
    },
    longDescription: {
      en: "يتيح لك هذا الأمر تحميل الملفات إلى Pastebin وإرسال الرابط إلى الملف."
    },
    category: "خدمات",
    guide: {
      en: "من أجل إستخدام الأمر, أكتب ®ملفات <إسم الملف>. يجب أن يكون الملف موجودًا في المجلد 'cmds'."
    }
  },

  onStart: async function({ api, event, args }) {
    const pastebin = new PastebinAPI({
      api_dev_key: 'LFhKGk5aRuRBII5zKZbbEpQjZzboWDp9',
      api_user_key: 'LFhKGk5aRuRBII5zKZbbEpQjZzboWDp9',
    });

    const fileName = args[0];
    const filePathWithoutExtension = path.join(__dirname, '..', 'cmds', fileName);
    const filePathWithExtension = path.join(__dirname, '..', 'cmds', fileName + '.js');

    if (!fs.existsSync(filePathWithoutExtension) && !fs.existsSync(filePathWithExtension)) {
      return api.sendMessage('لم يتم العثور على الملف!', event.threadID);
    }

    const filePath = fs.existsSync(filePathWithoutExtension) ? filePathWithoutExtension : filePathWithExtension;

    fs.readFile(filePath, 'utf8', async (err, data) => {
      if (err) throw err;

      const paste = await pastebin
        .createPaste({
          text: data,
          title: fileName,
          format: null,
          privacy: 1,
        })
        .catch((error) => {
          console.error(error);
        });

      const rawPaste = paste.replace("pastebin.com", "pastebin.com/raw");

      api.sendMessage(`تم رفع الملف إلى pastebin: ${rawPaste}`, event.threadID);
    });
  },
};