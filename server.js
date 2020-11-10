//_________________________________________________________________________________________________________________________________
//UPTIME WEB
const http = require("http");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log(" Ping ");
  res.sendStatus(200);
});

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`${process.env.PROJECT_DOMAIN}`);
}, 86400000);
//________________________________________________________________________________________________________________________________
//PACKAGE REQUIRE
const discord = require("discord.js");
const { TOKEN, DEFAULT_PREFIX } = require("./config.json");
const db = require("quick.db");
const { addexp } = require("./handlers/xp.js"); //Tambahan handler xp -1
const client = new discord.Client({
  fetchAllMembers: true,
  disableMentions: "everyone",
  disableEveryone: true
});
//________________________________________________________________________________________________________________________________
//BOT STATUS
client.on("ready", async () => {
  console.log(`${client.user.tag} sudah aktif!`);
  let status = [
    `${client.users.cache.size} Pengguna!`,
    `${client.guilds.cache.size} Server!`,
    `@primec.community`
  ];

  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[random], {
      type: "STREAMING"
    });
  }, 6000);
});

//__________________________________________________________________DUKUNGAN SNIPE_____________________________________________________________
//DUKUNGAN SNIPE
client.snipes = new Map();
client.on("messageDelete", function(message, channel) {
  client.snipes.set(message.channel.id, {
    conetnt: message.content,
    author: message.author.tag,
    image: message.attachments.first()
      ? message.attachments.first().proxyURL
      : null
  });
});

//_______________________________________________________________KOLEKSI______________________________________________________________
//KOLEKSI
client.commands = new discord.Collection();
client.aliases = new discord.Collection();


const { CanvasSenpai } = require("canvas-senpai");
const canva = new CanvasSenpai();


["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.on("message", async message => {
  //____________________________________________________________________PESAN_____________________________________________________________
  // PESAN
  if (message.content === "welcome")
    message.channel.send("Selamat datang semoga anda nyaman dan betah :pray:");

  if (message.content === "Welcome")
    message.channel.send("Selamat datang semoga anda nyaman dan betah :pray:");

  if (message.content === "welcome")
    message.channel.send(
      "<a:pikachees:772097162322378792><a:DingDing:772097626480312360><a:sugoi:772097993817849887><a:NaNaNa:772098032388538389>"
    );

  if (message.content === "Welcome")
    message.channel.send(
      "<a:pikachees:772097162322378792><a:DingDing:772097626480312360><a:sugoi:772097993817849887><a:NaNaNa:772098032388538389>"
    );

  //____________________________________________________________________________________________________________________________________
  // PREFIX
  if (!message.guild) return;
  let prefix = db.get(`prefix_${message.guild.id}`);
  if (prefix === null) prefix = DEFAULT_PREFIX;

  let blacklist = await db.fetch(`blacklist_${message.author.id}`);

  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  if (blacklist === "Blacklisted")
    return message.reply("You are blacklisted from the bot!");

  // Jika message.member tidak di-cache, simpan dalam cache.
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  let args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  let cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  // Dapatkan perintahnya
  let command = client.commands.get(cmd);
  // Jika tidak ada yang ditemukan, coba cari dengan alias
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  // Jika perintah akhirnya ditemukan, jalankan perintah
  if (command) command.run(client, message, args);

  console.log(`${message.author.tag} menggunakan command ${prefix}${cmd}`);

  //Tambahan handler xp -2
  return addexp(message);
});

//____________________________________________________________________________________________________________________________________
// WELCOME CHANNEL
client.on("guildMemberAdd", async member => {
  //<<< EVENT DISINI
  let chx = db.get(`welchannel_${member.guild.id}`);

  if (chx === null) {
    return;
  }
  let wembed = new discord.MessageEmbed()
    .setAuthor(member.user.username, member.user.avatarURL())
    .setColor("#d3c9c4")
    .setThumbnail(member.user.displayAvatarURL())
    .setDescription(`Welcome ${member}

Jangan lupa baca rules & guide server setelah itu silahkan intro agar kita saling kenal. Bagi kamu yang cewek bisa menghubungi Pemerintahan untuk mendapatkan roles Girls.
${client.channels.cache.get("761758761815375895")}
${client.channels.cache.get("766585577264775168")}
${client.channels.cache.get("750332252592013344")}`);
  client.channels.cache.get(chx).send(wembed);
});
//____________________________________________________________________________________________________________________________________
//GOODBYE CHANNEL
client.on("guildMemberRemove", async user => {
  let lcx = db.get(`byechannel_${user.guild.id}`);
  
  if (lcx === null) {
    return;
  }
  
  let data = await canva.welcome(user,  { link: "https://static.myfigurecollection.net/upload/pictures/2018/01/09/1898432.jpeg", blur: false, block: false})
    const attachment = new discord.MessageAttachment(data, "goodbye-image.png");
    const embed = new discord.MessageEmbed()
    .setColor("#d3c9c4")
    .setDescription(`**Goodbye** ${user.user.toString()}
**Semoga harimu menyenangkan :):**`)
    .attachFiles(attachment)
    .setFooter(client.user.username)
    .setTimestamp()
    client.channels.cache.get(lcx).send(embed)
});
//____________________________________________________________________________________________________________________________________
// LOGIN BOT
client.login(TOKEN);
