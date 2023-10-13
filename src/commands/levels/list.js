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
      if (antiDms(interaction)) { return; }
  
      const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
                    .setURL('https://shanovnii-bot.glitch.me?g=' + interaction.guild.id)
					.setLabel('Лови')
					.setStyle(ButtonStyle.Link),
			);

		await interaction.reply({components: [row] });
    },
    permissionsRequired: [PermissionFlagsBits.Administrator],
  
    name: 'list',
    description: "Доска салато-респектов"
  };