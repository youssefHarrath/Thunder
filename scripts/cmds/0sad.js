const axios = require("axios");
const { getStreamFromURL, shortenURL, randomString } = global.utils;

async function fetchAnimeEpisodes(animeName) {
  try {
    const response = await axios.get(`https://anieps.onrender.com/kshitiz?anime=${encodeURIComponent(animeName)}`);
    return response.data.episodes;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch anime episodes");
  }
}

async function fetchEpisodeDownloadLinks(episodeName) {
  try {
    const response = await axios.get(`https://anidl.onrender.com/kshitiz?episode=${encodeURIComponent(episodeName)}`);
    return response.data.downloadLinks;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch episode download links");
  }
}

module.exports = {
  config: {
    name: "أني_واتش",
    author: "Kshitiz",
    version: "1.0",
    cooldowns: 5,
    role: 0,
    shortDescription: "قم بمشاهدة الأنمي ",
    longDescription: "قم بالحصول على روابط تحميل حلقات الأنمي",
    category: "أنمي",
    guide: "{p}أني_واتش <إسم الأنمي>",
  },

  onStart: async function ({ api, event, args }) {
    const animeName = args.join(" ");

    if (!animeName) {
      api.sendMessage({ body: " ⚠️ | قم بإقتراح إسم أنمي." }, event.threadID, event.messageID);
      return;
    }

    try {
      const episodes = await fetchAnimeEpisodes(animeName);

      if (!episodes || episodes.length === 0) {
        api.sendMessage({ body: `لم يتم إيجاد أي رابط بالنسبة للأنمي : ${animeName}` }, event.threadID, event.messageID);
        return;
      }

      const totalEpisodes = episodes.length;
      const message = `✨ قم بالرد برقم الحلقة .\n🔰 إجمالي عدد الحلقات : ${totalEpisodes}`;

      api.sendMessage({ body: message }, event.threadID, (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: "أني_واتش",
          messageID: info.messageID,
          animeName,
          episodes,
        });
      });
    } catch (error) {
      console.error(error);
      api.sendMessage({ body: "عذرا، حدث خطأ أثناء معالجة طلبك 😅." }, event.threadID);
    }
  },

  onReply: async function ({ api, event, Reply, args }) {
    const { animeName, episodes } = Reply;

    const episodeIndex = parseInt(args[0], 10);

    if (isNaN(episodeIndex) || episodeIndex <= 0 || episodeIndex > episodes.length) {
      api.sendMessage({ body: "⚠️ | ماقمت بإدخاله ليس رقما للحلقة .\nأرجوك.قم بالرد بالرقم الحلقات الموجودة و المتوفرة." }, event.threadID, event.messageID);
      return;
    }

    const selectedEpisode = episodes[episodeIndex - 1];
    const episodeName = selectedEpisode[1];

    try {
      const downloadLinks = await fetchEpisodeDownloadLinks(episodeName);

      const shortenedLinks = {
        '1280x720': await shortenURL(downloadLinks['1280x720']),
        '1920x1080': await shortenURL(downloadLinks['1920x1080']),
      };

      const message = ` ✅ | تم تهيئة الروابط\n🔰 | وهي جاهزة للتحميل "${episodeName}":\n\n`
        + `𝟭𝟮𝟴𝟬𝘅𝟳𝟮𝟬: ${shortenedLinks['1280x720']}\n`
        + `𝟭𝟵𝟮𝟬𝘅𝟭𝟬𝟴𝟬: ${shortenedLinks['1920x1080']}`;

      api.sendMessage({ body: message }, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      api.sendMessage({ body: " ❌ |حدث خطأ أثناء معالجة الحلقة.\nيُرجى إعادة المحاولة لاحقًا." }, event.threadID);
    } finally {
      global.GoatBot.onReply.delete(event.messageID);
    }
  },
};