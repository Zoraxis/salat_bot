const {
    ApplicationCommandOptionType,
    PermissionFlagsBits,
    Client
} = require('discord.js');
const AutoRole = require('../../models/AutoRole');
const getRoleRules = require('../../utils/getRoleRules');

module.exports = {
    name: 'role-rule',
    description: 'Движ авто-ролями',
    // deleted: true,  
    options: [{
            name: 'action',
            description: 'шо буеш делать?',
            type: ApplicationCommandOptionType.Number,
            required: true,
            choices: [{
                    name: 'Создать',
                    value: 1
                },
                {
                    name: 'Изменить (доп опции не забудь)',
                    value: 2
                },
                {
                    name: 'Удалить',
                    value: 3
                },
            ],
        },
        {
            name: 'role',
            description: 'какую, говоришь, роль?',
            type: ApplicationCommandOptionType.Role,
            required: true
        },
        {
            name: 'level',
            description: 'ага, и на каком сроке?',
            type: ApplicationCommandOptionType.Number,
            required: true
        },
        {
            name: 'message',
            description: 'с тебя тост ( для упоминания молодого используй символы \'{$}\', типа "красава {$}!"',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'search-role',
            description: 'кого/кому изменять то будем? (в случае изменения)',
            type: ApplicationCommandOptionType.Role,
            required: false
        },
        {
            name: 'search-level',
            description: 'и шо у него за лвл? (в случае изменения)',
            type: ApplicationCommandOptionType.Number,
            required: false
        },
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    /**
     * 
     * @param {Client} client 
     * @param {import('discord.js').Interaction} interaction 
     */
    callback: async (client, interaction) => {
        let response = '';
        switch (interaction.options.get('action').value) {
            case 1: {
                let newRole = new AutoRole({
                    guildId: interaction.guild.id,
                    roleId: interaction.options.get('role').value,
                    message: interaction.options.get('message').value,
                    level: interaction.options.get('level').value
                });
                await newRole.save().catch((e) => console.log(e));
                response = 'создана';
                break;
            }

            case 2: {
                if( interaction.options.get('search-role') == null || interaction.options.get('search-level') == null) {
                    interaction.reply("Ты таки забыл доп опции, как я пойму какую запись редактировать?");
                    return;
                }

                const query = {
                    guildId: interaction.guild.id,
                    roleId: interaction.options.get('search-role').value,
                    level: interaction.options.get('search-level').value
                };

                try {
                    const rule = await AutoRole.findOne(query);

                    if (rule) {
                        rule.role = interaction.options.get('role').value;
                        rule.level = interaction.options.get('level').value;
                        rule.message = interaction.options.get('message').value;

                        await rule.save().catch((e) => {
                            console.log("Error saving exp change", e);
                            return;
                        });
                        response = 'изменена';
                    } else {
                        interaction.reply("Брат, нет такой, смотри шо есть:");
                        interaction.channel.send(await getRoleRules(interaction.guild.id, client));
                        return;
                    }
                } catch (error) {
                    console.log("Error changing role rule", error);
                }
            }
            break;
        case 3: {
            const query = {
                guildId: interaction.guild.id,
                roleId: interaction.options.get('role').value,
                level: interaction.options.get('level').value
            };

            try {
                const rule = await AutoRole.findOne(query);

                if (rule) {
                    await AutoRole.deleteOne(query);
                    response = 'удалена'
                } else {
                    interaction.reply("Брат, нет такой, смотри шо есть:");
                    interaction.channel.send(await getRoleRules(interaction.guild.id, client));
                    return;
                }
            } catch (error) {
                console.log("Error changing role rule", error);
            }
        }
        break;
        }
        interaction.reply(`Роль ${response}`);
    }
}