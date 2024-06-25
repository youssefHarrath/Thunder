const axios = require('axios');
module.exports = {
  config: {
    name: 'ميمز2',
    aliases: ['nm', 'lol', 'nepmeme'],
    version: '1.0',
    author: 'XENON D SKY',
    countDown: 10,
    role: 0,
    shortDescription: "يرسل لك بعض مقاطع الميمات التي تجعلك تضحك",
    longDescription: "يرسل مقاطع ميمز مضحكة",
    category: 'متعة',
    guide: '{pn} ',
  },

  onStart: async function ({ api, event }) {
    const sentMessage = await api.sendMessage('الميمز الخاص بك يتم تحميله المرحو الإنتظار...!', event.threadID);
    const links = [
       "https://scontent.xx.fbcdn.net/v/t42.3356-2/383724042_6765636183457190_3655301374170574818_n.mp4?_nc_cat=108&ccb=1-7&_nc_sid=060d78&_nc_ohc=Z8crVOh99-YAX-5yiKo&_nc_ht=scontent.xx&oh=03_AdQbULUdnMSAdLZpcfmC0OPkVbSlF5EPRmJmRf0lDgoh1w&oe=6516E393&dl=1",
      "https://scontent.xx.fbcdn.net/v/t42.3356-2/381564731_7489600867723160_7569331092230338355_n.mp4?_nc_cat=107&ccb=1-7&_nc_sid=060d78&_nc_ohc=JB0aHm_czAIAX9kPTpy&_nc_ht=scontent.xx&oh=03_AdTe6FPfend7XcFbP3RchnKnDgjqhwnAzaZv007gvLW65A&oe=65170A86&dl=1",
      "https://scontent.xx.fbcdn.net/v/t42.3356-2/381584337_6907843005904129_2594436598285301661_n.mp4?_nc_cat=108&ccb=1-7&_nc_sid=060d78&_nc_ohc=gQYWePKXTk4AX9jjr5J&_nc_ht=scontent.xx&oh=03_AdRK_W-CVwLmpe3q1mgep16GOMdKBoR1rJ_GnD7tCE5ueA&oe=6516EB05&dl=1",
      "https://scontent.xx.fbcdn.net/v/t42.3356-2/381264791_6805299479508786_1597136830357429_n.mp4?_nc_cat=110&ccb=1-7&_nc_sid=060d78&_nc_ohc=s8ScuJX7IS4AX88G9O_&_nc_ht=scontent.xx&oh=03_AdQ75uO5TWfrHwASpl6smXmQbj8eVz8j6B5wzXv6973uTg&oe=65170F3A&dl=1",
      "https://scontent.xx.fbcdn.net/v/t42.3356-2/381564734_10088117757896522_1169742128529999520_n.mp4?_nc_cat=105&ccb=1-7&_nc_sid=060d78&_nc_ohc=wpaiVlN0yZ8AX_O2r-T&_nc_ht=scontent.xx&oh=03_AdQ3-Gf9WtSW1JsvZsbXpmcI7GFe87ZwcPdQ8u--UTDTwg&oe=6516928F&dl=1",
      "https://scontent.xx.fbcdn.net/v/t42.3356-2/381596156_24606342985619646_4167334554254883985_n.mp4?_nc_cat=100&ccb=1-7&_nc_sid=060d78&_nc_ohc=0V3-dVd0o5kAX8oACgW&_nc_ht=scontent.xx&oh=03_AdS_GCps-bpf9zntnamqZud9ZNNzaDdpDxK7aDrc0ydYrg&oe=6516DA6A&dl=1",
      "https://scontent.xx.fbcdn.net/v/t42.3356-2/381258841_10079668515439986_4077601591169630442_n.mp4?_nc_cat=110&ccb=1-7&_nc_sid=060d78&_nc_ohc=c1D4xeE9UtsAX9v1ZV_&_nc_ht=scontent.xx&oh=03_AdQWd8E6LoXHhz5Fyz0ogynnXM7ll9qMuN2NspWPYtA7kQ&oe=6516DABB&dl=1",
      "https://scontent.xx.fbcdn.net/v/t42.3356-2/381567276_6788406084572547_8546913937641410241_n.mp4?_nc_cat=105&ccb=1-7&_nc_sid=060d78&_nc_ohc=9VmHuZezzvoAX9Su4lF&_nc_ht=scontent.xx&oh=03_AdRpHBXtcR9S7Botu6gPlRMYlCxqmLcp1pd2vxWCyHimKw&oe=65168BB6&dl=1",
      "https://scontent.xx.fbcdn.net/v/t42.3356-2/382785626_6748221518628713_8883691351373966527_n.mp4?_nc_cat=108&ccb=1-7&_nc_sid=060d78&_nc_ohc=S7OlTTARYsgAX-NXoSz&_nc_ht=scontent.xx&oh=03_AdS1nzoMn7sHZa2Ao93WjlGq2Lbtb2aV5Sckjz61W58RWw&oe=6516C137&dl=1",
      "https://scontent.xx.fbcdn.net/v/t42.3356-2/376852438_6720806534623999_2529712162374548314_n.mp4?_nc_cat=104&ccb=1-7&_nc_sid=060d78&_nc_ohc=82urCEZRcbAAX9pmazp&_nc_ht=scontent.xx&oh=03_AdTzyiDl5AXvj2stlVBeyHeRxOO0m72rH79uWxvGPY3Brw&oe=6516B69B&dl=1",
      "https://scontent.xx.fbcdn.net/v/t42.3356-2/381554096_6765560340156167_3829573269446203560_n.mp4?_nc_cat=104&ccb=1-7&_nc_sid=060d78&_nc_ohc=KD7c2L_Vw4IAX9yXpXt&_nc_ht=scontent.xx&oh=03_AdTYLB3PJKJYj8OZ9_uYnmpdnpZNpKQffvn46c_gGGopDA&oe=651694C0&dl=1",
      "https://scontent.xx.fbcdn.net/v/t42.3356-2/382906756_24595974649993461_1184144830084507076_n.mp4?_nc_cat=108&ccb=1-7&_nc_sid=060d78&_nc_ohc=wn780MPiJP0AX9ezLyF&_nc_ht=scontent.xx&oh=03_AdSfbmZB5aNAciGFsJox7Mwr2JaGqX4llTrWCft2s4ej3Q&oe=65169795&dl=1",
      "https://scontent.xx.fbcdn.net/v/t42.3356-2/381558226_6614694401952231_768152488362578162_n.mp4?_nc_cat=108&ccb=1-7&_nc_sid=060d78&_nc_ohc=6-H2z8S46DoAX8BPwS5&_nc_ht=scontent.xx&oh=03_AdQ51__kNr8hYRMETbAPAOOcfN4H7biUMVYKAg6zENXl4w&oe=6516B716&dl=1",
      "https://scontent.xx.fbcdn.net/v/t42.3356-2/381146519_6746228098730567_6982803532075147133_n.mp4?_nc_cat=109&ccb=1-7&_nc_sid=060d78&_nc_ohc=mdXTZYoaHGMAX_iTzWA&_nc_ht=scontent.xx&oh=03_AdRJ0l-14WQqd_3jZ3eqy_xHOo__jcC1kIOKl9oDetU_kg&oe=6516E64E&dl=1",
      "https://scontent.xx.fbcdn.net/v/t42.3356-2/384540554_24202568466008259_8612353153475335587_n.mp4?_nc_cat=110&ccb=1-7&_nc_sid=060d78&_nc_ohc=pxCCl7UgjSEAX_jE0kU&_nc_ht=scontent.xx&oh=03_AdTBgdb5lvlwNZdEEEzTOye7PXGBO2NLhYfrd9ItJuLf5Q&oe=6516F4AF&dl=1",
      "https://scontent.xx.fbcdn.net/v/t42.3356-2/380765337_6537225283012003_5920938439743080605_n.mp4?_nc_cat=102&ccb=1-7&_nc_sid=060d78&_nc_ohc=lU2Z6QnMICoAX_cur_W&_nc_ht=scontent.xx&oh=03_AdSoeV1ouvV3RK8CDxpu2t7sOr_zLfEaAy8qtnV0qP19jg&oe=65172CEB&dl=1",
      "https://scontent.xx.fbcdn.net/v/t42.3356-2/381557511_10017069081699665_7327597231400218854_n.mp4?_nc_cat=110&ccb=1-7&_nc_sid=060d78&_nc_ohc=HWYY75syZeEAX-QxvIp&_nc_ht=scontent.xx&oh=03_AdSVZzvLgKxfQtc1ZRMEHmNjRgKayqWLn0T3XTBEwN-nUA&oe=6516F028&dl=1",
      "https://scontent.xx.fbcdn.net/v/t42.3356-2/381561762_23883597784587978_5238695916820034254_n.mp4?_nc_cat=104&ccb=1-7&_nc_sid=060d78&_nc_ohc=mrqcljlkTbcAX9vjEAC&_nc_ht=scontent.xx&oh=03_AdTjYNIy3-6DOQjlF8YaxnRAoqXPLgM0fd_Tb5ccoKazzQ&oe=65171FFA&dl=1",
      "https://scontent.xx.fbcdn.net/v/t42.3356-2/381557688_6606736746111470_7850870788579689013_n.mp4?_nc_cat=106&ccb=1-7&_nc_sid=060d78&_nc_ohc=SzZw1nK5H60AX-gFPVt&_nc_ht=scontent.xx&oh=03_AdSRMC42iNla7ngvLfYvQOd8H2DaOMUSXpV4zFbuY_ZPMA&oe=65172493&dl=1",
      "https://scontent.xx.fbcdn.net/v/t42.3356-2/381562855_7631145593568146_8447782214683335033_n.mp4?_nc_cat=100&ccb=1-7&_nc_sid=060d78&_nc_ohc=fg9jsh0DNtwAX_Osek8&_nc_ht=scontent.xx&oh=03_AdTtqEGyfHzoRMu0CdPlLWGDFvspYhUK8wZjLCiytjWvSg&oe=651683DC&dl=1",
      "https://scontent.xx.fbcdn.net/v/t42.3356-2/381553744_24037960922485888_6831799114661057277_n.mp4?_nc_cat=100&ccb=1-7&_nc_sid=060d78&_nc_ohc=3jWNjaBxiFAAX_TKpoJ&_nc_ht=scontent.xx&oh=03_AdQ9_xUMvpWnSWNoJFzTDbLBIPw5CuLypi7ZuZwMxZW59A&oe=6516D0A2&dl=1",
      "https://scontent.xx.fbcdn.net/v/t42.3356-2/381559418_6436952389767089_8888221255310580588_n.mp4?_nc_cat=110&ccb=1-7&_nc_sid=060d78&_nc_ohc=2AJ_fuGlYc0AX802341&_nc_ht=scontent.xx&oh=03_AdSHzYDZDb39yl_Mc2bN4UIo1NnMT0wmGE4gsc4JsEQbUw&oe=65169EAB&dl=1",
      "https://scontent.xx.fbcdn.net/v/t42.3356-2/384670884_6952945614726754_8075427564361331868_n.mp4?_nc_cat=109&ccb=1-7&_nc_sid=060d78&_nc_ohc=x-G64_tmJBkAX84RfQB&_nc_ht=scontent.xx&oh=03_AdQlGRBnW1FT_A02iDvbKefPJJm6CwGy3shM-3op6ZdEKA&oe=65172650&dl=1",
      "https://scontent.xx.fbcdn.net/v/t42.3356-2/381562569_6893531224024396_2924176172892708854_n.mp4?_nc_cat=101&ccb=1-7&_nc_sid=060d78&_nc_ohc=77X3XM9hc1sAX8rvj-B&_nc_ht=scontent.xx&oh=03_AdTWKa-FhG8X8jKb9QDG3J2oLupDe6ZIphDKqiWn7Ej9iA&oe=6516D275&dl=1",
      "https://scontent.xx.fbcdn.net/v/t42.3356-2/378569071_6640339206058323_8620003960611949611_n.mp4?_nc_cat=104&ccb=1-7&_nc_sid=060d78&_nc_ohc=Ki-Hz59excwAX-JU-QM&_nc_ht=scontent.xx&oh=03_AdTGFTLyUTpEkk5fxh99MFudsF4W36ZMhQgIuOU_CcdB9A&oe=65174491&dl=1",
      "https://scontent.xx.fbcdn.net/v/t42.3356-2/381541796_6449511415161594_2731398459822995965_n.mp4?_nc_cat=100&ccb=1-7&_nc_sid=060d78&_nc_ohc=W0PfFvb-P04AX-RAPsd&_nc_ht=scontent.xx&oh=03_AdTkqS4ht7BfCfdM-gPeNLwpSwYXjFQsIVCPawnsn00qog&oe=6516B70F&dl=1",
      "https://scontent.xx.fbcdn.net/v/t42.3356-2/382897561_10064974516909785_1632578723940877297_n.mp4?_nc_cat=103&ccb=1-7&_nc_sid=060d78&_nc_ohc=e7qJ49YQtyUAX_pcF3F&_nc_ht=scontent.xx&oh=03_AdSYYHFHODfWz3EYbq82S6WL4oNqtXrBrpd7ZTrcOJHivQ&oe=65174398&dl=1",
      "https://scontent.xx.fbcdn.net/v/t42.3356-2/381561775_6730071427069673_5086792926224774700_n.mp4?_nc_cat=102&ccb=1-7&_nc_sid=060d78&_nc_ohc=SxpQ6C4qHqgAX_JAbQ2&_nc_ht=scontent.xx&oh=03_AdTxL3dxKzhlIZTT41E7hZoLIbGPJMK-OTlg5OcHblENkg&oe=65174077&dl=1",
      "https://scontent.xx.fbcdn.net/v/t42.3356-2/380946906_7460777183936708_6765234685390118559_n.mp4?_nc_cat=103&ccb=1-7&_nc_sid=060d78&_nc_ohc=NVZt7giZrtkAX-MNC3R&_nc_ht=scontent.xx&oh=03_AdTQ00SMPb_bWQ0hftOplr5b3ra4-V7AXDlb880u_DLwVQ&oe=651744CB&dl=1",
      "https://scontent.xx.fbcdn.net/v/t42.3356-2/381288309_6568432896539404_5437048348770862072_n.mp4?_nc_cat=102&ccb=1-7&_nc_sid=060d78&_nc_ohc=i-VOQF6kpoYAX_9wavw&_nc_ht=scontent.xx&oh=03_AdR43lFww6aQpEuAeSIwcyeTloj0agovxLOhP6LHhAf8wg&oe=65172723&dl=1"// Add all your meme video links here
    ];

    try {
      const randomIndex = Math.floor(Math.random() * links.length);
      const randomVideo = links[randomIndex];

      const response = await axios.get(randomVideo, { responseType: 'stream' });

      await api.sendMessage({
        body: 'اهو الميمز الخاص بك إستمتع 🤓',
        attachment: response.data,
      }, event.threadID);
    } catch (error) {
      console.error('Error fetching meme:', error.message);
      api.sendMessage('آسف لم أستطع أن أجلب مقطع الميمز حاول مرة أخرى 😔.', event.threadID);
    } finally {
      // Remove the loading message after 400 milliseconds
      setTimeout(() => {
        api.unsendMessage(sentMessage.messageID);
      }, 400);
    }
  },
};