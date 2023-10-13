const { Message, Guild, Client } = require('discord.js');
const AutoRole = require('../models/AutoRole');
const parseMEE6 = require('../utils/parseMEE6');

/**
 * 
 * @param {Message} msg 
 */
module.exports = async (msg) => {
    if(msg.author?.id == /*'515792079461285909'*/'159985870458322944' && msg.content.includes('апнул ')){
        const data = parseMEE6(msg);

        const rule = await AutoRole.findOne({
            guildId: msg.guild.id,
            level: data.level
        });
        if(!rule) return;

        const user = msg.guild.members.cache.get(data.user.id);
        const greetings = rule.message.replace('{$}', `<@${user.user.id}>`);
        msg.channel.send(greetings);
        user.roles.add(rule.roleId);
    }
}