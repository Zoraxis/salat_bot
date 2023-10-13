const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');
const Level = require('../../models/Level');
const { getUsers } = require('../../data/raceWinners');
const RoleRace = require('../../models/RoleRace');

module.exports = {
    name: 'new-round',
    description: 'Начинаем новый сезон',
    // deleted: true,
    options: [
        {
            name: 'are',
            description: 'ты уверен?',
            type: ApplicationCommandOptionType.Boolean,
            required: true
        },
        {
            name: 'you',
            description: 'точно?',
            type: ApplicationCommandOptionType.Boolean,
            required: true
        },
        {
            name: 'sure',
            description: 'прям вот 100%?',
            type: ApplicationCommandOptionType.Boolean,
            required: true
        },
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    callback: async (client, interaction) => {
        if(!interaction.options.get('are').value || 
        !interaction.options.get('you').value || 
        !interaction.options.get('sure').value) { return; }

        await Level.deleteMany({});
        const role = await interaction.guild.roles.cache.get((await RoleRace.findOne({guildId: interaction.guild.id})).roleId);
        getUsers().forEach(user => {
            user.roles.remove(role);
        });
        interaction.reply("Живи. Умри. И снова");
    }
}