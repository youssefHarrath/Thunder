const axios = require('axios');
const gtts = require('gtts');
const path = require('path');
const fs = require('fs');
const moment = require('moment-timezone');

const Prefixes = ['بوت', 'AI', ''];

module.exports = {
  config: {
    name: 'ذكاء',
    version: '2.5',
    author: 'jay',
    role: 0,
    category: 'الذكاء الإصطناعي',
    shortDescription: {
      en: 'إسأل الذكلء الإصطناعي حول اي شيء',
    },
    longDescription: {
      en: 'إسأل الذكاء الإصطناعي حول اي شيء.',
    },
    guide: {
      en: '{pn} [إستفسار]',
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));

      if (!prefix) {
        return;
      }

      const prompt = event.body.substring(prefix.length).trim();

      if (prompt === '') {
        await message.reply("اسمي ميدوريا يا هذا \nوهذه هي البادئة الخاصة بي '©'");
        return;
      }

      await message.reply("🕣 | جارٍ البحث...");

      const response = await axios.get(`https://api.onlytris.space/gemini?question=${encodeURIComponent(prompt)}`);

      if (response.status !== 200 || !response.data || !response.data.answer) {
        throw new Error('Invalid or missing response from API');
      }

      const { answer, time } = response.data;

      const moroccoTime = new Date().toLocaleString("en-US", { timeZone: "Africa/Casablanca" });

      message.reply({
        body: `إجابة البوت  : ${answer}\n ⏰ | الوقت الحالي : ${moroccoTime}\n\n`,
      });

      console.log('Sent answer as a reply to user');
