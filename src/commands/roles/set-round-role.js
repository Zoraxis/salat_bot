const {
    PermissionFlagsBits,
    Client,
    ApplicationCommandOptionType
} = require('discord.js');
const RoleRace = require('../../models/RoleRace');
const getRoleRules = require('../../utils/getRoleRules');

module.exports = {
    name: 'set-round-role',
    description: 'вот эту шнягу получат чемпионы',
    prod: true,
    // deleted: true,
    options: [
        {
            name: 'role',
            description: 'какую, говоришь, роль?',
            type: ApplicationCommandOptionType.Role,
            required: true
        },
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    /**
     * 
     * @param {Client} client 
     * @param {import('discord.js').Interaction} interaction 
     */
    callback: async (client, interaction) => {
        const role = await RoleRace.findOne({ guildId: interaction.guild.id});
        let action = 'задана';

        try {
            if(role){
                action = 'изменна';
                role.roleId = interaction.options.get('role').value;
                await role.save();
            } else {
                RoleRace.create({
                    roleId: interaction.options.get('role').value,
                    guildId: interaction.guild.id
                })
            }
        } catch (error) {
            console.log(error);
        }

        interaction.reply(`Роль для забега ${action}`);
    }
}