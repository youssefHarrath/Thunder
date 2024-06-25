const {get} = require("axios"),
    url = "http://eu4.diresnode.com:3301";

module.exports = {
  config: {
    name: "ميد",
    aliases: ["jjk"],
    version: "1.0.0",
    author: "Deku",
    countDown: 0,
    role: 0,
    shortDescription: {
      en: "تحدث مع غوجو",
    },
    longDescription: {
      en: "تحدت مع غوجو",
    },
    category: "الذكاء الإصطناعي",
    guide: {
      en: "غوجو <إسأل> أو غوجو <تنظيف> لكي تقوم بإعاد  التعيين."
    },
  },

  onStart: async function ({ api, event, args }) {
    try {
     let prompt = args.join(' '), id = event.senderID;
           async function r(msg){
                 api.sendMessage(msg, event.threadID, event.messageID)
             }
            if(!prompt) return r("|إدخال ضائع!\n\nإذا كنت تريد إعادة ضبط المحادثة مع "+this.config.name+" يمكنك أن تستعمل  “"+this.config.name+" تنظيف”");
            r("🔍…");
            const res = await get(url+"/midouriya_gpt?prompt="+prompt+"&idd="+id);
                return r(res.data.gojo);
       } catch (error) {
      console.error("Error:", error);
      return api.sendMessage(error.message, event.threadID, event.messageID)
     }
   }
};