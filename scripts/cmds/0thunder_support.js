module.exports = {
  config: {
    name: "ترحيب",
    version: "1.0",
    author: "يوسف",
    shortDescription: "يرسل رسالة ترحيب عند دخول البوت إلى مجموعة جديدة",
    longDescription: "يستخدم هذا الأمر لإرسال رسالة ترحيب تحتوي على معلومات حول كيفية التواصل مع دعم البوت ومالكيه عند دخول البوت إلى مجموعة جديدة.",
    category: "المالك",
  },

  langs: {
    en: {
      welcomeMessage: "مرحبًا! إذا كان لديك أي تساؤل حول البوت أو استفسار، اكتب `.أدخلني` وسأدخلك إلى مجموعة دعم البوت. وللتواصل مع مالكي البوت، يمكنك زيارة هذا الرابط: https://www.facebook.com/61556432954740"
    }
  },

  // دالة للترحيب في أي مجموعة يتم إضافته إليها
  onEvent: async function({ api, event, getLang }) {
    const { threadID, isGroup, logMessageType } = event;

    // تحقق إذا كان هذا الحدث يشير إلى إضافة البوت إلى مجموعة
    if (logMessageType === "log:subscribe" && isGroup) {
      // إرسال رسالة الترحيب في المجموعة
      api.sendMessage(getLang("welcomeMessage"), threadID);
    }
  }
};
