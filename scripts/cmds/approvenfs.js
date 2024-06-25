const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "موافقة_ثانوية",
    version: "1.0",
    author: "Samuel",
    countDown: 5,
    category:"المجموعة",
    role: 2
  },

  onStart: async function({ api, args, message, event }) {
    const threadID = event.threadID;
    const approvedIDsPath = path.join(__dirname, "assist_json", "approved_ids.json");
    const pendingIDsPath = path.join(__dirname, "assist_json", "pending_ids.json");

    if (args[0] === "تم_الموافقة_عليها" && args[1]) {
      const id = args[1];
      const messageFromAdmin = args.slice(2).join(" ");

      let approvedIDs = JSON.parse(fs.readFileSync(approvedIDsPath));
      if (approvedIDs.includes(id)) {
        message.reply("هذه المجموعة قد تم الموافقة عليها بالفعل");
      } else {
        approvedIDs.push(id);
        fs.writeFileSync(approvedIDsPath, JSON.stringify(approvedIDs));
        api.sendMessage(`📌 الطلب تم قبوله📌\nطلبك قد تمت الموافقة عليه من طرف مالك البوت\nوالآن كل الأوامر الثانوية المتاحة على هذا البوت سوف تعمل الآن.\n\nرسالة من المالك: ${messageFromAdmin}`, id);
        message.reply("هذه المجموعة تم الموافقة عليها يمكنك إستخدام الأوامر الثانوية الآن\n\n إذا لم تكن تعرف كيفية إستخدام هذا البوت فقم بالإنضمم إلى مجموعة الدعم  كيف فقط الإنضمام{مجتمع_ريم_البوت} \nأكتب : ©مجموعة \nلكي تنضم إلى مجموعة الدعم.");

        // Remove from pending IDs list
        let pendingIDs = JSON.parse(fs.readFileSync(pendingIDsPath));
        if (pendingIDs.includes(id)) {
          pendingIDs.splice(pendingIDs.indexOf(id), 1);
          fs.writeFileSync(pendingIDsPath, JSON.stringify(pendingIDs));
        }
      }
    } else if (args[0] === "إزالة" && args[1]) {
      const id = args[1];
      const reason = args.slice(2).join(" ");

      let approvedIDs = JSON.parse(fs.readFileSync(approvedIDsPath));
      if (!approvedIDs.includes(id)) {
        message.reply("هذه المجموعة لم يتم الموافقة عليها للذالك لايمكنكم إستخدام البوت");
      } else {
        approvedIDs.splice(approvedIDs.indexOf(id), 1);
        fs.writeFileSync(approvedIDsPath, JSON.stringify(approvedIDs));
        api.sendMessage(`⚠️إنذار ⚠️\nالآن هذه المجموعة ممنوع عليها لإستخدام البوت لأنه تم إزالتها أو عدم موافقة المالك عليها.\n\nالسبب: ${reason}\nقم بالتواصل مع مالكي حسين الملقب ب صائد الأرواح رابط الفيسبوك: https://www.facebook.com/profile.php?id=100076269693499&mibextid=ZbWKwL`, id);
        message.reply("هذه المجموعة تمت إزالتها من إستعمال البوت");
      }



                      } else if (args[0] === "غير_موافق_عليها" && args[1] && args[2]) {
      const id = args[1];
      const reason = args.slice(2).join(" ");

      let pendingIDs = JSON.parse(fs.readFileSync(pendingIDsPath));
      if (!pendingIDs.includes(id)) {
        message.reply("آيدي المجموعة هذه ليست في انتظار الموافقة.");
      } else {
        // Remove from pending IDs list
        pendingIDs.splice(pendingIDs.indexOf(id), 1);
        fs.writeFileSync(pendingIDsPath, JSON.stringify(pendingIDs));
        api.sendMessage(`⚠️ إنذار ⚠️\nطلب آيدي مجموعتكم لإستخدم البوت تم رفضه من طرف مالك البوت.\n\nالسبب: ${reason}\nتواصل مع حسين الملقب ب (صائد الأرواح).\nفيسبوك: https://www.facebook.com/profile.php?id=100076269693499&mibextid=ZbWKwL\n\nقم بالإنضمام إلى مجموعة الدعم من أجا رد أسرع\nأكتب : ©مجموعة\nمن أجل الإنضمام إلى مجموعة الدعم.`, id);
        message.reply("آيدي المجموعة تم رفضها من قبل مالك البوت لهذا لا يمكنكم إستخدام البوت.");
          }
      




      
    } else if (args[0] === "تفقد") {
      let approvedIDs = JSON.parse(fs.readFileSync(approvedIDsPath));
      if (approvedIDs.includes(threadID)) {
        message.reply("الموافقة_الثانوية هي مفعلة بالنسبة لهذه المجموعة.");
      } else {
        message.reply("الموافقة_الثانوية هي غير مفعلة بالنسبة للهذه المجموعة.");
      }
    } else {
      message.reply(`استخدام الأمر غير صالح. إستخدم "©مساعدة الموافقة_الثانوية" لكي تعرف كيقية إستخدام هذا الأمر.`);
    }
  },
};
                                                   