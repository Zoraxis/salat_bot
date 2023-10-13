const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');
const Level = require('../../models/Level');
const RoleRace = require('../../models/RoleRace');
const { setUsers } = require('../../data/raceWinners');
const xpToLevel = require('../../utils/xpToLevel');

module.exports = {
    name: 'assign',
    description: 'Выдает роль X лучшим спамерам',
    options: [
        {
            name: 'x',
            description: 'Кол-во спамеров',
            type: ApplicationCommandOptionType.Number,
            required: true
        }
    ],
    // deleted: true,
    permissionsRequired: [PermissionFlagsBits.Administrator],
    callback: async (client, interaction) => {
        const top = await Level.find({
            guildId: interaction.guild.id
        }).sort({xp: -1}).limit(interaction.options.get("x").value);

        let response = '`';
        let users = [];
        await top.forEach(async (user, index) => {
            try {
                users.push(await interaction.guild.members.cache.get(user.userId));
                const level = xpToLevel(user.xp);
                response += `${index + 1}: ${users[index].user.username} - ${level.level} (${level.next - level.left}/${level.next})\n`;
            } catch (error) {
                response += `${index + 1}: Не нашел я такого\n`;
                // console.log(error);
            }
        });

        const roleId = (await RoleRace.findOne({guildId: interaction.guild.id})).roleId;
        const role = await interaction.guild.roles.cache.get(roleId);
        await users.forEach(async (user, index) => {
            try {
                await user.roles.add(role);
            } catch (error) {
                // console.log(error);
            }
        });
        
        response += '`';
        
        await setUsers(users);

        await interaction.reply('Вот они - слева направо:');
        interaction.channel.send(response);
    }
};