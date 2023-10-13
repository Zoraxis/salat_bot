const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  AttachmentBuilder,
  PresenceUpdateStatus,
} = require('discord.js');
const canvacord = require('canvacord');
const Level = require('../../models/Level');
const xpToLevel = require('../../utils/xpToLevel');
const { antiDms } = require('../../checks/messageChecks');

const progressColors = [
  'FF4141',
  'FF6134',
  'FF8127',
  'FFA11A',
  'FFC10D',
  'FFE100',
  'DBE110',
  'B7E120',
  '93E130',
  '6FE240',
  '4AE24F',
]

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    if (antiDms(interaction)) { return; }

    await interaction.deferReply();

    const mentionedUserId = interaction.options.get('target-user')?.value;
    const targetUserId = mentionedUserId || interaction.member.id;
    const targetUserObj = await interaction.guild.members.cache.get(targetUserId);

    const fetchedLevel = await Level.findOne({
      userId: targetUserId,
      guildId: interaction.guild.id,
    });

    if (!fetchedLevel) {
      interaction.editReply(
        mentionedUserId
          ? `${targetUserObj.user.tag} мало отсвечивает`
          : "Брат, у тебя по нулям"
      );
      return;
    }

    const allLevels = await Level.find({ guildId: interaction.guild.id }).select(
      '-_id userId xp'
    ).sort({xp: -1});

    let currentRank = allLevels.findIndex((lvl) => lvl.userId === targetUserId) + 1;

    const realLevel = xpToLevel(fetchedLevel.xp);

    let status = null;
    try{
      status = targetUserObj.presence.status != null ? targetUserObj.presence.status : "offline";
    } catch {
      status = "offline";
    }

    const currentXp = fetchedLevel.xp - realLevel.levelXp;
    const requiredXp = realLevel.next - realLevel.levelXp;

    const colorId = Math.floor((currentXp / requiredXp) * 10 % progressColors.length);

    const rank = new canvacord.Rank()
    .setAvatar(targetUserObj.user.displayAvatarURL({ size: 128 }))
    .setRank(currentRank)
    .setLevel(realLevel.level)
    .setCurrentXP(currentXp)
    .setRequiredXP(requiredXp)
    .setStatus(status, false, 10)
    .setProgressBar(`#${progressColors[colorId]}`, 'COLOR')
    .setUsername(targetUserObj.user.username)
    .setDiscriminator( targetUserObj.user.discriminator != 0 ? targetUserObj.user.discriminator : '0000')
    .setFontSize('20');

    const data = await rank.build();
    const attachment = new AttachmentBuilder(data);
    interaction.editReply({ files: [attachment] });
  },

  name: 'level',
  description: "Показывает салато-респект",
  options: [
    {
      name: 'target-user',
      description: 'Кого смотреть будешь?',
      type: ApplicationCommandOptionType.Mentionable,
    },
  ],
  prod: true,
};