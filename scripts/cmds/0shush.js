module.exports = {
config: {
  name: "ردود_الآدمن",
  aurthor:"?/zed",// Convert By Goatbot Zed
   role: 0,
  shortDescription: " ",
  longDescription: "",
  category: "المالك",
  guide: "{pn}"
},
  onStart: async function ({ api, event }) {
  if (event.senderID !== "100076269693499") {
    var aid = ["61556432954740"];
    for (const id of aid) {
    if ( Object.keys(event.mentions) == id) {
      var msg = ["لا تقم بعمل منشن على سيدي، فهو مشغول 😗", "سيدي غير متوفر حاليا 🤧", "آسف ، سيدي غير متصل حاليا لكن هو يكون متصلا عندما أكون أنا متصل لذالك ليس في كل الأوقات 😪","هل يروقك سيدي لهذا قمت بعمل منشن عليه ؟ 😏"," منشن أخرى على سيدي و سألكمك على و جهك 🙂"];
      api.setMessageReaction("⚠️", event.messageID, (err) => {}, true);
      return api.sendMessage({body: msg[Math.floor(Math.random()*msg.length)]}, event.threadID, event.messageID);
    }
    }}
},
  };