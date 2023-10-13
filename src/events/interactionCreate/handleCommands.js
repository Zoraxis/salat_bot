const {
    devs,
    testServer
} = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const localCommands = getLocalCommands();

    try {
        const commandObj = localCommands.find((cmd) => cmd.name === interaction.commandName);

        if(!commandObj) return;

        if(commandObj.devOnly){
            if(!devs.includes(interaction.member.id)){
                interaction.reply({
                    content: 'https://tenor.com/view/showing-ass-butt-monkey-eat-it-gif-12704422',
                    ephemeral: true
                });
                return;
            }
        }
        if(commandObj.testOnly){
            if(!interaction.guilId == testServer){
                interaction.reply({
                    content: 'https://tenor.com/view/showing-ass-butt-monkey-eat-it-gif-12704422',
                    ephemeral: true
                });
                return;
            }
        }

        if(commandObj.permissionsRequired?.length){
            for(const permission of commandObj.permissionsRequired){
                if(!interaction.member.permissions.has(permission)){
                    interaction.reply({
                        content: 'https://tenor.com/view/showing-ass-butt-monkey-eat-it-gif-12704422',
                        ephemeral: true
                    });
                    return;
                }
            }
        }

        if (commandObj.botPermissions?.length){
            for (const permission of commandObj.botPermissions) {
                const bot = interaction.guild.members.me;

                if (!bot.permissions.has(permission)) {
                    interaction. reply({
                        content : "I don't have enough permissions. " ,
                        ephemeral: true,
                    });
                    return;
                }
            }
        }
        await commandObj.callback(client, interaction);
    } catch (error) {
        console.log(`Command error ${error}`);
    }
}