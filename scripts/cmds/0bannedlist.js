module.exports.config = {
    name: "قائممة_المحظورين",
    version: "1.0.1",
  aliases: ["bn"],
    author: {
        name: "NTKhang",
        contacts: ""
    },
    cooldowns: 5,
    role: 1,
    shortDescription: "قم بالإطلاع على قائمة المستخدمين المحظورين أو المجموعات",
    longDescription: "انظر قائمة المجموعات/المستخدمين المحظورين",
    category: "المالك",
    guide: "{p}{n} [المجموعة|المستخدم]"
};

module.exports.onStart = async function({ api, event, args, usersData, threadsData }) {
    let target, type;
    if (["المجموعة", "-t"].includes(args[0])) {
        target = await threadsData.getAll();
        type = "thread";
    } else if (["المستخدم", "-u"].includes(args[0])) {
        target = await usersData.getAll();
        type = "user";
    } else return api.sendMessage(" ⚠️ | إستعمال خاطئ استخدم {p}قائمة_المحظورين [المجموعة|المستخدم]", event.threadID);

    const bannedList = target.filter(item => item.banned.status);
    const msg = bannedList.reduce((i, item) => i += `الإسم 🎭: [${item.name}]\n الآيدي 🏷️: [${item.id}]\nالسبب 📰: [${item.banned.reason}]\nالوقت ⏰: [${item.banned.date}]\n\n`, "");

    api.sendMessage(msg ? `🔱  حاليا هناك ${bannedList.length} مستخدم \n🔱 ${type} تم حظره من إستخدام البوت :\n🔱 ${msg}` : `ليس هنام أي شخص محظور \n🔱 ${type} الذين يحظر عليهم استخدام البوت.`, event.threadID);
      }