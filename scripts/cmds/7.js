const fs = require("fs");

module.exports = {
config: {
		name: "بنك",
		version: "1.9",
		author: "Jun",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "",
			en: "نظام بنك إفتراضي"
		},
		longDescription: {
			vi: "",
			en: "نظام البنك الكامل"
		},
		category: "إقتصاد",
		guide: {
			vi: "",
			en: "لديك ستة إختيارات إيداع _ سحب _ رصيدي _ تحويل _ قرض _ دفع_القرض تقولها بعد كتابة أمر {بنك}"
		}
},

  onStart: async function ({ args, message, event, usersData }) {
    const { getPrefix } = global.utils;
  const p = getPrefix(event.threadID);
    const userMoney = await usersData.get(event.senderID, "money");
    const user = parseInt(event.senderID);
    const bankData = JSON.parse(fs.readFileSync("bank.json", "utf8"));

    if (!bankData[user]) {
       bankData[user] = { bank: 0, lastInterestClaimed: Date.now() };
      fs.writeFile("bank.json", JSON.stringify(bankData), (err) => {
        if (err) throw err;
      });
    }
 const command = args[0];
    const amount = parseInt(args[1]);
    const recipientUID = parseInt(args[2]);



  if (command === "توب") {
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

  const messageText = `🏆توب أغنى 10 أشخاص في المجموعة 🏆\n\n\n\n${(await Promise.all(
    topTen.map(async ([userID, data], index) => {
      const userData = await usersData.get(userID);
      return `${index + start + 1}. ${userData.name}:\n Bal: $${data.bank}`;
    })
  )).join("\n\n")}`;

  const totalPages = Math.ceil(totalEntries / pageSize);
  const currentPage = Math.min(page, totalPages);

  const nextPage = currentPage + 1;
  const nextPageMessage = nextPage <= totalPages ? `أكتب توب ${nextPage} لعرض الصفحة التالية\n` : "";
  const pageInfo = `صفحة ${currentPage}/${totalPages}`;

  return message.reply(`${messageText}\n\n${nextPageMessage}${pageInfo}`);
}

    
    if (command === "إيداع") {
      if (isNaN(amount) || amount <= 0) {
        return message.reply("أرجوك أدخل المبلغ الذي تريد إيداعه في البنك.");
      }
      if (userMoney < amount) {
        return message.reply("ليس لديك ما يكفي من المال.");
      }

      bankData[user].bank += amount;
      await usersData.set(event.senderID, {
        money: userMoney - amount
      });

      fs.writeFile("bank.json", JSON.stringify(bankData), (err) => {
        if (err) throw err;
      });
      return message.reply(`${amount} $ تم إيداعها في حسابك البنكي.`);
    } else if (command === "سحب") {
      const balance = bankData[user].bank || 0;

      if (isNaN(amount) || amount <= 0) {
        return message.reply("الرجاء إدخال المبلغ الذي ترغب في سحبه من حسابك البنكي.");
      }
      if (amount > balance) {
        return message.reply("المبلغ الذي تريد سحبه غير متوفر في حسابك البنكي.");
      }
      bankData[user].bank = balance - amount;
      const userMoney = await usersData.get(event.senderID, "money");
      await usersData.set(event.senderID, {
        money: userMoney + amount
   });
       fs.writeFile("bank.json", JSON.stringify(bankData), (err) => {
        if (err) throw err;

      });
      return message.reply(`${amount} $ تم سحبها من حسابك البنكي.`);

    } else if (command === "رصيدي") {

      const balance = bankData[user].bank !== undefined && !isNaN(bankData[user].bank) ? bankData[user].bank :0;

  return message.reply(`رصيد حسابك البنكي هو ${balance} $.`);

} else if (command === "الفائدة") {

  const interestRate = 0.00004; 

  const lastInterestClaimed = bankData[user].lastInterestClaimed || Date.now();

  const currentTime = Date.now();

  const timeDiffInSeconds = (currentTime - lastInterestClaimed) / 1000;
 

  const interestEarned = bankData[user].bank * (interestRate / 365) * timeDiffInSeconds;


bankData[user].lastInterestClaimed = currentTime;

  bankData[user].bank += interestEarned;



  fs.writeFile("bank.json", JSON.stringify(bankData), (err) => {

    if (err) throw err;

  });
  return message.reply(`تمت إضافة الفائدة إلى رصيد حسابك البنكي. الفائدة المكتسبة هي ${interestEarned.toFixed(2)} $.`);
        } else if (command === "تحويل") {
  const balance = bankData[user].bank || 0;
  if (isNaN(amount) || amount <= 0) {
    return message.reply("الرجاء إدخال المبلغ الذي ترغب في تحويله إلى المستلم.");
  }
  if (balance < amount) {
    return message.reply("المبلغ الذي ترغب في تحويله أكبر من رصيد حسابك البنكي.");
  }
  if (isNaN(recipientUID)) {
    return message.reply("الرجاء إدخال آيدي المستقبل.");
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
  return message.reply(`${amount} تم تحويلها إلى المتلقي مع الآيدي  ${recipientUID}.`);
    } else if (command === "قرض") {
 if (isNaN(amount) || amount <= 0) {
 return message.reply("الرجاء إدخال المبلغ الذي ترغب في اقتراضه.");
 }
 if (bankData[user].loan > 0) {
 return message.reply("لديك بالفعل قرض حالي.");
 }
 if (amount > 10000) {
 return message.reply("الحد الأقصى للقرض هو 10000دولار.");
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
 return message.reply(`لقد اقترضت ${amount} دولار. سيتم خصم مبلغ القرض من رصيد حسابك المصرفي بعد أسبوع واحد.`);
} else if (command === "دفع_القرض") {
 const loan = bankData[user].loan || 0;
 const loanDueDate = bankData[user].loanDueDate || 0;

 if (loan <= 0 || loanDueDate <= 0) {
 return message.reply("ليس لديك قرض حالي.");
 }
 const daysLate = Math.ceil((Date.now() - loanDueDate) / (24 * 60 * 60 * 1000));
 const interestRate = 0.0001; // 0.01% per day
 const interest = loan * interestRate * daysLate;
 const totalAmountDue = loan + interest;


 if (isNaN(amount) || amount <= 0) {
 return message.reply(`الرجاء إدخال المبلغ الذي ترغب في دفعه. المبلغ الإجمالي المستحق هو ${totalAmountDue} دولار.`);
 }
 if (amount > userMoney) {
 return message.reply("ليس لديك ما يكفي من المال لسداد القرض.");
 }
 if (amount < totalAmountDue) {
 return message.reply(`المبلغ الذي أدخلته أقل من المبلغ الإجمالي المستحق (${totalAmountDue} دولار). يرجى دفع المبلغ كاملا.`);
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
 return message.reply(`لقد سددت القرض الخاص بك ${loan} $ بالإضافة إلى الفائدة ${interest.toFixed(2)} $. المبلغ الإجمالي المدفوع هو ${totalAmountDue} $.`);
} else {
 return message.reply(`أوامر البنك المتاحة:\n\n\n${p}بنك إيداع [الكمية]: قم بإيداع الأموال في حسابك البنكي\n\n${p}بنك سحب [الكمية]: قم بسحب الأموال من حسابك البنكي\n\n${p}بنك رصيدي: قم بالتحقق من رصيد حسابك المصرفي\n\n${p}بنك الفائدة: قم بالمطالبة بزيادة الفائدة \n\n${p}بنك تحويل [الكمية] [آيدي المستقبل]: قم بتحويل الأموال إلى مستخدم آخر\n\n${p}بنك توب: يمكنك رؤية أغنى 10 مستخدمين\n\n${p}بنك قرض [الكمية]: قم بإقتراض الأموال من البنك\n\n${p}بنك دفع_القرض [الكمية]: قم بسداد القرض الخاص بك`);
} 
}
}

        