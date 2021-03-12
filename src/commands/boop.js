const Discord = require('discord.js')
const fs = require('fs')
const https = require('https')

module.exports = {
    name: 'boop',
    description: 'Boop someones snoot UwU',
    execute(message, args, config) {
        if (message.mentions.members.first()) {
            let embed = new Discord.MessageEmbed()
            embed.setColor(config.bot.color)
            embed.setTitle(`${message.author.tag.split('#')[0]} booped ${message.mentions.members.first().user.username}'s snoot nwn`)
            message.channel.send(embed)
        } else {
            message.channel.send("Please mention someone to pat 'w'")
        }
    }
}