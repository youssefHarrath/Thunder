module.exports = {
 config: {
 name: "توب",
 version: "1.0",
 author: "Loufi",
 role: 0,
 shortDescription: {
 en: "توب أعلى 30 مستخدمًا ثريًا"
 },
 longDescription: {
 en: ""
 },
 category: "المجموعة",
 guide: {
 en: "{pn}توب"
 }
 },
 onStart: async function ({ api, args, message, event, usersData }) {
 const allUsers = await usersData.getAll();
 
 const topUsers = allUsers.sort((a, b) => b.money - a.money).slice(0, 30);
 
 const topUsersList = topUsers.map((user, index) => `${index + 1}. ${user.name}: ${user.money}`);
 
 const messageText = `أغنى 30 مستخدم هم كالتالي:\n${topUsersList.join('\n')}`;
 
 message.reply(messageText);
 }
};