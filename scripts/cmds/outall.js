const fs = require('fs');

module.exports = {
  config: {
    name: "مغادرة_الكل",
    aliases: ["الموافقة_فقط"],
    version: "1.0",
    author: "JARiF x MAHIR",
    countDown: 5,
    role: 2,
    category: "المالك"
  },
  onStart: async function ({ api, args, message, event }) {
    const approveList = JSON.parse(fs.readFileSync('groups.json', 'utf8'));

    const threadList = await api.getThreadList(100, null, ["INBOX"]);
    const botUserID = api.getCurrentUserID();

    const unapprovedThreads = [];
    
    const notificationTimeout = 5000; // 5 seconds

    for (const threadInfo of threadList) {
      if (threadInfo.isGroup && threadInfo.threadID !== event.threadID && !approveList.includes(threadInfo.threadID)) {
        unapprovedThreads.push(threadInfo.name || threadInfo.threadID);

        // Send notification before leaving after the timeout
        setTimeout(() => {
          const notificationMessage = ` مجموعتك لم تتم الموافقة عليها بعد أرجوك تحدث مع المالك الخاص بي`;
          api.sendMessage(notificationMessage, threadInfo.threadID);

          // Remove user from group after sending the notification
          setTimeout(() => {
            api.removeUserFromGroup(botUserID, threadInfo.threadID);
          }, notificationTimeout);
        }, notificationTimeout);
      }
    }

    if (unapprovedThreads.length > 0) {
      const unapprovedMessage = `✅تم بنجاح المغادة من المجموعات التي لم تتم الموافقة عليها.`;
      api.sendMessage(unapprovedMessage, event.threadID);
    } else {
      api.sendMessage("❌لم يتم إيجاد أي مجموعة لم تتم الموافقة عليها.", event.threadID);
    }
  }
  }