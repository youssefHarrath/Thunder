const moment = require("moment-timezone");

const author = "حسين يعقوبي";
const code = {
    name: "عمل",
    version: "1.1"
};

const job = [
    "بيع التذاكر في محطة الحافلات (الكيران)",
    "إصلاح سيارة (ميكانيسيان ديال الطنوبيلات)",
    "البرمجة(إما غتنفع الدولة إما غتولي هاكر)",
    "هاكر فايسبوك (ياك المرضي)",
    "شيف في مطبخ 5 نجوم (تبارك الله)",
    "سائق حافلة (شيفور ديال الكار)",
    "تستغل كسائق أجرة في شركة indriver",
    "تحول جنسي شخص ما (ياك المرضي تقاداو الخدامي حتا تخدم بحال هاد الخدمامي)",
    "إصلاح الحنفيت (بلومبي) ( ͡° ͜ʖ ͡°)",
    "ستريمر تقدر تݣول ݣيمر",
    "تجارة إلكترونية",
    "ربت بيت",
    "بائعة الزهور",
    "ابحث عن كود jav/hentai لـ SpermLord",
    "العب كرة القدم واحمل فريقك"
];

module.exports = {
    config: {
        name: code.name,
        version: code.version,
        author: author,
        countDown: 5,
        role: 0,
        shortDescription: {
            vi: "Nhận quà hàng ngày",
            en: "قم بإستقبال هدية كل يوم"
        },
        longDescription: {
            vi: "Nhận quà hàng ngày",
            en: "قم بإستقبال هدية بشكل يومي"
        },
        category: "إقتصاد",
        guide: {
            vi: "   {pn}: Nhận quà hàng ngày"
                + "\n   {pn} info: Xem thông tin quà hàng ngày",
            en: "   {pn}"
                + "\n   {pn} معلومات: قم برؤية معلومات الهدية"
        },
        envConfig: {
            rewardFirstDay: {
                coin: 100,
                exp: 10
            }
        }
    },

    langs: {
        en: {
            cooldown: " ⚠️ |لقد عملت اليوم، لتجنب الإرهاق يرجى العودة غدا",
            rewarded: "لقد قمت بالمهمة: %1 واستلمتها: %2$."
        }
    },

    onStart: async function ({ args, message, event, envCommands, usersData, commandName, getLang }) {
        const reward = envCommands[commandName].rewardFirstDay;
        const dateTime = moment.tz("Africa/Casablanca").format("DD/MM/YYYY");
        const date = new Date();
        const jobIndex = Math.floor(Math.random() * job.length);
        const selectedJob = job[jobIndex];
        const rewardAmount = Math.floor(Math.random() * 101); // تغيير القيمة للمبلغ المتغير
        
        const { senderID } = event;
        const userData = await usersData.get(senderID);
        if (userData.data.lastTimeGetReward === dateTime)
            return message.reply(getLang("cooldown"));

        userData.data.lastTimeGetReward = dateTime;
        await usersData.set(senderID, {
            money: userData.money + rewardAmount,
            data: userData.data
        });

        message.reply(`أنت إشتغلت اليوم كـ ${selectedJob} وحصلت على ${rewardAmount} دولار 💵`);
    }
}; 
