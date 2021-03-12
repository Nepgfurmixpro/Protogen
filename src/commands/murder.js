const Discord = require('discord.js')
const fs = require('fs')
const https = require('https')

module.exports = {
    name: 'murder',
    description: 'Mute someone in a vc for 30m',
    execute(message, args, config) {
        if (message.member.hasPermission("MUTE_MEMBERS")) {
            if (message.member.voice.channel) {
                if (message.mentions.members.first() != null) {
                    let embed = new Discord.MessageEmbed()
                    embed.setColor(config.bot.color)
                    try {
                        embed.setTitle(`${message.author.tag.split('#')[0]} has murdered ${message.mentions.members.first().user.username}`)
                        message.mentions.members.first().voice.setMute(true)
                        setTimeout(() => {
                            if (message.mentions.members.first().voice) {
                                message.mentions.members.first().voice.setMute(false)
                            }
                        }, (30 * 60) * 1000)
                    } catch(err) {
                        console.log(err)
                        embed.setTitle("Internal error occured")
                    }
                    message.channel.send(embed)
                }
            } else {
                let embed = new Discord.MessageEmbed()
                embed.setColor(config.bot.color)
                embed.setTitle("You must be in a voice channel to use this command!")
                message.channel.send(embed)
            }
        } else {
            let embed = new Discord.MessageEmbed()
            embed.setColor(config.bot.color)
            embed.setTitle("You don't have permission to use this command.")
            message.channel.send(embed)
        }
    }
}
