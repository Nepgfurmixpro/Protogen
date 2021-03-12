const Discord = require('discord.js')
const fs = require('fs')
const https = require('https')

module.exports = {
    name: 'gayrate',
    description: 'Rate your gayness',
    execute(message, args, config) {
        if (message.mentions.members.first() == null) {
            switch(message.author.id) {
                case "350519691258626049":
                    var gayness = 50
                    break;
                case "456528012100239370":
                    var gayness = 100
                    break;
                default:
                    var gayness = Math.floor(Math.random() * 100)
                    break;
            }
            let embed = new Discord.MessageEmbed()
            embed.setTitle(`Gay rating for ${message.author.tag.split('#')[0]}`)
            embed.addField("Gayness", `${gayness}% gay`)
            if (gayness >= 50) {
                embed.addField("Final result", "You're hella gay!")
            } else {
                embed.addField("Final result", "You're somewhat gay")
            }
            embed.setColor(config.bot.color)
            message.channel.send(embed)
        } else {
            switch(message.mentions.members.first().user.id) {
                case "350519691258626049":
                    var gayness = 50
                    break;
                case "456528012100239370":
                    var gayness = 100
                    break;
                case "251910403435659264":
                    var gayness = 150
                    break;
                case "768546722296365078":
                    var gayness = 80
                    break;
                default:
                    var gayness = Math.floor(Math.random() * 100)
                    break;
            }
            let embed = new Discord.MessageEmbed()
            embed.setTitle(`Gay rating for ${message.mentions.members.first().user.username}`)
            embed.addField("Gayness", `${gayness}% gay`)
            if (gayness >= 50) {
                embed.addField("Final result", `${message.mentions.members.first().user.username} is hella gay!`)
            } else {
                embed.addField("Final result", `${message.mentions.members.first().user.username} is somewhat gay.`)
            }
            embed.setColor(config.bot.color)
            message.channel.send(embed)
        }
    }
}