const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const client = new discord.Client({
  disableMentions: "everyone"
})
module.exports = {
  name: "embedsay",
  category: "hidden",
  usage: "embedsay <text to say>",
  description: "Returns provided text in Embed form.",
  aliases: ["esay"],
  run: async (client, message, args) => {
    
    await message.delete();
    let say = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (!say)
      return message.channel.send(`❌ | ` + "I Cannot Repeat Blank Message");
    let embed = new MessageEmbed()
      .setAuthor(message.author.username, message.author.avatarURL())
      .setDescription(`${say}`)
      .setColor("#d0192c")
      .setThumbnail(message.author.displayAvatarURL())
      .setFooter(`By ${message.author.tag}`)
      .setTimestamp();
    message.channel.send(embed);
  }
};
