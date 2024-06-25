
const axios = require('axios');

module.exports = {
 config: {
 name: "ويكيبيديا",
 author: "JVB",
 version: "1.0",
 shortDescription: "احصل على معلومات من ويكيبيديا باستخدام واجهة برمجة التطبيقات (API) الخاصة بها",
 longDescription: "ابحث عن معلومات حول موضوع ما باستخدام واجهة برمجة تطبيقات ويكيبيديا وقم بإرجاع ملخص أو محتوى الصفحة بالكامل.",
 category: "خدمات",
 guide: {
 vi: "",
 ar: "أجوبة من ويكيبيديا"
 }
 },

 onStart: async function({ args, message, getLang }) {
 try {
 const query = args.join(' ');
 const format = 'json'; // Format of the API response (can be json, xml, or wikitext)
 const url = `https://ar.wikipedia.org/w/api.php?action=query&format=${format}&prop=extracts&exintro&explaintext&titles=${query}`;

 const { data } = await axios.get(url);
 const page = Object.values(data.query.pages)[0];

 if (!page.hasOwnProperty('missing')) {
 const summary = page.extract.split('\n')[0]; // Get the first sentence of the extract as summary
 const content = page.extract;

 return message.reply({body: `إليك ما وجدته في ويكيبيديا عنه "${query}":\n\n${summary}\n\nاقرأ المزيد: ${page.fullurl}`, attachment: null}); // You can use the attachment parameter to send an image along with the message
 } else {
 return message.reply(` 🔴 |عذرًا، لم أتمكن من العثور على أي معلومات حول "${query}" على ويكيبيديا.`);
 }
 } catch (error) {
 console.error(error);
 return message.reply("آسف، لم أتمكن من العثور على أي معلومات حول هذا الموضوع.");
 }
 }
   }