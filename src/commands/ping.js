const Discord = require('discord.js')
const fs = require('fs')
const https = require('https')

module.exports = {
    name: 'ping',
    description: 'Test latency',
    async execute(message, args, config, Client) {
        let embed = new Discord.MessageEmbed()
        embed.setColor(config.bot.color)
        try {
            embed.setThumbnail(null)
            embed.setTitle("Latency Test Done")
            embed.addField("Result", `Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(Client.ws.ping)}ms`, true)
            message.channel.send(embed)
        } catch(err) {
            embed.setColor("#db1616")
            embed.setThumbnail("https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png")
            embed.setTitle("Internal error occured")
            console.log(err)
            message.channel.send(embed)
        }
    }
}