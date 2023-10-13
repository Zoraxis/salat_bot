const AutoRole = require("../models/AutoRole")

module.exports = async (guildId, client) => {
    let guild = client.guilds.cache.get(guildId);
    let roles = await AutoRole.find({
        guildId: guildId
    });
    let response = '`';
    roles.forEach((role, index) => {
        response += `${index + 1}: ${guild.roles.cache.get(role.roleId).name} - ${role.level} (${role.message})\n`;
    });
    response += '`';
    return response;
}