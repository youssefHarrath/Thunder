module.exports = {
  config: {
    name: "رهان",
    version: "1.0",
    author: "Riley",
    countDown: 10,
    shortDescription: {
      en: "لعبة رهانات",
    },
    longDescription: {
      en: "لعبة الرهانات.",
    },
    category: "لعبة",
  },
  langs: {
    en: {
      invalid_amount: "أدخل مبلغًا صالحًا وإيجابيًا للحصول على فرصة مضاعفة للفوز 🤦🏻‍♂️",
      not_enough_money: "انظر إلى رصيدك أولاً 👌",
      spin_message: "جاري الدوران...",
      win_message: "تهانينا لقد فزت!💝 $%1 ",
      lose_message: "آسف لكنك تخسر💔 $%1 ",
      jackpot_message: "الفوز بالجائزة الكبرى!😲 لقد فزت $%1 مع ثلاثة %2 حرف او رموز أنت محظوظ حقا",
    },
  },
  onStart: async function ({ args, message, event, envCommands, usersData, commandName, getLang }) {
    const { senderID } = event;
    const userData = await usersData.get(senderID);
    const amount = parseInt(args[0]);

    if (isNaN(amount) || amount <= 0) {
      return message.reply(getLang("invalid_amount"));
    }

    if (amount > userData.money) {
      return message.reply(getLang("not_enough_money"));
    }

    const slots = ["🍒", "🍇", "🍊", "🍉", "🍎", "🍓", "🍏", "🍌"];
    const slot1 = slots[Math.floor(Math.random() * slots.length)];
    const slot2 = slots[Math.floor(Math.random() * slots.length)];
    const slot3 = slots[Math.floor(Math.random() * slots.length)];

    const winnings = calculateWinnings(slot1, slot2, slot3, amount);

    await usersData.set(senderID, {
      money: userData.money + winnings,
      data: userData.data,
    });

    const messageText = getSpinResultMessage(slot1, slot2, slot3, winnings, getLang);

    return message.reply(messageText);
  },
};

function calculateWinnings(slot1, slot2, slot3, betAmount) {
  if (slot1 === "🍒" && slot2 === "🍒" && slot3 === "🍒") {
    return betAmount * 10;
  } else if (slot1 === "🍇" && slot2 === "🍇" && slot3 === "🍇") {
    return betAmount * 5;
  } else if (slot1 === slot2 && slot2 === slot3) {
    return betAmount * 3;
  } else if (slot1 === slot2 || slot1 === slot3 || slot2 === slot3) {
    return betAmount * 2;
  } else {
    return -betAmount;
  }
}

function getSpinResultMessage(slot1, slot2, slot3, winnings, getLang) {
  if (winnings > 0) {
    if (slot1 === "🍒" && slot2 === "🍒" && slot3 === "🍒") {
      return getLang("jackpot_message", winnings, "🍒");
    } else {
      return getLang("win_message", winnings) + 
        ` 
      [ ${slot1} | ${slot2} | ${slot3} ]`;
    }
  } else {
    return getLang("lose_message", -winnings) +
      ` 
    [ ${slot1} | ${slot2} | ${slot3} ]`;
  }
        }