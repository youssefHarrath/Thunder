module.exports.config = {
    name: "قائمة_المحظورين",
    version: "1.0.1",
  aliases: ["banned"],
    author: {
        name: "NTKhang",
        contacts: ""
    },
    cooldowns: 5,
    role: 1,
    shortDescription: "انظر قائمة المجموعات/المستخدمين المحظورين",
    longDescription: "انظر قائمة المجموعات/المستخدمين المحظورين",
    category: "المالك",
    guide: "{p}{n} [المجموعة|المستخدم]"
};

module.exports.onStart = async function({ api, event, args, usersData, threadsData }) {
    let target, type;
    if (["المجموعة", "-t"].includes(args[0])) {
        target = await threadsData.getAll();
        type = "groupe";
    } else if (["المستخدم", "-u"].includes(args[0])) {
        target = await usersData.getAll();
        type = "user";
    } else return api.sendMessage("خطأ في بناء الجملة! الرجاء استخدام {p}قائمة_المحظورين [المجموعة|المستخدم]", event.threadID);

    const bannedList = target.filter(item => item.banned.status);
    const msg = bannedList.reduce((i, item) => i += `الإسم: ${item.name}\nآيدي: ${item.id}\nالسبب: ${item.banned.reason}\nالوقت: ${item.banned.date}\n\n`, "");

    api.sendMessage(msg ? `الحالية ${bannedList.length} \n${type}(s) تم حظره من إستخدام البوت إبتداءا من الآن:\n${msg}` : `ليس هناك أي أحد \n${type}(s) الذين يحظر عليهم استخدام البوت.`, event.threadID);
  }