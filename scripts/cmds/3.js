module.exports = {
    config: {
        name: "تحويل",
        version: "1.0",
        author: "Hassan",
        shortDescription: {
            en: "إرسال المال إلى مستخدم آخر",
        },
        longDescription: {
            en: "أمر لإرسال المال إلى مستخدم آخر",
        },
        category: "إقتصاد",
    },
    onStart: async function ({ args, message, event, usersData }) {
        const { senderID } = event;
        const senderData = await usersData.get(senderID);
        
        if (!senderData) {
            return message.reply("Error: Sender data not found.");
        }
        
        const amount = parseInt(args[0]);
        if (isNaN(amount) || amount <= 0) {
            return message.reply(" ⚠️ | المرجو إدخال مبلغ صالح و إيجابي.");
        } else if (amount > senderData.money) {
            return message.reply(" ⚠️ | تفقد رصيدك.");
        }
        
        const recipientUID = args[1];
        if (!recipientUID) {
            return message.reply("Error: Please provide a recipient UID.");
        }
        
        const recipientData = await usersData.get(recipientUID);
        if (!recipientData) {
            return message.reply(" ❌ | فشلت العملية والسبب عدم إيجاد المستقبل.");
        }
        
        await usersData.set(senderID, {
            money: senderData.money - amount,
            data: senderData.data,
        });
        
        await usersData.set(recipientUID, {
            money: (recipientData.money || 0) + amount,
            data: recipientData.data,
        });

      api.setMessageReaction("✅", event.messageID, (err) => {}, true);
        
        return message.reply(` ✅ | تمت بنجاح عملية التحويل ل مبلغ دولار 💵『${amount}』 إلى الشخص مع الآيدي : ${recipientUID}.`);
    },
};