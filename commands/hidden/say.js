const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "say",
  aliases: ["bc", "broadcast"],
  description: "Send message via bot",
  category: "mods",
  usage: "[embed] <text>",
  cooldown: 5,
  run: async (client, message, args) => {
    if (!args.length < 0)
      return message.channel
        .send("Nothing To Say?")
        .then(m => m.delete({ timeout: 5000 }));
    if (message.mentions("everyone")) {
        return message.channel.send(false)
    }
    const roleColor = message.guild.me.highestRole;
    let e = new MessageEmbed()
      .setTitle(`${message.author.username} Want To Say Something`)
      .setDescription(args.slice(1).join(" "))
      
      .setTimestamp();
    message.channel.send(e);
  }
};
