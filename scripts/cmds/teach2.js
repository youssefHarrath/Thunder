const valentine = {
  name: "زومبي",
  version: "1.0",
  author: "Samir Œ",
  countDown: 5,
  role: 0,
  shortDescription: {
    en: "صورة إلى زومبي"
  },
  longDescription: {
    en: "صورة إلى زومبي"
  },
  category: "صور",
  guide: {
    en: "{pn} قم بالرد على صورة"
  }
};


const samirxrichi = async ({ api, event }) => {
  const imageLink = event.messageReply?.attachments[0]?.url;
  if (!imageLink) {
    return api.sendMessage(' ⚠️ | أرجوك قم بالرد على صورة', event.threadID, event.messageID);
  }

  try {
    const apiUrl = `https://api-samir.onrender.com/zombie?imgurl=${encodeURIComponent(imageLink)}`;
    const imageStream = await global.utils.getStreamFromURL(apiUrl);
    if (!imageStream) {
      return api.sendMessage(' ❌ | فشل تحويل الصورة.', event.threadID, event.messageID);
    }
    return api.sendMessage({ attachment: imageStream }, event.threadID, event.messageID);
  } catch (error) {
    console.log(error);
    return api.sendMessage(' ❌ | فشل تحويل الصورة', event.threadID, event.messageID);
  }
};

module.exports = {
  config: valentine ,
  onStart: samirxrichi,
};