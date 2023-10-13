const { fuckYou } = require("../data/responses");

const fuckChance = 0.15;

module.exports = {
    antiRadan: (msg) => {
        const randval = Math.random();
        if (msg.mentions.users.has('1081288936669851649') && randval <= fuckChance) {
            const randomFuckVal = Math.floor(Math.random() * fuckYou.length);
            const randomFuck = fuckYou[randomFuckVal];
            msg.reply(randomFuck);
            return true;
        }
        return false;
    },
    antiBots: (msg) => {
        if(msg.author.bot) return true;
        return false;
    },
    antiDms: (msg) => {
        if(!msg.inGuild()) return true;
        return false;
    }
}