const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "الرئيسية",
    version: "1.0",
    author: "Samuel Kâñèñgeè",
    countDown: 5,
    category:"المالك",
    role: 2
  },

  onStart: async function({ api, args, message, event }) {
    const threadID = event.threadID;
    const approvedIDsPath = path.join(__dirname, "assist_json", "approved_main.json");
    const pendingIDsPath = path.join(__dirname, "assist_json", "pending_main.json");

    if (args[0] === "موافقة" && args[1]) {
      const id = args[1];
      const messageFromAdmin = args.slice(2).join(" ");

      let approvedIDs = JSON.parse(fs.readFileSync(approvedIDsPath));
      if (approvedIDs.includes(id)) {
        message.reply("╔════ஜ۩۞۩ஜ═══╗\n\nهذه المجموعة تم الموافقة عليها بالفعل لإستخدام الأوامر الرئيسية\n\n╚════ஜ۩۞۩ஜ═══╝");
      } else {
        approvedIDs.push(id);
        fs.writeFileSync(approvedIDsPath, JSON.stringify(approvedIDs));
        api.sendMessage(`╔════ஜ۩۞۩ஜ═══╗\n\n📌 تم الموافقة على الطلب 📌\nالأوام الرئيسة تم فتحها\n\nطلبك لاستخدام الأوامر تلرئيسية تم الموافقة عليها من كرف مالك البوت\nوالآن كل الأوامر المقفلة أصبحت مفتوعة وهي تعمل بالنسبة لهذه المجموعة.\n\nرسالة من مالك البوت: ${messageFromAdmin} \n\n إن لم تكن تعرف كيفية إستخدام هذا البوت إذا قم بالإنضملم إلى مجموعة الدعم {مجموعة_ريم_البوت}\nأكتب : ©مجموعة\nمن أجل الإنضمام.\n\n╚════ஜ۩۞۩ஜ═══╝`, id);
        message.reply("╔════ஜ۩۞۩ஜ═══╗\n\nهذه المجموعة تمت الموافقة عليها و يمكنها إستعمال الأوامر الرئيسية\n\n╚════ஜ۩۞۩ஜ═══╝");

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
        message.reply("╔════ஜ۩۞۩ஜ═══╗\n\nهذه المجموعة لم يتم الموافقة عليها للذالك لاداعي لإزالتها\n\n╚════ஜ۩۞۩ஜ═══╝");
      } else {
        approvedIDs.splice(approvedIDs.indexOf(id), 1);
        fs.writeFileSync(approvedIDsPath, JSON.stringify(approvedIDs));
        api.sendMessage(`⚠️إنذار ⚠️\nالآن تم رفض طلب آيدي مجموعتكم هذا لأنه قد تمت إزالته للذالك لايمكنكم إستخدام الأوامر الرئيسية للبوت  لأن المشرف قد أزال مجموعتكم.\n\nالسبب: ${reason}\nقم بالتواصل مع حسين الملقب ب {صائد الأرواح  \nفيسبوك: https://www.facebook.com/profile.php?id=100076269693499&mibextid=ZbWKwL\n\n أيضا يمكنك أن تنضم إلى مجموعة الدعم للمزيد من المعلومات\nأكتب: ©مجموعة\nلكي تنضم`, id);
        message.reply("المجموعة قد تمت إزالتها بواسطة مالك البوت");
      }



                      } else if (args[0] === "غير_موافق" && args[1] && args[2]) {
      const id = args[1];
      const reason = args.slice(2).join(" ");

      let pendingIDs = JSON.parse(fs.readFileSync(pendingIDsPath));
      if (!pendingIDs.includes(id)) {
        message.reply("هذا الآيدي المجموعة غير منظر للموافقة.");
      } else {
        // Remove from pending IDs list
        pendingIDs.splice(pendingIDs.indexOf(id), 1);
        fs.writeFileSync(pendingIDsPath, JSON.stringify(pendingIDs));
        api.sendMessage(`⚠️ إنذار ⚠️\nطلب لاستخدام كل أوامر الموجودة على البوت لم تتم الموافقة عليها من طرف المشرف للذالك هي كلها مقفلة\n\nالسبب: ${reason}\nتواصل مع حسين {صائد الأرواح}. لمزيد من المعلومات\nفيسبوك: https://www.facebook.com/profile.php?id=100076269693499&mibextid=ZbWKwL\n\nأو إنضم إلى مجموعة الدعم لمزيد من المعلومات\nفقط أكتب: ©مجموعة\nمن أجل الإنضمام `, id);
        message.reply("المجموعة لم بتم الموافقة  عليها و بذالك لابمكنكم استخدام الأوامر.");
          }
      




      
    } else if (args[0] === "تفقد") {
      let approvedIDs = JSON.parse(fs.readFileSync(approvedIDsPath));
      if (approvedIDs.includes(threadID)) {
        message.reply("الأوامر الرئيسية قيد التشغيل حاليًا لهذه المجموعة.");
      } else {
        message.reply("الأوامر الرئيسية هي غير مفعلة لهذه المجموعة.");
      }
    } else {
      message.reply(`استخدام الأمر غير صالح. إستخدم "مساعدة الرئيسية" لكي ترى كيفية إستخدام هذا الأمر.`);
    }
  },
};
        