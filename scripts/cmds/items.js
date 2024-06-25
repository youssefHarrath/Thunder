const axios = require('axios');
module.exports = {
  config: {
    name: "سلعة",
    author: "jun| Samuel Kâñèñgeè",
    countDown: 2,
    role: 0,
    shortDescription: "قم بشراء واستبدال السلعة",
    category: "إقتصاد",
    guide: {
      en: "{pn} عرض / شراء\n{pn} مشاركة\n{pn} بيع / ثمن"
    }
  },
  onStart: async function ({ message, api, event, args, usersData }) {
    const c = this.config.name;
    const { getPrefix } = global.utils;
    const p = getPrefix(event.threadID);
    const jun = "yourboss12";
    const { senderID } = event;
    const id = senderID;
    const userData = await usersData.get(id);
    const userMoney = await usersData.get(id, "money");
    if (args.length === 0) {              message.reply(`╔════ஜ۩۞۩ஜ═══╗\n \n
أوامر السلعة وكيفية     إستخدامها:\n\n◽${p}${c} عرض\n\n-تعرض السلعة التي تملكها\n\n◽${p}${c} شراء <سلعة> <الكل>\n\nمثال للإستعمال:\n${p}${c} شراء 💎ألماس 2\n◽${p}${c} مشاركة <سلعة> <الكمية> <آيدي>\n\nمثال للإستعمال:\n\n${p}${c} مشاركة 🏅ذهب 3 61550337191223\n\n◽${p}${c} ثمن\n\n-عرض ثمن السلعة list\n\n◽${p}${c} بيع\n\nكيغية الإستخدام: ${p}${c} <السلعة> <الكمية>\n\n╚════ஜ۩۞۩ஜ═══╝`);
      return;
    } 
if (args.length < 1 || (args[0] !== 'مشاركة' && args[0] !== 'شراء' && args[0] !== 'ثمن' && args[0] !== 'عرض' && args[0] !=='بيع')) {
  message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\n
استخدام أمر غير صالح، يرجى استخدام\n${p}${c} مشاركة\n${p}${c} شراء\n${p}${c} ثمن\n${p}${c} عرض\n\n╚════ஜ۩۞۩ஜ═══╝`);
  return;
} else if (args[0] === 
"ثمن") { 
  message.reply("╔════ஜ۩۞۩ஜ═══╗\n\nقائمة الأثمنة\n\n💎ألماس = 10 آلاف دولار\n\n🏅ذهب = 5 آلاف دولار\n\n🥈فضة = ألف دولار\n\n╚════ஜ۩۞۩ஜ═══╝");
return;
} 

if (args[0] === "بيع") {
  const items = ["فضة", "ذهب", "ألماس"];
  const itm = args[1];
  
  if (!items.includes(itm)) {
    message.reply("╔════ஜ۩۞۩ஜ═══╗\n\سلعة غير صالحة\صلعة غير صالحة للبيع: ذهب, فضة, ألماس\n\n╚════ஜ۩۞۩ஜ═══╝");
    return;
  }
  
  const item = args[1];
  const amount = parseInt(args[2]);
    const response = await axios.get(`https://api-test.${jun}.repl.co/item/itm?id=${event.senderID}`);
    const funds = response.data;
    
    const prices = {
      diamond: 100000,
      gold: 50000,
      silver: 10000
    };
    
    const totalPrice = prices[item] * amount;
    
    if (amount <= funds[item]) {
      usersData.set(event.senderID, {
        money: userData.money + totalPrice
      });
      
      await axios.get(`https://api-test.${jun}.repl.co/item?id=${event.senderID}&item=${item}&delete=${amount}`);
      
      api.sendMessage(`╔════ஜ۩۞۩ஜ═══╗\n\nتم البيع بنجاح ${amount} ${item} من أجل ${totalPrice}\n\n╚════ஜ۩۞۩ஜ═══╝`, event.threadID, event.messageID);
    } else {
      api.sendMessage(`╔════ஜ۩۞۩ஜ═══╗\n\nليس لديك مايكفي من ${item} من أجل بيعه\n\n╚════ஜ۩۞۩ஜ═══╝`, event.threadID, event.messageID);
      return;
    }
}
     if (args[0] === "عرض") {
      const response = await axios.get(`https://api-test.${jun}.repl.co/item/itm?id=${id}`);
      const { silver = 0, diamond = 0, gold = 0 } = response.data;
      const s = silver * 10000;
      const d = diamond * 100000;
      const g = gold * 50000;
      const t = s + d + g;
      const f = t.toLocaleString();
      const msg = `╔════ஜ۩۞۩ஜ═══╗\n\n
سلعتك الخاصة:\n🥈فضة: ${silver}\n💎 ألماس: ${diamond}\n🏅ذهب: ${gold}\nالعدد الإجمالي للقيمة: $${f}\n\n╚════ஜ۩۞۩ஜ═══╝`;
      api.sendMessage(msg, event.threadID, event.messageID); 
      return;
    } else if (args[0] === "شراء") {
  if (args.length <3) {
    message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\n
إستعمال غير صالح\n أرحوك إستخدم ${p}${c} شراء <السلعة> <الكمية>
\n\n╚════ஜ۩۞۩ஜ═══╝`);
return;
}
      const item = args[1];
      const total = parseInt(args[2]);
      let price;
      switch (item) {
        case "ذهب":
          price = 50000;
          break;
        case "فضة":
          price = 10000;
          break;
        case "ألماس":
          price = 100000;
          break;
        default:
          message.reply("╔════ஜ۩۞۩ஜ═══╗\n\nسلعة غير صالحة\nالسلع المتاحة هم\n🏅الذهب\n🥈الفضة\n💎الألماس\n\n╚════ஜ۩۞۩ஜ═══╝");
          return;
      }
      if (userMoney < price * total) {
        message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\n
ليس لديك رصيد كافي من أجل شراء  ${item}\n\n╚════ஜ۩۞۩ஜ═══╝`);
        return;
      }
      try {
        await axios.get(`https://api-test.${jun}.repl.co/item?id=${id}&item=${item}&total=${total}`);
        usersData.set(id, {
          money: userData.money - (price * total),
          data: userData.data
        });        api.sendMessage(`تم شراء بنجاح ${total} ${item}`, event.threadID, event.messageID);
        return;
      } catch (error) {
        console.error(error);
        api.sendMessage("حدث خطأ", event.threadID, event.messageID);
      }
    } else if (args[0] === "مشاركة") {
  const Items = ["الفضة", "الذهب", "ألماس"];
  const itm = args[1];
  if (!Items.includes(itm)) {
    message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\n
سلع غير صالحة\nالسلع المتاحة\n🥈الفضة\n🏅الذهب\n💎ألماس\n\n╚════ஜ۩۞۩ஜ═══╝`);
    return;
  }  
  const amount = parseInt(args[2]);
  const uid = parseInt(args[3]);
  if (isNaN(amount) || isNaN(uid)) {
    message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\n
إستخدام غير صالح\n أرجوك إستخدم ${p}${c} مشاركة <السلعة> <الكمية> <الآيدي>\n\n╚════ஜ۩۞۩ஜ═══╝`);
    return;
  }
      const item = args[1];
      const total = parseInt(args[2]);
      const shareId = parseInt(args[3]);
const user = await usersData.get(shareId);
const name = user.name;

      try {
        const response = await axios.get(`https://api-test.${jun}.repl.co/item/itm?id=${event.senderID}`);
        const funds = response.data;
        if (funds[item] >= total) {
          await axios.get(`https://api-test.${jun}.repl.co/item?id=${shareId}&item=${item}&total=${total}`);
          await axios.get(`https://api-test.${jun}.repl.co/item?id=${event.senderID}&item=${item}&delete=${total}`);
          api.sendMessage(`تمت مشاركة ${total} ${item} إلى ${name} بنجاح✅`, event.threadID, event.messageID);
        } else {
          api.sendMessage(`╔════ஜ۩۞۩ஜ═══╗\n\n
ليس لديك ما يكفي ل${item} لمشاركته\n\n╚════ஜ۩۞۩ஜ═══╝`, event.threadID, event.messageID);
        }
      } catch (error) {
        console.error(error);
        api.sendMessage("╔════ஜ۩۞۩ஜ═══╗\n\nحدث خطأ\n\n╚════ஜ۩۞۩ஜ═══╝", event.threadID, event.messageID);
      }
    }
  }
};