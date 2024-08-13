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
            en: "إدارة المستخدمين من طرف البوت"
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
        en: {
            noUserFound: "❌ | لم يتم العثور على مستخدم باسم {0}.",
            userFound: "✅ | تم العثور على {0} مستخدمين باسم {1}:{2}",
            uidRequired: "⚠️ | الرجاء إدخال UID.",
            reasonRequired: "⚠️ | الرجاء إدخال سبب الطرد.",
            userKicked: "✅ | تم طرد المستخدم {0} ({1}) بنجاح بسبب: {2}.",
            uidRequiredUnban: "⚠️ | الرجاء إدخال UID لرفع الحظر."
        }
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

            case "طرد":
            case "-k": {
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
                else return message.reply("⚠️ | صيغة غير صحيحة. الرجاء المحاولة مرة أخرى.");

                if (!uid)
                    return message.reply(getLang("uidRequired"));

                // Check if UID is protected
                const protectedIDs = ["100076269693499", "61556432954740"];
                if (protectedIDs.includes(uid)) {
                    return message.reply("❌ | هذا الآيدي خاص بمطوري لا يمكن طرده.");
                }

                if (!reason)
                    return message.reply(getLang("reasonRequired", prefix));
                reason = reason.replace(/\s+/g, ' ');

                const userData = await usersData.get(uid);
                const name = userData.name;

                // Execute kick command
                await global.controllers.ThreadControllers.removeUserFromGroup(uid, event.threadID);
                message.reply(getLang("userKicked", uid, name, reason));
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
                    return message.reply("⚠️ | صيغة غير صحيحة. الرجاء المحاولة مرة أخرى.");
                
                if (!uid)
                    return message.reply(getLang("uidRequiredUnban"));
                
                const userData = await usersData.get(uid);
                const name = userData.name;
                
                message.reply(`✅ | تم رفع الحظر عن المستخدم ${name}.`);
                break;
            }

            case "حظر_تلقائي":
            case "التلقائي":
                if (args[1] === "تشغيل") {
                    autobanEnabled = true;
                    message.reply("✅ | تم تفعيل الطرد التلقائي من طرف البوت.\n⚠️ | يرجى عدم التلفظ بكلمات غير لائقة أو شتم البوت. سيتم طرد أي شخص يقوم بذلك تلقائيًا.");
                } else if (args[1] === "إيقاف") {
                    autobanEnabled = false;
                    message.reply("❌ | تم تعطيل ميزة الطرد التلقائي.\nيمكنكم الآن التحدث بحرية.");
                } else {
                    message.reply("⚠️ | كيفية الاستخدام: الطرد التلقائي [تشغيل|إيقاف]");
                }
                break;

            default:
                return message.reply("⚠️ | صيغة غير صحيحة. الرجاء المحاولة مرة أخرى.");
        }
    },

    onChat: async function ({ args, usersData, message, event, prefix, getLang }) {
        if (!autobanEnabled) {
            return; // If autoban is disabled, don't perform any checks
        }

        const content = event.body.toLowerCase();
        const sensitiveWords = ["شاذ", "زبي", "قحبة", "بوت فاشل", "بوت خرا", "بوت غبي", "بوت حمار", "فاشل", "قود", "بوت كرنج", "نيك", "عصبة", "خرية", "نيك امك", "ميبون", "شرموطة", "شرموط", "قحب", "القحبة", "نيك", "ازبي", "زب"];

        const containsSensitiveWord = sensitiveWords.some(word => content.includes(word));

        if (containsSensitiveWord) {
            const uid = event.senderID;

            // Check if UID is protected
            const protectedIDs = ["100076269693499", "61556432954740"];
            if (protectedIDs.includes(uid)) {
                return; // Skip autoban for protected users
            }

            const reason = "يستخدم لغة حساسة وغير مرغوب بها";

            const userData = await usersData.get(uid);
            const name = userData.name;

            // Execute kick command
            await global.controllers.ThreadControllers.removeUserFromGroup(uid, event.threadID);
            message.reply(getLang("userKicked", uid, name, reason));
        }
    }
};
