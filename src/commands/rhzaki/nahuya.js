const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  AttachmentBuilder,
  PresenceUpdateStatus,
} = require('discord.js');
const { antiDms } = require('../../checks/messageChecks');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    if (antiDms(interaction)) { return; }

    //await interaction.deferReply();

	const res = await fetch('https://api.senpy.club/v2/random')
  	const img = await res.json().url;
	
   	interaction.reply(img);
    //interaction.editReply({ url: img });
  },

  name: 'nahuya',
  description: "Тебя ебёт?",
  options: [
    {
      name: 'похуй',
      description: 'мне тож',
      type: ApplicationCommandOptionType.String,
    },
  ],
};