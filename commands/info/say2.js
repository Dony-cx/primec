const Discord = require("discord.js");

module.exports = {
  name: "say2",
  category: "info",
  description: "say",
  usage: "say2",
  aliases: [],
  run: async (client, message, args) => {
    if (message.guild === null) return;

    if (message.author.bot) return;

    const sayMessage = args.join(" ");
    message.delete({ timeout: 3000 }).catch(apaan => {});
    message.channel.send(sayMessage);
  }
};
