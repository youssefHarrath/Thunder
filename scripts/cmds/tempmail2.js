const axios = require("axios");

module.exports = {
config: {
		name: "بريد_مؤقت2",
    version: "1.0",
		author: "samir",
		countDown: 5,
		role: 2,
		shortDescription: "فقط احصل على البريد في غضون 10 دقائق",
		longDescription: "فقط احصل على البريد في غضون 10 دقائق",
		category: "المالك",
		guide: {
      en: "{p}{n}",
    }
	},

 onStart: async function ({ api, event, args }) {
   if (args[0] == "جديد") {
		const res = await axios.get(`https://10minutemail.net/address.api.php?new=1`);
	var user = res.data.mail_get_user;
	var host = res.data.mail_get_host;
	var time = res.data.mail_get_time;
	var stime = res.data.mail_server_time;
	var kmail = res.data.mail_get_key;
	var ltime = res.data.mail_left_time;
	var mid = res.data.mail_list[0].mail_id;
var sub = res.data.mail_list[0].subject;
var date = res.data.mail_list[0].datetime2;
	return api.sendMessage(`»إسم البريد الإلكتروني: ${user}\n»يستضيف: ${host}\n»البريد الإلكتروني ${user}@${host} (.)com\n»الوفت: ${time}\n»وقت الخدمة: ${stime}\n»المفتاح: ${kmail}\n»وقت التذكير: ${ltime}s\n»آيدي البريد الإلكتروني : ${mid}\n»المحتوى ${sub}\n»التاريخ: ${date}`, event.threadID, event.messageID)
}
else if (args[0] == "قائمة") {
		const res = await axios.get(`https://www.phamvandienofficial.xyz/mail10p/domain`);
	var list = res.data.domain
	return api.sendMessage(`مجال القائمة: \n${list}`, event.threadID, event.messageID)
}
else if (args[0] == "المزيد") {
 const res = await axios.get(`https://10minutemail.net/address.api.php?more=1`);
	var user = res.data.mail_get_user;
	var host = res.data.mail_get_host;
	var time = res.data.mail_get_time;
	var stime = res.data.mail_server_time;
	var kmail = res.data.mail_get_key;
	var ltime = res.data.mail_left_time;
	var mid = res.data.mail_list[0].mail_id;
var sub = res.data.mail_list[0].subject;
var date = res.data.mail_list[0].datetime2;
	return api.sendMessage(`»إسم البريد الإلكتروني: ${user}\n»يستضيف: ${host}\n»البريد الالكتروني ${user}@${host} (.)com\n»الوقت: ${time}\n»وقت الخدمة: ${stime}\n»المفتاح: ${kmail}\n»وقت التذكير: ${ltime}s\n»آيدي البريد الإلكتروني: ${mid}\n»المحتوى ${sub}\n»التاريخ: ${date}`, event.threadID, event.messageID)
}
else if (args[0] == "أحصل") {
	 var get = await  axios.get(`https://10minutemail.net/address.api.php`)
      var data = get.data
      var mail = data.mail_get_mail,
        id = data.session_id,
        url = data.permalink.url,
        key_mail = data.permalink.key
      let urlMail = url.replace(/\./g,' . ')
      let maill = mail.replace(/\./g,' . ')
      return api.sendMessage(`» البريد الإلكتروني: ${maill}\n» آيدي البريد الإلكتروني: ${id}\n» رابط البريد الإلكتروني: ${urlMail}\n» مفتاح البريد: ${key_mail}`, event.threadID, event.messageID)}
else if (args[0] == "تفقد") {
	var get = await  axios.get(`https://10minutemail.net/address.api.php`)
      var data = get.data.mail_list[0]
      var email = get.data.mail_get_mail
      var id = data.mail_id,
        from = data.from,
        subject = data.subject,
        time = data.datetime2
      let formMail = from.replace(/\./g,' . ')
      let maill = email.replace(/\./g,' . ')
      return api.sendMessage(`» البريد الإلكتروني: ${maill}\n» آيدي البريد الإلكتروني: ${id}\n» من: ${formMail}\n» العنوان: ${subject}\n» ${time}`, event.threadID, event.messageID)}
else if (args.join() == "") { 
	  return api.sendMessage(`جديد - لإنشاء بريد الكتروني جديد\n
تفقد - من أجل تفقد صندوق الورائد \n
أحصل - تحصل على البريد الحالي \n
-------------------------\n\n
يمكنك النقر على عنوان رابط للبريد وإدخال مفتاح البريد لرؤية محتوى البريد. `, event.threadID, event.messageID)} 
 }
};