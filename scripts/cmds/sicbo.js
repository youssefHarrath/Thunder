module.exports = {
  config: {
    name: "سكيبو",
    aliases: ["sic"],
    version: "1.0",
    author: "AceGun",
    countDown: 5,
    role: 0,
    shortDescription: "العب سكيبو، أقدم لعبة قمار",
    longDescription: "العب سكيبو، أقدم لعبة قمار، واكسب المال",
    category: "لعبة",
    guide: "{pn} <صغير/كبير> <الكمية من المال>"
  },

  onStart: async function ({ args, message, usersData, event }) {
    const betType = args[0];
    const betAmount = parseInt(args[1]);
    const user = event.senderID;
    const userData = await usersData.get(event.senderID);

    if (!["صغير", "كبير"].includes(betType)) {
      return message.reply("🙊 | إختار 'صغير' أو 'كبير'.");
    }

    if (!Number.isInteger(betAmount) || betAmount < 50) {
      return message.reply("❌ | يرجى الرهان بمبلغ 50 أو أكثر.");
    }

    if (betAmount > userData.money) {
      return message.reply("❌ | عفوًا، ليس لديك ما يكفي من المال للقيام بهذا الرهان🌝.");
    }

    const dice = [1, 2, 3, 4, 5, 6];
    const results = [];

    for (let i = 0; i < 3; i++) {
      const result = dice[Math.floor(Math.random() * dice.length)];
      results.push(result);
    }

    const winConditions = {
      small: results.filter((num, index, arr) => num >= 1 && num <= 3 && arr.indexOf(num) !== index).length > 0,
      big: results.filter((num, index, arr) => num >= 4 && num <= 6 && arr.indexOf(num) !== index).length > 0,
    };

    const resultString = results.join(" | ");

    if ((winConditions[betType] && Math.random() <= 0.4) || (!winConditions[betType] && Math.random() > 0.4)) {
      const winAmount = 2 * betAmount;
      userData.money += winAmount;
      await usersData.set(event.senderID, userData);
      return message.reply(`(\_/)\( •_•)\// >[ ${resultString} ]\\🎉 |  هنيئا لك 🥳 لقد فزت ${winAmount}!`);
    } else {
      userData.money -= betAmount;
      await usersData.set(event.senderID, userData);
      return message.reply(`(\_/)\( •_•)\// >[ ${resultString} ]\\😿 | لقد خسرت مع الأسف 🥺 ${betAmount}.`);
    }
  }
};