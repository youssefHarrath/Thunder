module.exports = {
  config: {
    name: "اعتراف",
    aliases: ["baby"],
    version: "1.0",
    author: "محب مخلص",
    role: 0,
    category: "حب",
    shortDescription: "إعتراف بمشاعر صادقة",
    longDescription: "",
    guide: {
      vi: "Not Available",
      en: "{p} منشن@"
    }
  },

  onStart: async function ({ api, event, userData, args }) {
    var mention = Object.keys(event.mentions)[0];
    if (!mention) return api.sendMessage(" ⚠️ | قم بعمل  منشن للفناة اللتي تريد الإعتراف لها", event.threadID);
    let name = event.mentions[mention];
    var arraytag = [];
    arraytag.push({ id: mention, tag: name });
    var a = function (a) { api.sendMessage(a, event.threadID); }
    a("أخبرني لماذا تريد أن تستخدم هذا الأمر 😏 <3 :3");
    setTimeout(() => { a({ body: "مرحبًا يا" + " " + name, mentions: arraytag }) }, 2000);
    setTimeout(() => { a({ body: "أنتِ جميلة حقًا 🥰 ولطيفة 🤗 يا " + " " + name, mentions: arraytag }) }, 3000);
    setTimeout(() => { a({ body: "أردت أن أعترف لكِ بشيء يا" + " " + name, mentions: arraytag }) }, 4000);
    setTimeout(() => { a({ body: "إنكِ تعجبينني حقًا يا :<" + " " + name, mentions: arraytag }) }, 5000);
    setTimeout(() => { a({ body: "أرغب في قضاء وقت ممتع برفقتكِ" + " " + name, mentions: arraytag }) }, 6000);
    setTimeout(() => { a({ body: "هل توافقين؟" + " " + name, mentions: arraytag }) }, 7000);
    setTimeout(() => { a({ body: "رغم أنها كلمات قليلة، إلا أنها صادقة وصادقة من قلبي" + " " + name, mentions: arraytag }) }, 8000);
    setTimeout(() => { a({ body: "أحب أن أكون قربك وأشعر بحضورك الدافئ" + " " + name, mentions: arraytag }) }, 9000);
        setTimeout(() => { a({ body: "أحب كيف تبتسمين، فإن ابتسامتك تضيء يومي" + " " + name, mentions: arraytag }) }, 10000);
    setTimeout(() => { a({ body: "أرجو أن تقبلي هذا الإعتراف بصدر رحب" + " " + name, mentions: arraytag }) }, 11000);
    setTimeout(() => { a({ body: "إنكِ تجعلين الحياة أجمل بوجودكِ" + " " + name, mentions: arraytag }) }, 12000);
    setTimeout(() => { a({ body: "لطالما شعرت بسعادة غامرة عندما أكون بجواركِ" + " " + name, mentions: arraytag }) }, 13000);
    setTimeout(() => { a({ body: "أتمنى أن تكوني سعيدة كما أنا عند رؤيتكِ" + " " + name, mentions: arraytag }) }, 14000);
    setTimeout(() => { a({ body: "تشكلين لي كل شيء في هذه اللحظة" + " " + name, mentions: arraytag }) }, 15000);
    setTimeout(() => { a({ body: "إعترافي ليس مجرد كلمات، بل هو شعور صادق" + " " + name, mentions: arraytag }) }, 16000);
    setTimeout(() => { a({ body: "أتمنى أن تقبلي قلبي الذي ينبض لأجلكِ" + " " + name, mentions: arraytag }) }, 17000);
    setTimeout(() => { a({ body: "أنتِ تستحقين كل الحب والسعادة في هذا العالم" + " " + name, mentions: arraytag }) }, 18000);
    setTimeout(() => { a({ body: "أشعر بالحظ الكبير لأنني أحببتكِ" + " " + name, mentions: arraytag }) }, 19000);
    setTimeout(() => { a({ body: "أتمنى أن نستمر في خلق ذكريات جميلة معًا" + " " + name, mentions: arraytag }) }, 20000);
    setTimeout(() => { a({ body: "لدي الكثير لأقدمه لكِ وأتمنى أن تقبلين إعترافي" + " " + name, mentions: arraytag }) }, 21000);
    setTimeout(() => { a({ body: "في عينيكِ أجد جمال الكون وبجانبكِ أشعر بالسعادة" + " " + name, mentions: arraytag }) }, 22000);
    setTimeout(() => { a({ body: "أنتِ السر الذي أريد أن أحمله طوال حياتي" + " " + name, mentions: arraytag }) }, 23000);
    setTimeout(() => { a({ body: "لقد وقعت في حبكِ بكل ما أملك" + " " + name, mentions: arraytag }) }, 24000);
    setTimeout(() => { a({ body: "أنتِ الملاذ الذي أبحث عنه دائمًا" + " " + name, mentions: arraytag }) }, 25000);
    setTimeout(() => { a({ body: "أتمنى أن نستمر في السير سويًا في هذه الرحلة الجميلة" + " " + name, mentions: arraytag }) }, 26000);
    setTimeout(() => { a({ body: "أنتِ تجعلين حياتي أكثر إشراقًا وجمالًا" + " " + name, mentions: arraytag }) }, 27000);
    setTimeout(() => { a({ body: "أنا هنا لأحتفل بكِ وأقدم لكِ كل الحب الذي بداخلي" + " " + name, mentions: arraytag }) }, 28000);
    setTimeout(() => { a({ body: "تعتبرين لي كل شيء، وأرغب في بناء مستقبل مشرق معكِ" + " " + name, mentions: arraytag }) }, 29000);
    setTimeout(() => { a({ body: "شكرًا لأنكِ أنتِ، أحبكِ" + " " + name, mentions: arraytag }) }, 30000);
  }
};

    // يمكنك إضافة المزيد من الجمل هنا 
