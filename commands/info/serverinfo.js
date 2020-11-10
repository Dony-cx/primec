const Discord = require("discord.js");
const moment = require("moment");
const perfix = "pc!";
module.exports = {
  name: "serverinfo",
  aliases: ["si"],
  run: async (client, message, args) => {
    
    
    let roles = message.guild.roles.cache
      .sort((a, b) => b.position - a.position)
      .map(role => role.toString());
    let members = message.guild.members.cache;
		let channels = message.guild.channels.cache;
		let emojis = message.guild.emojis.cache;
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.MessageEmbed()
      .setAuthor(
        `${message.guild.name}`,
        message.guild.iconURL({ format: "png", dynamic: true })
      )
      .setColor("#d0192c")
      .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
      .addField("• <a:36:759020852825554945> Owner", message.guild.owner.user, true)
      .addField("• :globe_with_meridians: Wilayah server", message.guild.region, true)
      .addField(
        "• :calendar_spiral: Tanggal dibuat",
        `${moment(message.guild.createdTimestamp).format("LT")} ${moment(
          message.guild.createdTimestamp
        ).format("LL")} ${moment(message.guild.createdTimestamp).fromNow()}`, true)
      .addField("• <:boost:775464159877398528> Boost tier", `${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`)
      .addField('Statistics', [
				`**❯ Role Count:** ${roles.length}`,
				`**❯ Emoji Count:** ${emojis.size}`,
				`**❯ Regular Emoji Count:** ${emojis.filter(emoji => !emoji.animated).size}`,
				`**❯ Animated Emoji Count:** ${emojis.filter(emoji => emoji.animated).size}`,
				`**❯ Member Count:** ${message.guild.memberCount}`,
				`**❯ Humans:** ${members.filter(member => !member.user.bot).size}`,
				`**❯ Bots:** ${members.filter(member => member.user.bot).size}`,
				`**❯ Text Channels:** ${channels.filter(channel => channel.type === 'text').size}`,
				`**❯ Voice Channels:** ${channels.filter(channel => channel.type === 'voice').size}`,
				`**❯ Boost Count:** ${message.guild.premiumSubscriptionCount || '0'}`,
				'\u200b'
			], true)
      .addField('Presence', [
				`**❯ Online:** ${members.filter(member => member.presence.status === 'online').size}`,
				`**❯ Idle:** ${members.filter(member => member.presence.status === 'idle').size}`,
				`**❯ Do Not Disturb:** ${members.filter(member => member.presence.status === 'dnd').size}`,
				`**❯ Offline:** ${members.filter(member => member.presence.status === 'offline').size}`,
				'\u200b'
			], true)
      .addField("• 🏷 Roles", roles.length)
      .addField("• :clipboard: Channels", message.guild.channels.cache.size)
      .addField("• :bar_chart: Total Member", message.guild.memberCount)
      .addField("• ♨ Verification Levels", message.guild.verificationLevel)
      .setFooter(message.guild.name, client.user.displayAvatarURL())
      .setTimestamp();
    message.channel.send(serverembed);
  }
};
