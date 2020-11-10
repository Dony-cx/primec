const channelID = "761813431581409288"
module.exports = {
  name: "ups",
  category: "hidden",
  description: "say something to other channel",
  run: async (client, message, args) => {
    const { guild, member } = message
    const channel = guild.channels.cache.get(channelID)
    const say = message.contenst.split(" ").splice(1).join(" ")
    channel.send(say)
  }
}