const { Client, Message } = require('discord.js');
const giveXp = require('../../middleware/xpAssign');
const { antiRadan, antiBots, antiDms }  = require('../../checks/messageChecks');
const mee3 = require('../../middleware/mee3');
const RoleRace = require('../../models/RoleRace');

/**
 * 
 * @param {Client} client 
 * @param {Message} msg 
 */
module.exports = async (client, msg) => {
    mee3(msg);

    if(antiRadan(msg) || antiBots(msg) || antiDms(msg)) return;
    giveXp(client, msg);
}

