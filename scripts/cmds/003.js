const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");
module.exports = {
	config: {
		name: "أڤتار2",
		version: "1.0",
		author: "Xemon.",
		countDown: 10,
		role: 0,
		shortDescription: "قم بإنشاء خلفية فيسبوك",
		longDescription: "",
		category: "صور",
		guide: {
			en: "{p}{n}  الإسم أو الرمز | النص | النص",
		}
	},

  

	onStart: async function ({ message, args, event, api }) {
 
    const info = args.join(" ");
		if (!info){
			return message.reply(` ⚠️ | أرحوك قم بإدخالها بهذه السيغة:\n/أڤتار  الإسم أو الرمز | النص | النص`);
      
      }else {
      const msg = info.split("|");
      const id = msg[0];
    const name = msg[1];
    const juswa = msg[2];

        

       if (isNaN(id)) { // If input is not a number
          await message.reply(" ⏱️ | جاري معالحة الطلب الخاص بك سينباي المرجو الانتظار");

         let id1;
    try {
        id1 = (await axios.get(`https://www.nguyenmanh.name.vn/api/searchAvt?key=${id}`)).data.result.ID; 
    } catch (error) {
      await message.reply(" ⚠️ |لم يتم العثور على الشخصية، يرجى التحقق من الاسم والمحاولة مرة أخرى...");
      return;
    }

        const img = (`https://www.nguyenmanh.name.vn/api/avtWibu3?id=${id1}&tenchinh=${name}&tenphu=${juswa}&apikey=CF9unN3H`)			
                 const form = {
				body: `إليك الأڤتار الخاص بك ✨`
			};
				form.attachment = []
				form.attachment[0] = await global.utils.getStreamFromURL(img);
			message.reply(form); 
         
      

       }else  { 
       await message.reply(" ⏱️ |جاري معالجة طلبك يرحى الإنتظار....");
         
         const img = (`https://www.nguyenmanh.name.vn/api/avtWibu3?id=${id}&tenchinh=${name}&tenphu=${juswa}&apikey=CF9unN3H`)			
                 const form = {
				body: ` ✅ | إليك الأڤتار الخاص بك`
			};
				form.attachment = []
				form.attachment[0] = await global.utils.getStreamFromURL(img);
			message.reply(form); 
        }
      }
    }
   }; 