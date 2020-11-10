const discord = require("discord.js");

module.exports = {
  name: "donate",
  category: "info",
  description: "Menampilkan link donate saweria",
  usage: "donate",
  aliases: [],
  run: async (client, message, args) => {

    let avatar = client.user.displayAvatarURL({ size: 2048, dynamic: true });

    const embed = new discord.MessageEmbed()
      .setTitle(client.user.username, client.user.avatarURL())
      .setColor("#d0192c")
      .setThumbnail(avatar)
      .setDescription(`Buat anda yang ingin memberikan donasi bisa klik tautan di bawah
[DONATE](https://saweria.co/achidex)`);
    message.channel.send(embed);
  }
};
