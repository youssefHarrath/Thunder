module.exports = {
  config: {
    name: "سؤال_ديني",
    version: "1.0",
    author: "يوسف",
    role: 0,
    countdown: 10,
    reward: Math.floor(Math.random() * (100 - 50 + 1) + 50),
    category: "لعبة",
    shortDescription: {
      en: "لعبة حزورة"
    },
    longDescription: {
      en: "لعبة حزورة تعتمد على اختيار الإجابة الصحيحة من بين خيارات متعددة."
    },
    guide: {
      en: "{prefix}حزورة - ابدأ لعبة الحزورة"
    }
  },

  onStart: async function ({ message, event, commandName }) {
    // هنا تضع الأسئلة مباشرة بدلاً من استدعائها من ملف خارجي
    const questions = [
    {
    question: "ما هو اسم النبي الذي صنع الفلك؟",
    options: { 1: "إبراهيم", 2: "نوح", 3: "موسى", 4: "عيسى" },
    correctOption: 2
  },
  {
    question: "من هو الصحابي الذي دافع عن النبي في غزوة أحد حتى كسرت أسنانه؟",
    options: { 1: "علي بن أبي طالب", 2: "أبو بكر الصديق", 3: "طلحة بن عبيد الله", 4: "حمزة بن عبد المطلب" },
    correctOption: 3
  },
  {
    question: "ما هو الاسم الذي أطلق على مجموعة المسلمين الذين هاجروا إلى الحبشة؟",
    options: { 1: "الأنصار", 2: "المهاجرون", 3: "المسلمون", 4: "القرشيون" },
    correctOption: 2
  },
  {
    question: "من هو الصحابي الذي بشره النبي بالجنة وهو يمشي على الأرض؟",
    options: { 1: "علي بن أبي طالب", 2: "عثمان بن عفان", 3: "عبد الرحمن بن عوف", 4: "أبو بكر الصديق" },
    correctOption: 2
  },
  {
    question: "ما هو اسم السورة التي نزلت كاملة مرة واحدة؟",
    options: { 1: "سورة البقرة", 2: "سورة الكهف", 3: "سورة الفاتحة", 4: "سورة يوسف" },
    correctOption: 3
  },
  {
    question: "من هو النبي الذي سمي بخاتم الأنبياء؟",
    options: { 1: "موسى", 2: "عيسى", 3: "محمد", 4: "إبراهيم" },
    correctOption: 3
  },
  {
    question: "ما هو الاسم الذي أطلق على بيت العنكبوت في القرآن؟",
    options: { 1: "العنكبوت", 2: "الشبكة", 3: "الخيط", 4: "النسج" },
    correctOption: 1
  },
  {
    question: "من هو الصحابي الذي لقب بـ 'سيف الله المسلول'؟",
    options: { 1: "عمر بن الخطاب", 2: "خالد بن الوليد", 3: "علي بن أبي طالب", 4: "أبو عبيدة بن الجراح" },
    correctOption: 2
  },
  {
    question: "ما هو أول ما نزل من القرآن الكريم؟",
    options: { 1: "سورة الفاتحة", 2: "سورة العلق", 3: "سورة البقرة", 4: "سورة الناس" },
    correctOption: 2
  },
  {
    question: "ما هو الكتاب الذي أنزل على النبي داود عليه السلام؟",
    options: { 1: "التوراة", 2: "الإنجيل", 3: "الزبور", 4: "القرآن" },
    correctOption: 3
  },
  {
    question: "ما هو أول مسجد بُني في الإسلام؟",
    options: { 1: "المسجد الحرام", 2: "المسجد النبوي", 3: "مسجد قباء", 4: "المسجد الأقصى" },
    correctOption: 3
  },
  {
    question: "من هو النبي الذي كلمه الله مباشرة؟",
    options: { 1: "إبراهيم", 2: "موسى", 3: "عيسى", 4: "محمد" },
    correctOption: 2
  },
  {
    question: "ما هي السورة التي تسمى عروس القرآن؟",
    options: { 1: "سورة الرحمن", 2: "سورة الفاتحة", 3: "سورة البقرة", 4: "سورة الكهف" },
    correctOption: 1
  },
  {
    question: "ما هو اسم النبي الذي عاش في بطن الحوت؟",
    options: { 1: "يونس", 2: "إبراهيم", 3: "موسى", 4: "نوح" },
    correctOption: 1
  },
  {
    question: "ما هو اسم والد النبي إبراهيم؟",
    options: { 1: "آزر", 2: "تارح", 3: "عبد الله", 4: "عمران" },
    correctOption: 1
  },
  {
    question: "ما هي السورة التي تُعرف باسم سورة التوديع؟",
    options: { 1: "سورة الفاتحة", 2: "سورة الإخلاص", 3: "سورة النصر", 4: "سورة الكوثر" },
    correctOption: 3
  },
  {
    question: "من هو النبي الذي ولد بدون أب؟",
    options: { 1: "إبراهيم", 2: "نوح", 3: "عيسى", 4: "موسى" },
    correctOption: 3
  },
  {
    question: "ما هي المعجزة التي أُعطيت للنبي صالح؟",
    options: { 1: "الناقة", 2: "العصا", 3: "البحر", 4: "السماء" },
    correctOption: 1
  },
  {
    question: "ما هو اسم الكتاب السماوي الذي أنزل على النبي موسى؟",
    options: { 1: "الإنجيل", 2: "التوراة", 3: "الزبور", 4: "القرآن" },
    correctOption: 2
  },
  {
    question: "ما هو اسم أم النبي موسى؟",
    options: { 1: "آسيا", 2: "مريم", 3: "هاجر", 4: "يوكابد" },
    correctOption: 4
  },
  {
    question: "ما هو الحيوان الذي ركب عليه النبي محمد ﷺ في رحلة الإسراء والمعراج؟",
    options: { 1: "الجمل", 2: "البراق", 3: "الحصان", 4: "الحمار" },
    correctOption: 2
  },
  {
    question: "من هو الصحابي الذي لُقب بأسد الله؟",
    options: { 1: "علي بن أبي طالب", 2: "عمر بن الخطاب", 3: "حمزة بن عبد المطلب", 4: "أبو بكر الصديق" },
    correctOption: 3
  },
  {
    question: "ما هو الشهر الذي يصوم فيه المسلمون؟",
    options: { 1: "رجب", 2: "شعبان", 3: "رمضان", 4: "ذو الحجة" },
    correctOption: 3
  },
  {
    question: "من هو النبي الذي أُلقي في النار ولم يحترق؟",
    options: { 1: "إبراهيم", 2: "موسى", 3: "عيسى", 4: "يوسف" },
    correctOption: 1
  },
  {
    question: "ما هي السورة التي تعدل ثلث القرآن؟",
    options: { 1: "سورة البقرة", 2: "سورة الإخلاص", 3: "سورة الفاتحة", 4: "سورة الكهف" },
    correctOption: 2
  },
  {
    question: "ما هي أول صلاة فرضت على الرسول ﷺ؟",
    options: { 1: "صلاة الفجر", 2: "صلاة الظهر", 3: "صلاة العصر", 4: "صلاة المغرب" },
    correctOption: 1
  },
  {
    question: "من هو أول خليفة للمسلمين؟",
    options: { 1: "عمر بن الخطاب", 2: "عثمان بن عفان", 3: "علي بن أبي طالب", 4: "أبو بكر الصديق" },
    correctOption: 4
  },
  {
    question: "كم عدد سور القرآن الكريم؟",
    options: { 1: "114", 2: "110", 3: "100", 4: "120" },
    correctOption: 1
  },
  {
    question: "ما هو ترتيب شهر رمضان في الشهور الهجرية؟",
    options: { 1: "الأول", 2: "التاسع", 3: "السابع", 4: "الثالث" },
    correctOption: 2
  },
  {
    question: "ما هي الكلمة الأكثر تكراراً في القرآن؟",
    options: { 1: "الله", 2: "محمد", 3: "الرحمن", 4: "الرحيم" },
    correctOption: 1
  },
  {
    question: "ما هو المسجد الذي أسري بالرسول إليه؟",
    options: { 1: "المسجد الحرام", 2: "المسجد النبوي", 3: "المسجد الأقصى", 4: "مسجد قباء" },
    correctOption: 3
  },
  {
    question: "من هو أول مؤذن في الإسلام؟",
    options: { 1: "بلال بن رباح", 2: "أبو بكر الصديق", 3: "عمر بن الخطاب", 4: "علي بن أبي طالب" },
    correctOption: 1
  },
  {
    question: "كم عدد الأنبياء الذين ذكروا في القرآن؟",
    options: { 1: "20", 2: "25", 3: "30", 4: "35" },
    correctOption: 2
  },
  {
    question: "ما هو الدعاء الذي يقال عند لبس الثوب؟",
    options: { 1: "الحمد لله الذي كساني هذا الثوب", 2: "اللهم بارك لنا فيه", 3: "سبحان الذي سخر لنا هذا", 4: "اللهم اجعلني من الشاكرين" },
    correctOption: 1
  },
  {
    question: "من هو النبي الذي ابتلعه الحوت؟",
    options: { 1: "موسى", 2: "عيسى", 3: "يونس", 4: "إبراهيم" },
    correctOption: 3
  },
  {
    question: "ما هي أطول سورة في القرآن؟",
    options: { 1: "سورة البقرة", 2: "سورة آل عمران", 3: "سورة النساء", 4: "سورة الكهف" },
    correctOption: 1
  },
  {
    question: "ما اسم والدة النبي محمد ﷺ؟",
    options: { 1: "آمنة", 2: "فاطمة", 3: "خديجة", 4: "حليمة" },
    correctOption: 1
  },
  {
    question: "ما هو اسم النبي الذي بُعث إلى بني إسرائيل؟",
    options: { 1: "موسى", 2: "عيسى", 3: "إبراهيم", 4: "شعيب" },
    correctOption: 1
  },
  {
    question: "ما هي السورة التي تبدأ بآية {يس}؟",
    options: { 1: "سورة يس", 2: "سورة ص", 3: "سورة النمل", 4: "سورة الإخلاص" },
    correctOption: 1
  },
  {
    question: "كم عدد ركعات صلاة الفجر؟",
    options: { 1: "4", 2: "2", 3: "3", 4: "5" },
    correctOption: 2
  },
  {
    question: "ما هو اسم الجبل الذي نزلت عليه الشريعة الإسلامية؟",
    options: { 1: "جبل أحد", 2: "جبل النور", 3: "جبل الرحمة", 4: "جبل الصفا" },
    correctOption: 2
  },
  {
    question: "ما هو اسم الصحابي الذي لقب بـ 'أمين الأمة'؟",
    options: { 1: "أبو بكر الصديق", 2: "عمر بن الخطاب", 3: "عثمان بن عفان", 4: "عبد الله بن عمر" },
    correctOption: 3
  },
  {
    question: "ما هي السورة التي تحتوي على بسم الله الرحمن الرحيم مرتين؟",
    options: { 1: "سورة النمل", 2: "سورة الفاتحة", 3: "سورة الإخلاص", 4: "سورة الكهف" },
    correctOption: 1
  },
  {
    question: "ما اسم زوجة النبي محمد ﷺ التي أنجبت له أكبر أبنائه؟",
    options: { 1: "خديجة", 2: "عائشة", 3: "سودة", 4: "حفصة" },
    correctOption: 1
  },
  {
    question: "ما هو اسم الكتاب الذي أنزل على النبي عيسى عليه السلام؟",
    options: { 1: "الإنجيل", 2: "التوراة", 3: "الزبور", 4: "القرآن" },
    correctOption: 1
  },
  {
    question: "من هو النبي الذي بُعث إلى قوم عاد؟",
    options: { 1: "موسى", 2: "شعيب", 3: "هود", 4: "إبراهيم" },
    correctOption: 3
  },
  {
    question: "ما هو عدد الأركان الأساسية في الإسلام؟",
    options: { 1: "5", 2: "6", 3: "4", 4: "7" },
    correctOption: 1
  },
  {
    question: "ما هو اسم الصحابي الذي جمع القرآن في مصحف واحد؟",
    options: { 1: "أبو بكر الصديق", 2: "عمر بن الخطاب", 3: "عثمان بن عفان", 4: "علي بن أبي طالب" },
    correctOption: 3
  },
  {
    question: "ما هي السورة التي يُطلق عليها 'قلب القرآن'؟",
    options: { 1: "سورة البقرة", 2: "سورة الفاتحة", 3: "سورة الإخلاص", 4: "سورة الكهف" },
    correctOption: 1
  },
  {
    question: "ما هو اسم نهر الجنة؟",
    options: { 1: "النهر الكريم", 2: "النهر المبارك", 3: "النهر الذي ذكر في القرآن", 4: "النهر الذي أنزلت عليه السماء" },
    correctOption: 3
  },
  {
    question: "من هو النبي الذي دُفن في مكة؟",
    options: { 1: "إبراهيم", 2: "محمد", 3: "موسى", 4: "عيسى" },
    correctOption: 2
  },
  {
    question: "ما هي الصلاة التي تسبق صلاة الفجر؟",
    options: { 1: "صلاة الظهر", 2: "صلاة العصر", 3: "صلاة المغرب", 4: "صلاة السنة الفجر" },
    correctOption: 4
  }, 
    ];

    if (!Array.isArray(questions) || questions.length === 0) {
      return message.reply("❌ | لم يتم العثور على أسئلة.");
    }

    const randomQuestionObj = questions[Math.floor(Math.random() * questions.length)];

    let optionsText = '';
    for (const [key, value] of Object.entries(randomQuestionObj.options)) {
      optionsText += `\n${key}: ${value}`;
    }

    message.reply(`❛ ━━━━━･❪ 🌠 ❫ ･━━━━━ ❜\n⚜️ | ${randomQuestionObj.question}\n${optionsText}\n🔖 | قم بالرد بالرقم على الإجابة الصحيحة\n❛ ━━━━━･❪ 🌠 ❫ ･━━━━━ ❜`, (err, info) => {
      if (err) {
        return message.reply("❌ | حدث خطأ أثناء إرسال الرسالة.");
      }
      global.GoatBot.onReply.set(info.messageID, {
        commandName,
        messageID: info.messageID,
        author: event.senderID,
        correctOption: randomQuestionObj.correctOption,
        options: Object.keys(randomQuestionObj.options)
      });
    });
  },

  onReply: async ({ message, Reply, event, usersData, api, commandName }) => {
    const { author, messageID, correctOption, options } = Reply;
    const userAnswer = event.body.trim();

    if (event.senderID !== author) return;

    if (options.includes(userAnswer) && parseInt(userAnswer) == correctOption) {
      global.GoatBot.onReply.delete(messageID);
      message.unsend(event.messageReply.messageID);
      const reward = Math.floor(Math.random() * (100 - 50 + 1) + 50);
      await usersData.addMoney(event.senderID, reward);
      const userName = await api.getUserInfo(event.senderID);
      message.reply(`تهانينا 🎉🎊 يا ${userName[event.senderID].name}، لقد أجبت بشكل صحيح وفزت بمبلغ قدره ${reward} دولار 💵 !`);
      api.setMessageReaction("✅", event.messageID, (err) => {}, true);
    } else {
      api.setMessageReaction("❌", event.messageID, (err) => {}, true);
    }
  }
};
