const { getTime } = global.utils;

let autobanEnabled = true; 

module.exports = {
    config: {
        name: "الحظر",
        version: "1.3",
        author: "NTKhang x Samir Œ",
        countDown: 5,
        role: 2,
        shortDescription: {
            vi: "Quản lý người dùng",
            en: "إدارة المستخدمين"
        },
        longDescription: {
            vi: "Quản lý người dùng trong hệ thống bot",
            en: "إدارة المستخدمين  من طرف البوت"
        },
        category: "المالك",
        guide: {
            
        },
        commands: [
            {
                command: "حظر_تلقائي",
                description: {
                    vi: "Bật/tắt chế độ tự động cấm người dùng vi phạm từ ngữ nhạy cảm",
                    en: "قم بتشغيل/إيقاف الحظر التلقائي للمستخدمين الذين ينتهكون لغة حساسة"
                },
                syntax: {
                    vi: "حظر_تلقائي [on|off]",
                    en: "حزر_تلقائي [تشغيل|إيقاف]"
                }
            }
            
        ]
    },

    langs: {
        
    },

    onStart: async function ({ args, usersData, message, event, prefix, getLang }) {
        const type = args[0];
        switch (type) {
            case "بحث":
            case "-f":
            case "جد":
            case "-s": {
                const allUser = await usersData.getAll();
                const keyWord = args.slice(1).join(" ");
                const result = allUser.filter(item => (item.name || "").toLowerCase().includes(keyWord.toLowerCase()));
                const msg = result.reduce((i, user) => i += `\n╭الإسم: ${user.name}\n╰الآيدي: ${user.userID}`, "");
                message.reply(result.length == 0 ? getLang("noUserFound", keyWord) : getLang("userFound", result.length, keyWord, msg));
                break;
            }
                
            
        case "حظر":
        case "-b": {
            let uid, reason;
            if (event.type == "message_reply") {
                uid = event.messageReply.senderID;
                reason = args.slice(1).join(" ");
            }
            else if (Object.keys(event.mentions).length > 0) {
                const { mentions } = event;
                uid = Object.keys(mentions)[0];
                reason = args.slice(1).join(" ").replace(mentions[uid], "");
            }
            else if (args[1]) {
                uid = args[1];
                reason = args.slice(2).join(" ");
            }
            else return message.SyntaxError();

            if (!uid)
                return message.reply(getLang("uidRequired"));
            
            // Check if UID is protected
            if (uid === "100076269693499") {
                return message.reply(" ❌ | هذا الآيدي خاص بمطوري لا يمكن ان يحظر.");
            }
            
            if (!reason)
                return message.reply(getLang("reasonRequired", prefix));
            reason = reason.replace(/\s+/g, ' ');

            const userData = await usersData.get(uid);
            const name = userData.name;
            const status = userData.banned.status;

            if (status)
                return message.reply(getLang("userHasBanned", uid, name, userData.banned.reason, userData.banned.date));
            const time = getTime("DD/MM/YYYY HH:mm:ss");
            await usersData.set(uid, {
                banned: {
                    status: true,
                    reason,
                    date: time
                }
            });
            message.reply(getLang("userBanned", uid, name, reason, time));
            break;
        }
  
            case "رفع_الحظر":
            case "إ_ح": {
                let uid;
    if (event.type == "message_reply") {
        uid = event.messageReply.senderID;
    }
    else if (Object.keys(event.mentions).length > 0) {
        const { mentions } = event;
        uid = Object.keys(mentions)[0];
    }
    else if (args[1]) {
        uid = args[1];
    }
    else
        return message.SyntaxError();
    if (!uid)
        return message.reply(getLang("uidRequiredUnban"));
    const userData = await usersData.get(uid);
    const name = userData.name;
    const status = userData.banned.status;
    if (!status)
        return message.reply(getLang("userNotBanned", uid, name));
    await usersData.set(uid, {
        banned: {}
    });
    message.reply(getLang("userUnbanned", uid, name));
    break;
}

            
        case "التلقائي":
            if (args[1] === "تشغيل") {
                autobanEnabled = true;
                message.reply(" ✅ | تم تفعيل الحظر التلقائي من طرف البوت\n ⚠️ | يرجى عدم التلفظ بكلمات نامية او شتم البوت اي أفعال قد يتم تحديدها من كره البوت سيقوم البوت بحظره تلقائيا");
            } else if (args[1] === "إيقاف") {
                autobanEnabled = false;
                message.reply(" ❌ | تم تعطيل ميزة الحظر التلقائي\n أنتم احرار الآن قولو ماشئتم");
            } else {
                message.reply(" ⚠️ | كيفية الإستخدام: الحظر التلقائي [تشغيل|إيقاف]");
            }
            break;
        default:
            return message.SyntaxError();
    }
},

    onChat: async function ({ args, usersData, message, event, prefix, getLang }) {
        if (!autobanEnabled) {
            return; // If autoban is disabled, don't perform any checks
        }

        const content = event.body.toLowerCase();
        const sensitiveWords = ["شاذ", "زبي", "قحبة","بوت فاشل","بوت خرا","بوت غبي","بوت حمار","فاشل","قود","بوت كرنج"];

        const containsSensitiveWord = sensitiveWords.some(word => content.includes(word));

        if (containsSensitiveWord) {
            const uid = event.senderID;

            if (uid === "100076269693499") {
                return;
            }

            const reason = "يستخدم لغة حساسة و غير مرغوب بها";

            const userData = await usersData.get(uid);
            const name = userData.name;
            const status = userData.banned.status;

            if (!status) {
                const time = getTime("DD/MM/YYYY HH:mm:ss");
                await usersData.set(uid, {
                    banned: {
                        status: true,
                        reason,
                        date: time
                    }
                });
                message.reply(getLang("userBanned", uid, name, reason, time));
            }
        }
    }
};