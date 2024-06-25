module.exports = {
  config: {
    name: 'ملاحظة',
    version: '1.0',
    author: 'Samir Œ',
    countDown: 0,
    role: 0,
    shortDescription: 'قم بإنشاء ملاحظة',
    longDescription: 'إنشاء ملاحظة مع النص المقدم.',
    category: 'خدمات',
    guide: {
      en: '{pn} [نص]',
    },
  },
  onStart: async function ({ message, args }) {
    const noteText = args.join(' ');

    if (!noteText) {
      message.reply(' ⚠️ | قم بإدخال نص لإضافته كملاحظة');
      return;
    }

    const noteUrl = `https://api-samir.onrender.com/note?text=${encodeURIComponent(noteText)}`;
    const noteAttachment = await global.utils.getStreamFromURL(noteUrl);

    message.reply({
      body: 'ملاحظات 📝 :',
      attachment: noteAttachment,
    });
  },
};