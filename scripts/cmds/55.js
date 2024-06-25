const moment = require("moment-timezone");
 
let autoAccept = true;
 
module.exports = {
  config: {
    name: "قبول2",
    aliases: ["إضافة"],
    version: "1.0",
    author: "Jm Labaco",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "تكوين صداقات عبر حساب الفيسبوك."
    },
    longDescription: {
      en: "تكوين صداقات عبر حساب الفيسبوك."
    },
    category: "المالك",
    guide: {
      en: "{p}قبول2 "
    }
  },
  onStart: async function ({ api, event, args }) {
    try {
      if (args.length >= 1) {
        if (args[0].toLowerCase() === "تشغيل") {
          autoAccept = true;
          return api.sendMessage("وضع القبول التلقائي لطلبات الصداقة هو شغال الآن.", event.threadID);
        } else if (args[0].toLowerCase() === "إيقاف") {
          autoAccept = false;
          return api.sendMessage("وضع القبول التلقائي لطلبات الصداقة هو منطفئ الآن.", event.threadID);
        }
      }
 
      if (autoAccept) {
        const form = {
          av: api.getCurrentUserID(),
          fb_api_req_friendly_name: "FriendingCometFriendRequestsRootQueryRelayPreloader",
          fb_api_caller_class: "RelayModern",
          doc_id: "4499164963466303",
          variables: JSON.stringify({ input: { scale: 3 } })
        };
 
        const response = await api.httpPost("https://www.facebook.com/api/graphql/", form);
        const responseData = JSON.parse(response);
 
        if (responseData.data && responseData.data.viewer && responseData.data.viewer.friending_possibilities) {
          const listRequest = responseData.data.viewer.friending_possibilities.edges;
          const success = [];
          const failed = [];
 
          for (const user of listRequest) {
            const u = user.node;
            const friendRequestForm = {
              av: api.getCurrentUserID(),
              fb_api_req_friendly_name: "FriendingCometFriendRequestConfirmMutation",
              doc_id: "1472456629576662",
              variables: JSON.stringify({
                input: {
                  friend_requester_id: u.id,
                  action: "confirm"
                }
              })
            };
 
            try {
              const friendRequest = await api.httpPost("https://www.facebook.com/api/graphql/", friendRequestForm);
              const friendRequestData = JSON.parse(friendRequest);
 
              if (!friendRequestData.errors) {
                success.push(u.name);
              } else {
                failed.push(u.name);
              }
            } catch (e) {
              failed.push(u.name);
            }
          }
 
          api.sendMessage(`القبول التلقائي ${success.length} لطلبات الصداقة:\n${success.join("\n")}${failed.length > 0 ? `\nفشل القبول مع شخص ${failed.length}: ${failed.join("\n")}` : ""}`, event.threadID);
        } else {
          api.sendMessage("غير قادر على جلب بيانات طلبات الصداقة.", event.threadID);
        }
      } else {
        api.sendMessage("القبول التلقائي للطلبات الصداقة هو منطفئ في الوقت الراهن.", event.threadID);
      }
    } catch (error) {
      api.sendMessage("حدث خطأ أثناء معالجة طلبك.", event.threadID);
      console.error(error);
    }
  }
};