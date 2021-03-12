const Discord = require('discord.js')
const fs = require('fs')
const https = require('https')

module.exports = {
    name: 'ban',
    description: 'Ban a user',
    execute(message, args, config) {
        try {
            if (!message.member.hasPermission('BAN_MEMBERS')) {
                message.channel.send("Sorry but you don't have the permission to do this!")
            } else {
                if (message.mentions.members.first()) {
                    try {
                        try {
                            args.shift()
                            let d = new Date()
                            let embed = new Discord.MessageEmbed()
                            let dmEmbed = new Discord.MessageEmbed()
        
                            embed.setTitle(`Banned user ${message.mentions.members.first().user.username}`)
                            embed.addField(`User ${message.mentions.members.first().user.username} has been banned for:`, `Reason: ${args.join(' ')}`)
                            embed.setFooter(`Banned user on ${d.toLocaleString()}`)
                            
                            dmEmbed.setTitle(`You have been banned from ${message.guild.name}`)
                            dmEmbed.addField("The reason for your ban:", `Reason: ${args.join(' ')}`)
                            dmEmbed.setFooter(`Banned user on ${d.toLocaleString()}`)
                            
                            embed.setColor('#1eff05')
                            dmEmbed.setColor('#910000')

                            message.mentions.members.first().ban()
                            
                            message.channel.send(embed)
                            message.mentions.members.first().send(dmEmbed)
                        } catch(err) {
                            let embed = new Discord.MessageEmbed()
                            embed.setTitle("Internal error occured")
                            embed.setColor(config.bot.color)
                            message.channel.send(embed)
                        }
                    } catch(err) {
                        message.channel.send(`I don't have permission to ban ${message.mentions.members.first().user.username}`)
                    }
                }
            }
        } catch(err) {
            console.log(err)
            message.channel.send("An internal error has occured")
        }
    }
}