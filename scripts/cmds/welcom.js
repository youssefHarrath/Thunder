const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "قبول",
    aliases: ['acp'],
    version: "1.0",
    author: "JV Barcenas",
    countDown: 8,
    role: 2,
    shortDescription: "قبول المستخدمين",
    longDescription: "قبول المستخدمين",
    category: "خدمات",
  },

  onReply: async function ({ message, Reply, event, api, commandName }) {
    const { author, listRequest, messageID } = Reply;
    if (author !== event.senderID) return;
    const args = event.body.replace(/ +/g, " ").toLowerCase().split(" ");

    clearTimeout(Reply.unsendTimeout); // Clear the timeout if the user responds within the countdown duration

    const form = {
      av: api.getCurrentUserID(),
      fb_api_caller_class: "RelayModern",
      variables: {
        input: {
          source: "friends_tab",
          actor_id: api.getCurrentUserID(),
          client_mutation_id: Math.round(Math.random() * 19).toString()
        },
        scale: 3,
        refresh_num: 0
      }
    };

    const success = [];
    const failed = [];

    if (args[0] === "إضافة") {
      form.fb_api_req_friendly_name = "FriendingCometFriendRequestConfirmMutation";
      form.doc_id = "3147613905362928";
    }
    else if (args[0] === "إزالة") {
      form.fb_api_req_friendly_name = "FriendingCometFriendRequestDeleteMutation";
      form.doc_id = "4108254489275063";
    }
    else {
      return api.sendMessage("الرجاء التحديد <إضافة | إزالة > <الرقم المستهدف | أو \"الكل\">", event.threadID, event.messageID);
    }

    let targetIDs = args.slice(1);

    if (args[1] === "الكل") {
      targetIDs = [];
      const lengthList = listRequest.length;
      for (let i = 1; i <= lengthList; i++) targetIDs.push(i);
    }

    const newTargetIDs = [];
    const promiseFriends = [];

    for (const stt of targetIDs) {
      const u = listRequest[parseInt(stt) - 1];
      if (!u) {
        failed.push(`Can't find stt ${stt} in the list`);
        continue;
      }
      form.variables.input.friend_requester_id = u.node.id;
      form.variables = JSON.stringify(form.variables);
      newTargetIDs.push(u);
      promiseFriends.push(api.httpPost("https://www.facebook.com/api/graphql/", form));
      form.variables = JSON.parse(form.variables);
    }

    const lengthTarget = newTargetIDs.length;
    for (let i = 0; i < lengthTarget; i++) {
      try {
        const friendRequest = await promiseFriends[i];
        if (JSON.parse(friendRequest).errors) {
          failed.push(newTargetIDs[i].node.name);
        }
        else {
          success.push(newTargetIDs[i].node.name);
        }
      }
      catch (e) {
        failed.push(newTargetIDs[i].node.name);
      }
    }

    if (success.length > 0) {
      api.sendMessage(`» The ${args[0] === 'إضافة' ? 'طلبات الأصدقاء' : 'حذف طلب الصداقة'} تمت معالجتها ل ${success.length} الناس:\n\n${success.join("\n")}${failed.length > 0 ? `\n» الأتى ${failed.length} واجه الناس أخطاء: ${failed.join("\n")}` : ""}`, event.threadID, event.messageID);
    } else {
      api.unsendMessage(messageID); // Unsend the message if the response is incorrect
      return api.sendMessage("استجابة غير صالحة. يرجى تقديم إجابة صالحة.", event.threadID);
    }

    api.unsendMessage(messageID); // Unsend the message after it has been processed
  },

  onStart: async function ({ event, api, commandName }) {
    const form = {
      av: api.getCurrentUserID(),
      fb_api_req_friendly_name: "FriendingCometFriendRequestsRootQueryRelayPreloader",
      fb_api_caller_class: "RelayModern",
      doc_id: "4499164963466303",
      variables: JSON.stringify({ input: { scale: 3 } })
    };
    const listRequest = JSON.parse(await api.httpPost("https://www.facebook.com/api/graphql/", form)).data.viewer.friending_possibilities.edges;
    let msg = "";
    let i = 0;
    for (const user of listRequest) {
      i++;
      msg += (`\n${i}. الإسم: ${user.node.name}`
        + `\nالآيدي: ${user.node.id}`
        + `\nالرابط: ${user.node.url.replace("www.facebook", "fb")}`
        + `\nالوقت: ${moment(user.time * 1009).tz("Aftica/Casablanca").format("DD/MM/YYYY HH:mm:ss")}\n`);
    }
    api.sendMessage(`${msg}\nقم بالرد على هذه الرسالة بالمحتوى: <إضافة | إزالة> <مقارنة | أو "الكل"> لاتخاذ الإجراءات اللازمة`, event.threadID, (e, info) => {
      global.GoatBot.onReply.set(info.messageID, {
        commandName,
        messageID: info.messageID,
        listRequest,
        author: event.senderID,
        unsendTimeout: setTimeout(() => {
          api.unsendMessage(info.messageID); // Unsend the message after the countdown duration
        }, this.config.countDown * 1000) // Convert countdown duration to milliseconds
      });
    }, event.messageID);
  }
};