const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    AttachmentBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    PermissionFlagsBits,
} = require('discord.js');
const canvacord = require('canvacord');
const Level = require('../../models/Level');
const xpToLevel = require('../../utils/xpToLevel');
const { antiDms } = require('../../checks/messageChecks');
  
  module.exports = {
    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */
    callback: async (client, interaction) => {
        if (antiDms(interaction) || interaction.user.id != '515792079461285909') { return; }

        let link = interaction.options.get("link").value;
        link = link.replace('https://discord.com/channels/', '');
        const guildId = link.slice(0, link.indexOf('/'));
        link = link.slice(link.indexOf('/') + 1, link.length);
        const channelId = link.slice(0, link.indexOf('/'));
        link = link.slice(link.indexOf('/') + 1, link.length);
        const messageId = link.slice(0, link.indexOf('/'));
    
        console.log(`${guildId} - ${channelId} - ${messageId}`);

        client.guilds.cache.get(guildId)
            .channels.cache.get(channelId)
            .messages.cahce.get(messageId)
            .delete();

        interaction. reply({
            content : "done",
            ephemeral: true,
        });
    },
    permissionsRequired: [PermissionFlagsBits.Administrator],
    options: [
        {
            name: 'link',
            description: 'a link',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    name: 'admin',
    description: "secret",
    prod: true,
  };