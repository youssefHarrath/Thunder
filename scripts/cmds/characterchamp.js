module.exports = {
    config: {
        name: "المتصدرين",
        version: "1.0",
        author: "حسين يعقوبي",
        role: 0,
        shortDescription: {
            en: "أفضل اللاعبين في لعبة شخصيات"
        },
        longDescription: {
            en: "يعرض أفضل اللاعبين في لعبة شخصيات من حيث عدد المباريات التي لعبوها والمال الذي جمعوه"
        },
        category: "لعبة",
        guide: {
            en: "{prefix}المتصدرين"
        }
    },

    onStart: async function ({ api, event, message, usersData }) {
        try {
            const allPlayers = await usersData.getAll();
            const playersWithGames = allPlayers.filter(player => player.gamesPlayed && player.gamesPlayed > 0);

            if (playersWithGames.length < 3) {
                return message.reply("لا يوجد عدد كافٍ من اللاعبين لعرض المتصدرين.");
            }

            const topPlayers = playersWithGames.sort((a, b) => b.gamesPlayed - a.gamesPlayed).slice(0, 10);

            const medalEmoji = ["🥇", "🥈", "🥉"];
            const medalEmojiRest = ["🏅", "🏅", "🏅", "🏅", "🏅", "🏅", "🏅", "🏅", "🏅", "🏅"];

            let reply = "المتصدرين في لعبة شخصيات:\n";
            topPlayers.forEach((player, index) => {
                const playerName = player.name;
                const gamesPlayed = player.gamesPlayed;
                const moneyEarned = player.moneyEarned || 0;
                const medal = index < 3 ? medalEmoji[index] : medalEmojiRest[index];
                reply += `${medal} ${playerName} - عدد المباريات: ${gamesPlayed}، المال المكتسب: ${moneyEarned}\n`;
            });

            await message.reply(reply);
        } catch (error) {
            console.error("Error while fetching top players:", error);
            message.reply("حدث خطأ أثناء جلب المتصدرين.");
        }
    }
};
