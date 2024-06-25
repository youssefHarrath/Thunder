const DIG = require('discord-image-generation');
const https = require('https');
const fs = require('fs');

module.exports = {
  config: {
    name: 'هيتلر',
    version: '1.0',
    author: 'AceGun',
    description: 'قم بإنشاء صورة بتأثير هتلر المطبق على المستخدم  وأڤتاره.',
    category: 'وسائط',
    usage: '{prefix}هيتلر',
  },

  onStart: async function ({ event, api }) {
    const avatarUrl = `https://graph.facebook.com/${event.senderID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
    const avatar = await fetchImage(avatarUrl);
    const hitlerImage = await new DIG.Hitler().getImage(avatar);
    const pathHitler = __dirname + '/cache/hitler.png';
    fs.writeFileSync(pathHitler, hitlerImage);
    api.sendMessage({
      attachment: fs.createReadStream(pathHitler),
      body: 'هذا الرجل أسوأ من هتلر!'
    }, event.threadID, (err, messageInfo) => {
      if (err) {
        console.error(err);
      }
      fs.unlinkSync(pathHitler); // Remove the generated image file after sending
    });
  }
};

function fetchImage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 302 && res.headers.location) {
        fetchImage(res.headers.location)
          .then(resolve)
          .catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`فشل جلب الصورة. رمز للحالة: ${res.statusCode}`));
        return;
      }
      let data = Buffer.from([]);
      res.on('data', (chunk) => {
        data = Buffer.concat([data, chunk]);
      });
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', reject);
  });
}