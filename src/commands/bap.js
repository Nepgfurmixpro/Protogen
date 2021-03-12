const Discord = require('discord.js')
const fs = require('fs')
const https = require('https')

module.exports = {
    name: 'bap',
    description: 'Bap someone UwU',
    execute(message, args, config) {
        if (message.mentions.members.first()) {
            let embed = new Discord.MessageEmbed()
            embed.setColor(config.bot.color)
            embed.setTitle(`${message.author.tag.split('#')[0]} baps ${message.mentions.members.first().user.username} :3`)
            message.channel.send(embed)
        } else {
            message.channel.send("Please mention someone to pat 'w'")
        }
    }
}