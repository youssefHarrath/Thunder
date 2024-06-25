const fs = require("fs-extra");

module.exports = {
	config: {
		name: "نسخ_حتياطي_للبيانات",
		version: "1.2",
		author: "NTKhang",
		countDown: 5,
		role: 2,
		shortDescription: {
			vi: "Sao lưu dữ liệu",
			ar: "نسخ إحتياطي للبيانات"
		},
		longDescription: {
			vi: "Sao lưu dữ liệu của bot (threads, users, dashboard, globalData)",
			ar: "بيانات النسخ الاحتياطي للبوت (المجموعة, المستخدمين, لوحة القيادة, globalData)"
		},
		category: "المالك",
		guide: {
			ar: "   {pn}"
		}
	},

	langs: {
		vi: {
			backedUp: "Đã sao lưu dữ liệu của bot vào thư mục scripts/cmds/tmp"
		},
		ar: {
			backedUp: "تم عمل نسخة احتياطية من بيانات الروبوت إلى scripts/cmds/tmp folder"
		}
	},

	onStart: async function ({ message, getLang, threadsData, usersData, dashBoardData, globalData }) {
		const [globalDataBackup, threadsDataBackup, usersDataBackup, dashBoardDataBackup] = await Promise.all([
			globalData.getAll(),
			threadsData.getAll(),
			usersData.getAll(),
			dashBoardData.getAll()
		]);

		const pathThreads = `${__dirname}/tmp/threadsData.json`;
		const pathUsers = `${__dirname}/tmp/usersData.json`;
		const pathDashBoard = `${__dirname}/tmp/dashBoardData.json`;
		const pathGlobal = `${__dirname}/tmp/globalData.json`;

		fs.writeFileSync(pathThreads, JSON.stringify(threadsDataBackup, null, 2));
		fs.writeFileSync(pathUsers, JSON.stringify(usersDataBackup, null, 2));
		fs.writeFileSync(pathDashBoard, JSON.stringify(dashBoardDataBackup, null, 2));
		fs.writeFileSync(pathGlobal, JSON.stringify(globalDataBackup, null, 2));

		message.reply({
			body: getLang("backedUp"),
			attachment: [
				fs.createReadStream(pathThreads),
				fs.createReadStream(pathUsers),
				fs.createReadStream(pathDashBoard),
				fs.createReadStream(pathGlobal)
			]
		});
	}
};