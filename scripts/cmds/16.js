const moment = require('moment-timezone');

module.exports = {
  config: {
    name: "تاريخ_و_وقت",
    version: "1.4",
    author: "kae",
    countdown: 5,
    role: 0,
    shortDescription: "يعرض التاريخ والوقت الحالي في المغرب.",
    longDescription: "",
    category: "خدمات",
    guide: "{البادئة}{الإسم}",
    envConfig: {}
  },

  onStart: async function({ message, args }) {
    const philippinesTime = moment.tz("Africa/Casablanca").format("h:mm:ss A");
    const philippinesDate = moment.tz("Africa/Casablanca").format("dddd, DD MMMM YYYY");

    const reply = `التاريخ و الوقت الحالي في المغرب هو:\n` +
      `❏التاريخ: ${philippinesDate}\n` +
      `❏الوقت: ${philippinesTime}`;

    message.reply(reply);
  },
  onEvent: async function() {}
};