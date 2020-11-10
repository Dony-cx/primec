const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "setleave",
  category: "admin",
  usage: "setleave <#channel>",
  description: "Mengatur channel goodbye",
  aliases: ["sl", "goodbye", "bye"],
  run: async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      return message.reply("```You are not allowed for set leave channel!!```")
    }
    
    let channel = message.mentions.channels.first();
    if (!channel) {
      return message.channel.send("Harap mention channel terlebih dahulu!.");
    }

    // Sekarang kita akan menggunakan quick.db

    db.set(`byechannel_${message.guild.id}`, channel.id);

    message.channel.send(`Goodbye Channel is seted as ${channel}`);
  }
};
