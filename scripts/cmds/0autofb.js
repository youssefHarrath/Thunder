const fs = require("fs-extra");
const axios = require("axios");

module.exports = {

	threadStates: {},

	config: {
		name: 'فيس_تلقائي',
		version: '1.0',
		author: 'Kshitiz',
		countDown: 5,
		role: 0,
		shortDescription: 'تحميل تلقائي الفيديوهات',
		longDescription: '',
		category: 'وسائط',
		guide: {
			en: '{p}{n}',
		}
	},
	onStart: async function ({ api, event }) {
		const threadID = event.threadID;


		if (!this.threadStates[threadID]) {
			this.threadStates[threadID] = {
				autoFbEnabled: false,
			};
		}

		if (event.body.toLowerCase().includes('فيس_تلقائي')) {
			if (event.body.toLowerCase().includes('تشغيل')) {

				this.threadStates[threadID].autoFbEnabled = true;
				api.sendMessage(" ✅ | فيس_تلقائي شغال الآن", event.threadID, event.messageID);
			} else if (event.body.toLowerCase().includes('إيقاف')) {

				this.threadStates[threadID].autoFbEnabled = false;
				api.sendMessage(" ❌ | تم إيقاف فيس_تلقائي", event.threadID, event.messageID);
			} else {
				api.sendMessage(" ⚠️ | أكتب فيس_تلقائي تشغيل أو أيقاف.", event.threadID, event.messageID);
			}
		}
	},
	onChat: async function ({ api, event }) {
		const threadID = event.threadID;

		if (this.threadStates[threadID] && this.threadStates[threadID].autoFbEnabled && this.checkLink(event.body)) {
			var { url } = this.checkLink(event.body);
			this.downLoad(url, api, event);
			api.setMessageReaction("✅", event.messageID, (err) => {}, true);
		}
	},
	downLoad: function (url, api, event) {
		var time = Date.now();
		var path = __dirname + `/cache/${time}.mp4`;
		this.getLink(url).then(res => {
			axios({
				method: "GET",
				url: res,
				responseType: "arraybuffer"
			}).then(res => {
				fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
				if (fs.statSync(path).size / 1024 / 1024 > 25) {
					return api.sendMessage(" ⚠️ | الفيديو كبير جدا لتحميله", event.threadID, () => fs.unlinkSync(path), event.messageID);
				}
				api.sendMessage({
					body: " ✅ | تم تحميل الفيدو بنجاح",
					attachment: fs.createReadStream(path)
				}, event.threadID, () => fs.unlinkSync(path), event.messageID);
			}).catch(err => console.error(err));
		}).catch(err => console.error(err));
	},
	getLink: function (url) {
		return new Promise((resolve, reject) => {
			axios({
				method: "GET",
				url: `https://api.samirthakuri.repl.co/api/videofb?url=${url}`
			}).then(res => resolve(res.data.video)).catch(err => reject(err));
		});
	},
	checkLink: function (url) {
		if (url.includes("facebook")) {
			return {
				url: url
			};
		}
		return null;
	}
};