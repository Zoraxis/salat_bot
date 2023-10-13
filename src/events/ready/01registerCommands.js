const { testServer, targetServer } = require('../../../config.json');
const areCommandsDifferent = require('../../utils/areCommandsDifferent');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client) => {
    const localCommands = getLocalCommands();

    try {
        const localCommands = getLocalCommands();
        const applicationCommands = await getApplicationCommands(client, testServer);
        const targetApplicationCommands = await getApplicationCommands(client, targetServer);
        const commands = [applicationCommands, targetApplicationCommands]

        for (const localCommand of localCommands) {
            const {
                name,
                description,
                options
            } = localCommand;

            const existingCommandands = [await commands[0].cache.find(
                (cmd) => cmd.name === name
            ), await commands[1].cache.find(
                (cmd) => cmd.name === name
            )];

            existingCommandands.forEach(async (existingCommand, index) => {
                if(index == 1 && existingCommand.prod){
                    try {
                        await commands[index].delete(existingCommand.id);
                    } catch {
                        
                    }
                    console.log(`Non-Prod Command ${name} deleted and skipped`);
                    return;
                }
                if (existingCommand) {
                    if (localCommand.deleted) {
                        await commands[index].delete(existingCommand.id);
                        console.log(`Command ${name} deleted!`);
                        return;
                    }
    
                    if (areCommandsDifferent(existingCommand, localCommand)) {
                        await commands[index].edit(existingCommand.id, {
                            description,
                            options
                        });
    
                        console.log(`Command ${name} updated!`);
                    }
                } else {
                    if(localCommand.deleted){
                        console.log(`Command ${name} skipped!`);
                        return;
                    }
    
                    await commands[index].create({
                        name, 
                        description, 
                        options
                    })
                    console.log(`Command ${name} registered!`);
                }
            })
            
        }
    } catch (error) {
        console.log("Error regestering commands " + error);
    }
}