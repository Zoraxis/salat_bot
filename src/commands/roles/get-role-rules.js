const {
    PermissionFlagsBits,
    Client
} = require('discord.js');
const getRoleRules = require('../../utils/getRoleRules');

module.exports = {
    name: 'get-role-rules',
    description: 'смотрим шо есть в арсенале',
    prod: true,
    // deleted: true,
    permissionsRequired: [PermissionFlagsBits.Administrator],
    /**
     * 
     * @param {Client} client 
     * @param {import('discord.js').Interaction} interaction 
     */
    callback: async (client, interaction) => {
        const roles = await getRoleRules(interaction.guild.id, client);
        interaction.reply('Вот такая делюга:');
        interaction.channel.send(roles);
    }
}