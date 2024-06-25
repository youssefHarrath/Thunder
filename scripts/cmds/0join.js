const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");

module.exports = {
  config: {
    name: "إنضمام2",
    version: "2.0",
    author: "Kshitiz",
    countDown: 5,
    role: 0,
    shortDescription: "قم بالإنضمام إلى المجموعة اللتي يتواجد بها البوت",
    longDescription: "",
    category: "المالك",
    guide: {
      en: "{p}{n}",
    },
  },

  onStart: async function ({ api, event }) {
    try {
      const groupList = await api.getThreadList(10, null, ['INBOX']);

      const filteredList = groupList.filter(group => group.threadName !== null);

      if (filteredList.length === 0) {
        api.sendMessage(' ⚠️ | لم يتم إيجاد اي مجموعة', event.threadID);
      } else {
        const formattedList = filteredList.map((group, index) =>
          `│${index + 1}. ${group.threadName}\n│آيدي المجموعة : ${group.threadID}\n│إجمالي عدد الأعضاء : ${group.participantIDs.length}\n│`
        );
        const message = `╭─╮\n│قائمة المجموعات :\n${formattedList.map(line => `${line}`).join("\n")}\n╰───────────ꔪ\nالحد الأقصى للمجموعات  = 250\n\nقم بالرد بالرقم إلى المحموعة اللتي تريد أن تنضم إليها...`;

        const sentMessage = await api.sendMessage(message, event.threadID);
        global.GoatBot.onReply.set(sentMessage.messageID, {
          commandName: 'إنضمام2',
          messageID: sentMessage.messageID,
          author: event.senderID,
        });
      }
    } catch (error) {
      console.error("Error listing group chats", error);
    }
  },

  onReply: async function ({ api, event, Reply, args }) {
    const { author, commandName } = Reply;

    if (event.senderID !== author) {
      return;
    }

    const groupIndex = parseInt(args[0], 10);

    if (isNaN(groupIndex) || groupIndex <= 0) {
      api.sendMessage(' ❌ |إدخال غير صالح.\nالرجاء توفير رقم صالح.', event.threadID, event.messageID);
      return;
    }

    try {
      const groupList = await api.getThreadList(10, null, ['INBOX']);
      const filteredList = groupList.filter(group => group.threadName !== null);

      if (groupIndex > filteredList.length) {
        api.sendMessage('Invalid group number.\nPlease choose a number within the range.', event.threadID, event.messageID);
        return;
      }

      const selectedGroup = filteredList[groupIndex - 1];
      const groupID = selectedGroup.threadID;

      // Check if the user is already in the group
      const memberList = await api.getThreadInfo(groupID);
      if (memberList.participantIDs.includes(event.senderID)) {
        api.sendMessage(` ⚠️ | أنت توجد في هذه المجموعة سلفا : \n${selectedGroup.threadName}`, event.threadID, event.messageID);
        return;
      }

      // Check if group is full
      if (memberList.participantIDs.length >= 250) {
        api.sendMessage(` ⚠️ | لايمكن إضافتك إلى هذه المجموعة : \n${selectedGroup.threadName}`, event.threadID, event.messageID);
        return;
      }

      await api.addUserToGroup(event.senderID, groupID);
      api.sendMessage(` ✅ | تمت إضافتك إلى هذه المجموعة : ${selectedGroup.threadName}`, event.threadID, event.messageID);
    } catch (error) {
      console.error("Error joining group chat", error);
      api.sendMessage(' ❌ |حدث خطأ أثناء الانضمام إلى الدردشة الجماعية.\nيرجى المحاولة مرة أخرى لاحقًا.', event.threadID, event.messageID);
    } finally {
      global.GoatBot.onReply.delete(event.messageID);
    }
  },
};