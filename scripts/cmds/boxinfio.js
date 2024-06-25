const fs = require("fs-extra");
const request = require("request");

module.exports = {
config: {
		name: "معلومات_حول_المجموعة",
    aliases: ['boxinfo'],
    version: "1.0",
		author: "Loid Butter",
		countDown: 5,
		role: 0,
		shortDescription: "أنظر إلى كل معلومات المجموعة",
		longDescription: "",
		category: "المجموعة",
		guide: {
      en: "{p} [معلومات_حول_المجموعة|معلومات_حول]",
    }
	},

 onStart: async function ({ api, event, args }) {
	let threadInfo = await api.getThreadInfo(event.threadID);
	var memLength = threadInfo.participantIDs.length;
	let threadMem = threadInfo.participantIDs.length;
	var nameMen = [];
    var gendernam = [];
    var gendernu = [];
    var nope = [];
     for (let z in threadInfo.userInfo) {
     	var gioitinhone = threadInfo.userInfo[z].gender;
     	var nName = threadInfo.userInfo[z].name;
        if(gioitinhone == "MALE"){gendernam.push(z+gioitinhone)}
        else if(gioitinhone == "FEMALE"){gendernu.push(gioitinhone)}
            else{nope.push(nName)}
    };
	var nam = gendernam.length;
    var nu = gendernu.length;
   var listad = '';
   var qtv2 = threadInfo.adminIDs;
	let qtv = threadInfo.adminIDs.length;
	let sl = threadInfo.messageCount;
	let u = threadInfo.nicknames;
	let icon = threadInfo.emoji;
	let threadName = threadInfo.threadName;
	let id = threadInfo.threadID;
   for (let i = 0; i < qtv2.length; i++) {
const infu = (await api.getUserInfo(qtv2[i].id));
const name = infu[qtv2[i].id].name;
		listad += '•' + name + '\n';
	}
	let sex = threadInfo.approvalMode;
			var pd = sex == false ? 'تم تشغيلها' : sex == true ? 'تم تعطيلها' : 'loid';
			var callback = () =>
				api.sendMessage(
					{
						body: `💫「 إسم المجموعة 」:${threadName}\n💫「 آيدي المجموعة 」: ${id}\n💫「 الموافقة 」: ${pd}\n💫「 الإيموجي 」: ${icon}\n💫「 معلومات 」: تتضمن ${threadMem} أعضاء/عضو\n💫「 عدد الإناث 」: ${nam}\n💫「 عدد الذكور 」:  ${nu}\n💫「 إجمالي عدد المسؤولين 」: ${qtv} \n「 يتضمن 」:\n${listad}\n💫「 إجمال عدد الرسائل 」: ${sl} رسالة.\n\تم التعديل بواسطة: حسين الملقب ب (صائد الأرواح) رابط فيسبوك https://www.facebook.com/100076269693499`,
						attachment: fs.createReadStream(__dirname + '/cache/1.png')
					},
					event.threadID,
					() => fs.unlinkSync(__dirname + '/cache/1.png'),
					event.messageID
				);
			return request(encodeURI(`${threadInfo.imageSrc}`))
				.pipe(fs.createWriteStream(__dirname + '/cache/1.png'))
				.on('close', () => callback());
 }
};