const DIG = require("discord-image-generation");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "بكاء",
    version: "1.0",
    author: "kshitiz",
    countDown: 1,
    role: 0,
    shortDescription: "",
    longDescription: "",
    category: "متعة",
    guide: "{pn}",
    envConfig: {
      deltaNext: 5
    }
  },

  langs: {
    vi: {
      noTag: "Bạn phải tag người bạn muốn tát"
    },
    en: {
      noTag: " ⚠️ | أرجوك قم بعمل منشن للشخص ما أو رد على رسالته"
    }
  },

  onStart: async function ({ event, message, usersData, args, getLang }) 
  {

    let mention = Object.keys(event.mentions)
    let uid;




    if(event.type == "message_reply"){
    uid = event.messageReply.senderID
    } else{
      if (mention[0]){
        uid = mention[0]
      }else{
        console.log(" jsjsj")
        uid = event.senderID}
    }

let url = await usersData.getAvatarUrl(uid)
let avt = await new DIG.Mikkelsen().getImage(url)



      const pathSave = `${__dirname}/tmp/cry.png`;
  fs.writeFileSync(pathSave, Buffer.from(avt));
    let body = "⚜️ هذا الشخص دائما يجعلني أبكي 😥"
    if(!mention[0]) body="⚜️صديقي أنت تحعل من نفسك أضحوكة \n⚜️ هذا للأنك نسيت أن تعمل منشن للشخص ما أو فقط رد على رسالته"
    message.reply({body:body,
attachment: fs.createReadStream(pathSave)
    }, () => fs.unlinkSync(pathSave));


  }
};