const Discord = require("discord.js");

module.exports = {
  name: "dm",
  category: "hidden",
  description: "dm message",
  usage: "<prefix/dm> <pesan>",
  run: async (client, message, args) => {
    if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("You are not allowed to use this command");
    }
    if (!say) {
      return message.channel.send("Tidak ada pesan yg ditulis disini!")
    }
    if (!user) {
      return message.reply("Tidak ditemukan mentions user, coba lagi dengan `<prefix>dm <isi pesan> <@user>`")
    }
    await message.delete();
    let say = message.content
      .split(" ")
      .splice(1)
      .join(" ");

    let user = message.mentions.members.first();

    const embed = new Discord.MessageEmbed()
      .setColor("#d0192c")
      .setDescription(`${say}`)
      .setFooter("Send By: Undefined");
    user.user.send(embed);
  }
};
