module.exports = {
  config: {
    name: "خلفية",
    author: "who is tokodori", // Convert To Goat By Tokodori
    role: 2,
    shortDescription: " ",
    longDescription: "",
    category: "النظام",
    guide: "{pn}"
  },

onStart: async ({ api, event }) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
	axios.get('https://api-jrt.j-jrt-official.repl.co/background.php').then(res => {
	let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
	let callback = function () {
					api.sendMessage({
						attachment: fs.createReadStream(__dirname + `/cache/background.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/background.${ext}`), event.messageID);
				};
				request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/background.${ext}`)).on("close", callback);
			})
  }
};