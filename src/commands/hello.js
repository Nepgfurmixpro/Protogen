const Discord = require('discord.js')
const fs = require('fs')
const https = require('https')

module.exports = {
    name: 'hello',
    description: 'Say hello to someone via Protogen',
    execute(message, args, config) {
        if (message.mentions.members.first()) {
            let embed = new Discord.MessageEmbed()
            embed.setColor(config.bot.color)
            embed.setTitle(`${message.author.tag.split('#')[0]} says hello to you ${message.mentions.members.first().user.username}! UwU`)
            message.channel.send(embed)
        } else {
            let embed = new Discord.MessageEmbed()
            embed.setColor(config.bot.color)
            embed.setTitle(`Please mention someone to say hello to!`)
            message.channel.send(embed)
        }
    }
}