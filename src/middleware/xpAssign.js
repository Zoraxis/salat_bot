const Level = require('../models/Level');

function getRandomXp(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const cooldowns = new Set();
const cooldown = 90000;

module.exports = async (client, msg) => {
    if (cooldowns.has(msg.author.id)) return;

    const xp = getRandomXp(7.5, 15);

    const query = {
        userId: msg.author.id,
        guildId: msg.guild.id
    };

    try {
        const level = await Level.findOne(query);

        if (level) {
            level.xp += xp;

            await level.save().catch((e) => {
                console.log("Error saving exp change", e);
                return;
            });
            setCooldown(msg.author.id);
        } else {
            const newLevel = new Level({
                userId: msg.author.id,
                guildId: msg.guild.id,
                xp: xp,
            });

            await newLevel.save();
            setCooldown(msg.author.id);
        }

    } catch (error) {
        console.log("Error giving XP", error);
    }
}

const setCooldown = (id) => {
    cooldowns.add(id);
    setTimeout(() => {
        cooldowns.delete(id);
    }, 60000);
}