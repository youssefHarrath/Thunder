const fs = require('fs').promises;
const path = require('path');
const { getStreamsFromAttachment, log } = global.utils;
const mediaTypes = ["photo", 'png', "animated_image", "video", "audio"];

module.exports = {
    config: {
        name: "العضوية",
        version: "1.0",
        author: "Kshitiz",
        countDown: 5,
        role: 0,
        shortDescription: {
            vi: "",
            en: "العضوية vip"
        },
        longDescription: {
            vi: "Gửi tin nhắn đến thành viên VIP",
            en: "العضوية vip"
        },
        category: "المالك",
        guide: {
            vi: "",
            en: "{p} العضوية  <رسالة> لإرسالة رسالة إلى أعضاء vip\n{p} العضوية إضافة {الآيدي} \n {p} العضوية إزالة {الآيدي} \n {p} العضوية قائمة"
        }
    },

    langs: {
        vi: {
            
        },
        en: {
            missingMessage: " ⚠️ | تحتاج ان تكون من أعضاء العضوية لإستخدام هاته الميزة",
            sendByGroup: "\n-  🧿 | تم الإرسال من المجموعة : %1\n- معرف المجموعة : %2",
            sendByUser: "\n- 🧿 | تم إرسال الرسالة من المستخدم",
            content: "\n\n📝 | المحتوى :%1\n 🌟 | رد على هذه الرسالة من أجل المتابعة في إرسال الرسالة بينكم",
            success: " ✅ | تم إرسال رسالتك إلى العضوية vip بنجاح\n%2",
            failed: " ❌ |حدث خطأ أثناء إرسال رسالتك إلى VIP\n%2\nراجع وحدة التحكم لمزيد من التفاصيل",
            reply: "📍 رد من أحد أعضاء العضوية %1 : \n%2",
            replySuccess: " ✅ | تم إرسال رسالتك إلى العضوية vip بنجاح!",
            feedback: "📝 | رد من أحد أعضاء العضوية vip  %1:\n- معرف المستخدم : %2\n%3\n\n📌 المحتوى :%4",
            replyUserSuccess: " ✅ | تم إرسال رسالتك إلى أعضاء العضوية vip بنجاح !",
            noAdmin: " ⚠️ | ليس لديك الصلاحية لإستخدام هذا الأمر",
            addSuccess: " ✅ | تمت إضافة العضو إلى قائمة أعضاء العضوية vip",
            alreadyInVIP: " ⚠️ | العضو موجود سلفا في العضوية vip",
            removeSuccess: " ❌ | تمت إزالة العضو من قائمة العضوية !",
            notInVIP: " ⚠️ | العضو غي  موجود في قائمة العضوية vip!",
            list: " 👑 |قائخة أعضاء العضوية vip :\n%1",
        }
    },

     onStart: async function ({ args, message, event, usersData, threadsData, api, commandName, getLang }) {
            const { config } = global.GoatBot;
            const vipDataPath = path.join(__dirname, 'vip.json'); 
            const { senderID, threadID, isGroup } = event;

           
            if (args[0] !== 'إضافة' && args[0] !== 'إزالة') {
                const vipData = await fs.readFile(vipDataPath).then(data => JSON.parse(data)).catch(() => ({}));
                if (!vipData.permission || !vipData.permission.includes(senderID)) {
                    return message.reply(getLang("missingMessage"));
                }
            }

           
            if (args[0] === 'إضافة' || args[0] === 'إزالة') {
                if (!config.adminBot.includes(senderID)) {
                    return message.reply(getLang("noAdmin"));
                }
            }

            if (!args[0]) {
                return message.reply(getLang("missingMessage"));
            }

            const senderName = await usersData.getName(senderID);
            const msg = "==📨️ رسالة من العضوية vip 📨️=="
                + `\n- إسم العضو : ${senderName}`
                + `\n- معرف العضو : ${senderID}`

            const formMessage = {
                body: msg + getLang("content", args.join(" ")),
                mentions: [{
                    id: senderID,
                    tag: senderName
                }],
                attachment: await getStreamsFromAttachment(
                    [...event.attachments, ...(event.messageReply?.attachments || [])]
                        .filter(item => mediaTypes.includes(item.type))
                )
            };

            if (args[0] === 'إضافة' && args.length === 2) {
                const userId = args[1];
                const vipData = await fs.readFile(vipDataPath).then(data => JSON.parse(data)).catch(() => ({}));
                if (!vipData.permission) {
                    vipData.permission = [];
                }
                if (!vipData.permission.includes(userId)) {
                    vipData.permission.push(userId);
                    await fs.writeFile(vipDataPath, JSON.stringify(vipData, null, 2));
                    return message.reply(getLang("addSuccess"));
                } else {
                    return message.reply(getLang("alreadyInVIP"));
                }
            }

            else if (args[0] === 'إزالة' && args.length === 2) {
                const userId = args[1];
                const vipData = await fs.readFile(vipDataPath).then(data => JSON.parse(data)).catch(() => ({}));
                if (!vipData.permission) {
                    vipData.permission = [];
                }
                if (vipData.permission.includes(userId)) {
                    vipData.permission = vipData.permission.filter(id => id !== userId);
                    await fs.writeFile(vipDataPath, JSON.stringify(vipData, null, 2));
                    return message.reply(getLang("removeSuccess"));
                } else {
                    return message.reply(getLang("notInVIP"));
                }
            }

            else if (args[0] === 'قائمة') {
                const vipData = await fs.readFile(vipDataPath).then(data => JSON.parse(data)).catch(() => ({}));
                const vipList = vipData.permission ? await Promise.all(vipData.permission.map(async id => {
                    const name = await usersData.getName(id);
                    return `${id}-(${name})`;
                })) : '';
                return message.reply(getLang("list", vipList.join('\n') || ''));
            }

            else {
                const successIDs = [];
                const failedIDs = [];
                const vipAdmins = await fs.readFile(vipDataPath)
                    .then(data => JSON.parse(data).permission)
                    .catch(err => {
                        console.error(err);
                        return [];
                    });

                const adminNames = await Promise.all(vipAdmins.map(async item => ({
                    id: item,
                    name: await usersData.getName(item)
                })));

                for (const uid of vipAdmins) {
                    try {
                        const messageSend = await api.sendMessage(formMessage, uid);
                        successIDs.push(uid);
                        global.GoatBot.onReply.set(messageSend.messageID, {
                            commandName,
                            messageID: messageSend.messageID,
                            threadID,
                            messageIDSender: event.messageID,
                            type: "userCallAdmin"
                        });
                    }
                    catch (err) {
                        failedIDs.push({
                            adminID: uid,
                            error: err
                        });
                    }
                }

                let msg2 = "";
                if (successIDs.length > 0) {
                    msg2 += getLang("success", successIDs.length,
                        adminNames.filter(item => successIDs.includes(item.id)).map(item => ` <@${item.id}> (${item.name})`).join("\n")
                    );
                }
                if (failedIDs.length > 0) {
                    msg2 += getLang("failed", failedIDs.length,
                        failedIDs.map(item => ` <@${item.adminID}> (${adminNames.find(item2 => item2.id == item.adminID)?.name || item.adminID})`).join("\n")
                    );
                    log.err("VIP MESSAGE", failedIDs);
                }
                return message.reply({
                    body: msg2,
                    mentions: adminNames.map(item => ({
                        id: item.id,
                        tag: item.name
                    }))
                });
            }
        },

        onReply: async ({ args, event, api, message, Reply, usersData, commandName, getLang }) => {
            const { type, threadID, messageIDSender } = Reply;
            const senderName = await usersData.getName(event.senderID);
            const { isGroup } = event;

            switch (type) {
                case "userCallAdmin": {
                    const formMessage = {
                        body: getLang("reply", senderName, args.join(" ")),
                        mentions: [{
                            id: event.senderID,
                            tag: senderName
                        }],
                        attachment: await getStreamsFromAttachment(
                            event.attachments.filter(item => mediaTypes.includes(item.type))
                        )
                    };

                    api.sendMessage(formMessage, threadID, (err, info) => {
                        if (err)
                            return message.err(err);
                        message.reply(getLang("replyUserSuccess"));
                        global.GoatBot.onReply.set(info.messageID, {
                            commandName,
                            messageID: info.messageID,
                            messageIDSender: event.messageID,
                            threadID: event.threadID,
                            type: "adminReply"
                        });
                    }, messageIDSender);
                    break;
                }
                case "adminReply": {
                    let sendByGroup = "";
                    if (isGroup) {
                        const { threadName } = await api.getThreadInfo(event.threadID);
                        sendByGroup = getLang("sendByGroup", threadName, event.threadID);
                    }
                    const formMessage = {
                        body: getLang("feedback", senderName, event.senderID, sendByGroup, args.join(" ")),
                        mentions: [{
                            id: event.senderID,
                            tag: senderName
                        }],
                        attachment: await getStreamsFromAttachment(
                            event.attachments.filter(item => mediaTypes.includes(item.type))
                        )
                    };

                    api.sendMessage(formMessage, threadID, (err, info) => {
                        if (err)
                            return message.err(err);
                        message.reply(getLang("replySuccess"));
                        global.GoatBot.onReply.set(info.messageID, {
                            commandName,
                            messageID: info.messageID,
                            messageIDSender: event.messageID,
                            threadID: event.threadID,
                            type: "userCallAdmin"
                        });
                    }, messageIDSender);
                    break;
                }
                default: {
                    break;
                }
            }
        }
    };