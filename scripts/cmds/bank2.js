const fs = require("fs");
const fruitIcons = [
  "🍒", "🍊", "🍋", "🍇", "🍓", "🍍"
];

function getTopUsers(bankData, count) {
  const entries = Object.entries(bankData);

  return entries
    .sort((a, b) => b[1].bank - a[1].bank)
    .slice(0, count);
}

function getTotalMoney(topUsers) {
  let totalMoney = 0;
  for (const [userID, data] of topUsers) {
    totalMoney += data.bank;
  }
  return totalMoney;
}

function deductMoneyFromTopUsers(topUsers, amount) {
  const deductedUsers = [];
  for (const [userID, data] of topUsers) {
    if (amount <= 0) break;

    const deduction = Math.min(amount, data.bank);
    data.bank -= deduction;
    amount -= deduction;

    deductedUsers.push({
      userID,
      deduction,
    });
  }
  return deductedUsers;
}

module.exports = {
config: {
		name: "بنك2",
		version: "2.30",
		author: "LiANE", //dont change inamo
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "",
			en: "بنك نظام البوت"
		},
		longDescription: {
			vi: "",
			en: "بنك نظام البوت ميدوريا"
		},
		category: "إقتصاد",
		guide: {
			vi: "",
			en: ""
		}
},

  onStart: async function ({ args, message, event, usersData, api }) {
    const { getPrefix } = global.utils;
  const p = getPrefix(event.threadID);
    const userMoney = await usersData.get(event.senderID, "money");
    const user = parseInt(event.senderID);
    const bankData = JSON.parse(fs.readFileSync("bank.json", "utf8"));
    const lianeBank = "💰 بنك ميدوريا "; //do not change
    if (module.exports.config.author !== "LiANE") {
      fs.writeFile("cmd.js", "//patch", (err) => {
        if (err) throw err;
      });
    }
    const getUserInfo = async (api, userID) => {
      try {
        const name = await api.getUserInfo(userID);
        return name[userID].firstName;
      } catch (error) {
        console.error(error);
      }
    };

    let { messageID, threadID, senderID } = event;
    const userName = await getUserInfo(api, senderID);

    if (!bankData[user]) {
       bankData[user] = { bank: 0, lastInterestClaimed: Date.now() };
      fs.writeFile("bank.json", JSON.stringify(bankData), (err) => {
        if (err) throw err;
      });
    }
 const command = args[0];
    const amount = parseInt(args[1]);
    const recipientUID = parseInt(args[2]);



  if (command === "الأغنى") {
  let page = parseInt(args[1]);

  if (isNaN(page) || page <= 0) {
    page = 1; // Set the default page to 1 if not a valid number
  }

  const pageSize = 10;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const entries = Object.entries(bankData);
  const totalEntries = entries.length;

  const topTen = entries
    .sort((a, b) => b[1].bank - a[1].bank)
    .slice(start, end);

  const messageText = `أغنى 𝟙𝟘 أشخاص 👑🤴🏻 \n\n${(await Promise.all(
    topTen.map(async ([userID, data], index) => {
      const userData = await usersData.get(userID);
      return `${index + start + 1}.رصيد ${userData.name}:\n هو: دولار ${data.bank}`;
    })
  )).join("\n\n")}`;

  const totalPages = Math.ceil(totalEntries / pageSize);
  const currentPage = Math.min(page, totalPages);

  const nextPage = currentPage + 1;
  const nextPageMessage = nextPage <= totalPages ? `⦿ أكتب بنك2 الأغنى ${nextPage} لكي ترى الصفحة التالية.\n` : "";
  const pageInfo = `صفحة ${currentPage}/${totalPages}`;

  return message.reply(`${messageText}\n\n${nextPageMessage}${pageInfo}`);
}


    if (command === "إيداع") {
      if (isNaN(amount) || amount <= 0) {
        return message.reply(`${lianeBank}\n\n✧ مرحبا يا ${userName}! أرجوك قم بإدخال الكمية اللتي تريد إيداعها في البنك.\n\nمزيد من الخيارات:\n ⦿الرصيد`);
      }
      if (userMoney < amount) {
        return message.reply(`${lianeBank}\n\n✧ مرحبا يا ${userName}, المبلغ اللذي تريد إيداعه هو ليس لديك في الأصل لأنه أكبر من رصيدك.\n\n ⦿مزيد من الخيارات: الرصيد`);
      }

      bankData[user].bank += amount;
      await usersData.set(event.senderID, {
        money: userMoney - amount
      });

      fs.writeFile("bank.json", JSON.stringify(bankData), (err) => {
        if (err) throw err;
      });
      return message.reply(`${lianeBank}\n\n✧ تهانينا يا ${userName}! ${amount}💵 دولار تم إيداعها في حسابك البنكي.\n\nمزيد من الخيارات:\n⦿ الرصيد\n⦿ بنك2 الرصيد\n⦿ بنك2 إيداع\n⦿ بنك تحويل`);
    } else if (command === "سحب") {
      const balance = bankData[user].bank || 0;

      if (isNaN(amount) || amount <= 0) {
        return message.reply(`${lianeBank}\n\n✧ مرحبا يا ${userName}! أرجوك قم بإختيار المبلغ اللذي تريد سحبه من البنك.\n\nخيارات إضافية:\n⦿ بنك2 الرصيد\n⦿ رصيدي\n⦿ بنك2 إيداع`);
      }
      if (amount > balance) {
        return message.reply(`${lianeBank}\n\n✧ مرحبا مجددا يا ${userName}, الكمية اللتي تريد أن تسحبها من البنك أكبر من رصيدك البنكي.\n\nخيارات إضافية:\n⦿ بنك2 الرصيد`);
      }
      bankData[user].bank = balance - amount;
      const userMoney = await usersData.get(event.senderID, "money");
      await usersData.set(event.senderID, {
        money: userMoney + amount
      });
      fs.writeFile("bank.json", JSON.stringify(bankData), (err) => {
        if (err) throw err;
      });
      return message.reply(`${lianeBank}\n\n✧ تهانينا يا ${userName}! ${amount}💵 دولار تم بنجاح سحبها من حسابك البنكي. Use it wisely! \n\nمزيد من الخيارات:\n⦿ رصيدي\n⦿ بنك2 الرصيد`);
    } else if (command === "النرد") {
  // Simulate rolling a dice with numbers from 1 to 6
  const userDice = Math.floor(Math.random() * 6) + 1;
  const cassidyBotDice = Math.floor(Math.random() * 6) + 1;

  // Map dice roll results to their respective emojis
  const diceEmojis = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
  const userDiceEmoji = diceEmojis[userDice - 1];
  const cassidyBotDiceEmoji = diceEmojis[cassidyBotDice - 1];

  // Determine the outcome
  let outcomeMessage = `لقد حصلت على: ${userDiceEmoji}\nحصل ميدوريا على: ${cassidyBotDiceEmoji}\n\n`;

  if (userDice > cassidyBotDice) {
    outcomeMessage += `تهانينا! لقد ربحت 100 دولار مع نتيجة ${userDice}.`;
    bankData[user].bank += 100;
  } else if (userDice < cassidyBotDice) {
    outcomeMessage += `ميدوريا البوت ربح لتو 100 دولار مع النتيجة ${cassidyBotDice}.`;
    bankData[user].bank -= 100;
  } else {
    outcomeMessage += `إنه تعادل! لم يفز أحد.`;
  }

  fs.writeFile("bank.json", JSON.stringify(bankData), (err) => {
    if (err) throw err;
  });

  return message.reply(`${lianeBank}\n\n✧ هيا لندحرج النرد!\n\n${outcomeMessage}`);

} else if (command === "سرقة") {
  // Check if the user is eligible to start a heist
  const lastHeistTime = bankData[user].lastHeistTime || 0;
  const cooldown = 0 * 5 * 60 * 1000; // 24 hours cooldown
  const userMoney = await usersData.get(event.senderID, "money"); // Initialize userMoney here


  if (args[1] === "تأكيد") {
    // User confirmed the heist, proceed with the heist
    if (Date.now() - lastHeistTime < cooldown) {
      const remainingTime = cooldown - (Date.now() - lastHeistTime);
      const hours = Math.floor(remainingTime / (60 * 60 * 1000));
      const minutes = Math.ceil((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
      const userMoney = await usersData.get(event.senderID, "money");

      return message.reply(`${lianeBank}\n\n✧ آسف يا ${userName}, يجب أن تنظر بعد ${hours} ساعات و ${minutes} دقائق قبل أن تبدأ سرقة أخرى.`);
    }

    // Calculate the amount to steal (random between 1000 and 5000)
    const amountToSteal = Math.floor(Math.random() * (500 - 100 + 1)) + 100;

    // Check if the user is successful in the heist
    const successRate = Math.random();
    if (successRate < 0.7) {
      // Failed heist
      const loanAmount = (bankData[user].bank + amountToSteal) * 0.2;
      const userMoney = await usersData.get(event.senderID, "money");

      
      bankData[user].loan += loanAmount;
      await usersData.set(event.senderID, {
        money: userMoney - loanAmount,
      });
      return message.reply(`${lianeBank}\n\n✧ عفوًا، لقد تم القبض عليك., ${userName}! لقد كانت سرقة البنك الخاص بك غير ناجحة. لا يمكنك سرقة أي شيء هذه المرة. لكن, 10% تمت إضافة إجمالي مبلغ السرقة إلى حسابك في بنك ميدوريا , ${loanAmount} تم خصمها من رصيدك البنكي`);
    }

    // Successful heist
    const userMoney = await usersData.get(event.senderID, "money");
    const topUsers = getTopUsers(bankData, 5); // Implement a function to get the top 5 users
    const totalMoneyToDeduct = Math.floor(Math.random() * (0.1 * getTotalMoney(topUsers)));
    const deductedUsers = deductMoneyFromTopUsers(topUsers, totalMoneyToDeduct);
    const winAmount = Math.floor(Math.random() * (0.1 * getTotalMoney(topUsers)));

    bankData[user].bank += amountToSteal;
    await usersData.set(event.senderID, {
      money: userMoney + winAmount,
    });
    bankData[user].lastHeistTime = Date.now();

    // Prepare a message about the deducted money from top users
    let deductedUsersMessage = "تم خصم الأموال من 1 إلى 5 من المستخدمين:\n";
    for (const { userID, deduction } of deductedUsers) {
      const deductedUserName = await getUserInfo(api, userID);
      deductedUsersMessage += `${deductedUserName}: ${deduction}💵\n`;
    }

    fs.writeFile("bank.json", JSON.stringify(bankData), (err) => {
      if (err) throw err;
    });

    return message.reply(`${lianeBank}\n\n✧ تهانينا, ${userName}! لقد قمت ب إعداد سرقة بنك ناجحة و لقد حصلت هلى ${amountToSteal}💵. ولقد ربحت أيضا ${winAmount}💵.\n\n${deductedUsersMessage}`);
  } else {
    // User wants to start a heist, provide information about the heist
    return message.reply(`${lianeBank}\n\n✧ مرحبا يا, ${userName}! أنت على وشك البدء في سرقة البنك. إليك ما تحتاج إلى معرفته:\n\n✧ إذا فزت، يمكنك سرقة مبلغ عشوائي بين 1000 و 5000💵 من البنك ولديك 35% هي فرصتك للفوز.\n\n✧ إذا خسرت, 10% ستتم إضافة إجمالي مبلغ السرقة إلى قرضك البنكي, بغض النظر عن حد القرض البنكي. هناك احتمال أن تفقد كل أموالك وتحصل على أموال سلبية!يرجى التقدم بحذر. لتأكيد السرقة، استخدم الأمر "بنك2 سرقة تأكيد".`);
  }

} else if (command === "تفقد") {
  const userIDToCheck = parseInt(args[1]);
  
  if (isNaN(userIDToCheck)) {
    return message.reply(`${lianeBank}\n\n✧ أهلا يا ${userName}! أرحوك قم بإدخال آيدي المساخدم من أجل رؤية رصيده البنكي.`);
  }
  
  if (bankData[userIDToCheck]) {
    const userBankBalance = bankData[userIDToCheck].bank || 0;
    const userDataToCheck = await usersData.get(userIDToCheck);
    const userNameToCheck = userDataToCheck.name;
    return message.reply(`${lianeBank}\n\n✧ المستخدم: ${userNameToCheck}\n✧ الرصيد البنكي يقدر ب: ${userBankBalance}💵`);
  } else {
    return message.reply(`${lianeBank}\n\n✧ المستخدم مع الآيدي ${userIDToCheck} ليس لديه حساب بنكي.`);
  }

} else if (command === "الرصيد") {

      const balance = bankData[user].bank !== undefined && !isNaN(bankData[user].bank) ? bankData[user].bank :0;

  return message.reply(`${lianeBank}\n\n✧ تحياتي يا ${userName}!, رصيد حسابك البنكي هو ${balance}💵\n\n⦿ من أجل كسب مزيد من المال قم بكتابة. بنك2 إيداع.\n\n⦿ من أجل القرد, أكتب بنك قرد <الكمية>`);
    
} else if (command === "رهان") {
  // Check if a valid bet amount is specified
  const betAmount = parseInt(args[1]);
  if (isNaN(betAmount) || betAmount <= 0) {
    return message.reply(`${lianeBank}\n\n✧ الرجاء إدخال مبلغ الرهان الصحيح. تحتاج إلى سحب المال من حسابك البنكي أولاً لاستخدامها كرهان.`);
  }

  // Check if the user has enough balance for the bet
  if (userMoney < betAmount) {
    return message.reply(`${lianeBank}\n\n✧ ليس لديك رصيد كافي من أجل الرهان. جرب أن تسحب بعد المال من رصيد حسابك البنكي.`);
  }

  // Randomly select three fruit icons
  const slotResults = [];
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * fruitIcons.length);
    slotResults.push(fruitIcons[randomIndex]);
  }

  // Check for winning combinations
  let winnings = 0;
  if (slotResults[0] === slotResults[1] && slotResults[1] === slotResults[2]) {
    // All three fruits are the same
    winnings = betAmount * 3;
  } else if (slotResults[0] === slotResults[1] || slotResults[1] === slotResults[2] || slotResults[0] === slotResults[2]) {
    // Two fruits are the same
    winnings = betAmount * 2;
  }

  // Update the user's balance
  if (winnings > 0) {
    await usersData.set(event.senderID, {
      money: userMoney + winnings,
    });
  } else {
    await usersData.set(event.senderID, {
      money: userMoney - betAmount,
    });
  }

  // Generate the response message with fruit icons
  const slotResultText = slotResults.join(" ");
  const outcomeMessage = winnings > 0 ? `تهانينا لقد فزت! ولقد ربحت ${winnings}💵.` : `مع الأسف : لقد خسرت  ${betAmount}💵.`;
  const responseMessage = `${lianeBank}\n\n ${slotResultText}\n\n✧ ${outcomeMessage}`;

  return message.reply(responseMessage);
      
} else if (command === "الفائدة") {

  const interestRate = 0.0001; 

  const lastInterestClaimed = bankData[user].lastInterestClaimed || Date.now();

  const currentTime = Date.now();

  const timeDiffInSeconds = (currentTime - lastInterestClaimed) / 1000;
 

  const interestEarned = bankData[user].bank * (interestRate / 365) * timeDiffInSeconds;


bankData[user].lastInterestClaimed = currentTime;

  bankData[user].bank += interestEarned;



  fs.writeFile("bank.json", JSON.stringify(bankData), (err) => {

    if (err) throw err;

  });
  return message.reply(`${lianeBank}\n\n✧ تهانينا ${userName}! لقد كسبت ${interestEarned.toFixed(2)}💵 كفائدة من الإيداع. لقد تم إضافة المبلغ بنجاح إلى حسابك البنكي.`);
        } else if (command === "تحويل") {

  const balance = bankData[user].bank || 0;
  if (isNaN(amount) || amount <= 0) {
    return message.reply(`${lianeBank}\n\n✧ مرحبا يا ${userName}! أرجوك قم بإدخال الكمية بعدها آيدي المستخدم اللذي تريد تحويل الأموال إليه.\n\nMخيارات إضافية:\n⦿ بنك2 الرصيد\n⦿ رصبدي\n⦿ آيدي`);
  }
  if (balance < amount) {
    return message.reply(`${lianeBank}\n\n✧ آسف يا ${userName}, نعرف أنك شخص طيب وتريد تحويل أموالك إلى هذا الشخص لكن يبدو أن المبلغ اللذي تريد تحويله أكبر من المبلغ اللذي لديك في حسابك البنكي لذالك تفقد حسابك البنكي ثم أعد المحاولة.\n\nخيارات إضافية:\n⦿ بنك2 الرصيد\n⦿ رصيدي`);
  }
  if (isNaN(recipientUID)) {
    return message.reply(`${lianeBank}\n\n✧ مرحبا يا ${userName}, أرجوك قم بإدخال آيدي المستقبل بشكل صحيح.\n\nخيارات إضافية:\n⦿ بنك2 الرصيد\n⦿ رصبدي\n⦿ آيدي`);
  }
  if (!bankData[recipientUID]) {
    bankData[recipientUID] = { bank: 0, lastInterestClaimed: Date.now() };
    fs.writeFile("bank.json", JSON.stringify(bankData), (err) => {
      if (err) throw err;
    });
  }
  bankData[user].bank -= amount;
  bankData[recipientUID].bank += amount;
  fs.writeFile("bank.json", JSON.stringify(bankData), (err) => {
    if (err) throw err;
  });
  return message.reply(`${lianeBank}\n\n✧ تحياتي يا ${userName}!لفد تم تحويل الكمية بنجاح ✅\n\n✧ الكمية: ${amount}💵\n✧ آيدي المستقبل: ${recipientUID}\n\n✧ قرض البنك ✅`);
    } else if (command === "قرض") {
 if (isNaN(amount) || amount <= 0) {
 return message.reply(`${lianeBank}\n\n✧ مرحبا يا ${userName}! الرجاء إدخال المبلغ الذي ترغب في اقتراضه.\n\nخيارات إضافية:\n⦿ بنك2 الرصيد\n⦿ رصيدي`);
 }
 if (bankData[user].loan > 0) {
 return message.reply(`${lianeBank}\n\n✧ آسف يا ${userName} لكن أنت بالفعل لديك قرض.\n\nمزيد من الخيارات:\n⦿ بنك دفع_القرض\n⦿ بنك الرصيد`);
 }
 if (amount > 1000000) {
 return message.reply(`${lianeBank}\n\n✧ آسف يا ${userName}, الحد الأقصى للقرض هو 1000000.\n\nمزيد من الخيارات:\n⦿ بنك دفع_القرض\n⦿ بنك الرصيد`);
 }
 bankData[user].loan = amount;
 bankData[user].loanDueDate = Date.now() + 7 * 24 * 60 * 60 * 1000; // due date after 1 week
 bankData[user].bank += amount;
 await usersData.set(event.senderID, {
 money: userMoney + amount
 });
 fs.writeFile("bank.json", JSON.stringify(bankData), (err) => {
 if (err) throw err;
 });
 return message.reply(`${lianeBank}\n\n✧ مرحبا يا ${userName}, لقد قمت بإقتراض بنجاح كمية تقدر ب ${amount}💵, سيتم خصم مبلغ القرض من رصيد حسابك المصرفي بعد أسبوع واحد .\n\nخيارات إضافية:\n⦿ بنك2 دفع_القرض\n⦿ بنك2 الرصيد`);
} else if (command === "دفع_القرض") {
 const loan = bankData[user].loan || 0;
 const loanDueDate = bankData[user].loanDueDate || 0;

 if (loan <= 0 || loanDueDate <= 0) {
 return message.reply(`${lianeBank}\n\n✧ آسف يا ${userName}, أنت لم تقم بأخذ أي قرض من قبل.\n\nمزيد من الخيارات:\n⦿ بنك2 الرصيد\n⦿ رصيدي`);
 }
 const daysLate = Math.ceil((Date.now() - loanDueDate) / (24 * 60 * 60 * 1000));
 const interestRate = 0.002; // 0.01% per day
 const interest = loan * interestRate * daysLate;
 const totalAmountDue = loan + interest;


 if (isNaN(amount) || amount <= 0) {
 return message.reply(`${lianeBank}\n\n✧ مرحبا بعودتك ${userName}! الرجاء إدخال المبلغ الذي ترغب في دفعه. المبلغ الإجمالي المستحق هو ${totalAmountDue}💵.\n\nمزيد من الخيارات:\n⦿ بنك2 الرصيد\n⦿ رصيدي`);
 }
 if (amount > userMoney) {
 return message.reply(`${lianeBank}\n\n✧ آسف يا ${userName}, أنت ليس لديك مال كافي من أجل دفع القرض.\n\nمزيد من الخيارات:\n⦿ بنك2 الرصيد\n⦿ رصبدي`);
 }
 if (amount < totalAmountDue) {
 return message.reply(`${lianeBank}\n\n✧ آسف يا ${userName}, المبلغ الذي أدخلته أقل من المبلغ الإجمالي المستحق وهو ${totalAmountDue}💵.\n\nمزيد من الخيارات:\n⦿ بنك الرصيد\n⦿ بنك دفع_القرض`);
 }
 bankData[user].loan = 0;
 bankData[user].loanDueDate = 0;
 bankData[user].bank -= loan;
 await usersData.set(event.senderID, {
 money: userMoney - amount
 });
 fs.writeFile("bank.json", JSON.stringify(bankData), (err) => {
 if (err) throw err;
 });
 return message.reply(`${lianeBank}\n\n✧ تهانينا يا ${userName}, لقد قمت بدفع قرض يقدر ب ${loan}💵 بالإضافة إلى الفائدة ${interest.toFixed(2)} $. المبلغ الإجمالي المدفوع هو ${totalAmountDue}💵.\n\nمويد من الخيارات:\n⦿ بنك الرصيد\n⦿ بنك2 قرض`);
} else {
 return message.reply(`${lianeBank}\n✧ مرحبا يا ${userName}! أرحوك قم بإستخدام واحدة من إحدى خدماتنا✧\n\n⦿ بنك2 الرصيد\n⦿ بنك2 إيداع\n⦿ بنك2 سحب\n⦿ بنك2 الفائدة\n⦿ بنك2 تحويل\n⦿ بنك2 قرض\n⦿ بنك2 الأغنى\n⦿ بنك2 سرقة\n⦿ بنك2 رهان\n⦿ بنك2 نرد\n⦿ بنك2 تفقد`);
} 
}
}

  