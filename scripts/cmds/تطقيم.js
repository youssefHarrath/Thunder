const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "موافقة",
    version: "1.0",
    author: "SANDIP",
    countDown: 5,
    role: 2,
    shortDescription: {
      en: "الموافقة على مجموعة معينة أو إزالته وتخزين تفاصيله."
    },
    longDescription: {
      en: "يتيح لك هذا الأمر الموافقة على مستخدم معين أو إزالته من خلال توفير آيدي الخاص به، وسيتم تخزينه أو إزالته من القائمة المعتمدة."
    },
    category: "المالك",
    guide: {
      en: "من أجل إضافة مجموعة: !إضافة موافقة <آيدي المجموعة>\nمن أجل إزالة مجموعة: !موافقة إزالة <آيدي المجموعة>"
    }
  },

  onStart: async function({ api, event, args, threadsData }) {
    if (args.length !== 2 || !['إضافة', 'إزالة'].includes(args[0].toLowerCase())) {
      return api.sendMessage("تنسيق الأمر غير صالح. الاستخدام:\nلإضافة مجموعة: !موافقة إضافة <آيدي المجموعة>\nمن أجل إزالة مجموعة: !موافقة إزالة <آيدي المجموعة>", event.threadID);
    }

    const action = args[0].toLowerCase();
    const threadID = args[1];
    const approvedThreadsFile = path.join(__dirname, 'approved.json');

    // Load existing approved thread data from the JSON file
    let approvedThreads = {};
    if (fs.existsSync(approvedThreadsFile)) {
      const data = fs.readFileSync(approvedThreadsFile, 'utf8');
      if (data) {
        approvedThreads = JSON.parse(data);
      }
    }

      // Check if the thread exists
      try {
        const threadData = await api.getThreadInfo(threadID);

        // Store thread ID and name in the approvedThreads object
        approvedThreads[threadID] = {
          name: threadData.threadName,
          timestamp: Date.now(),
        };

        // Save updated approvedThreads object back to the JSON file
        fs.writeFileSync(approvedThreadsFile, JSON.stringify(approvedThreads, null, 2), 'utf8');

        // Send a message indicating that the thread is approved
        api.sendMessage(`المجموعة "${threadData.threadName}" (آيدي: ${threadID}) تمت الموافقة عليها وتخزينها.`, event.threadID);
      } catch (error) {
        // If the thread does not exist, send an error message
        api.sendMessage(`خطأ: المجموعة مع آيدي ${threadID} غير موجود.`, event.threadID);
      }
    } else if (action === 'إزالة') {
      // Check if the thread exists in the approved list
      if (approvedThreads[threadID]) {
        const threadName = approvedThreads[threadID].name;

        // Remove the thread from the approvedThreads object
        delete approvedThreads[threadID];

        // Save updated approvedThreads object back to the JSON file
        fs.writeFileSync(approvedThreadsFile, JSON.stringify(approvedThreads, null, 2), 'utf8');

        // Send a message indicating that the thread is removed from the approved list
        api.sendMessage(`المجموعة مع الآيدي ${threadID}, إسم المجموعة: ${threadName} تمت إزالته من القائمة المعتمدة.`, event.threadID);
      } else {
        api.sendMessage(`خطأ: المجموعة مع الآيدي ${threadID} غير موجود في القائمة المعتمدة.`, event.threadID);
      }
    }
  },
};
        