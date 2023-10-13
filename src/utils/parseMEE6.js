const { Message } = require("discord.js");

/**
 * 
 * @param {Message} msg 
 */
module.exports = (msg) => {
    const user = msg.mentions.users.at(0);
    const text = msg.content.slice((msg.content.indexOf('апнул ') + 6), msg.content.indexOf(' лвл'));
    const level = parseInt( text );
    return {
        user: user,
        level: level
    };
}