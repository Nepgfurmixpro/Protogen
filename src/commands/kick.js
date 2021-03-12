const Discord = require('discord.js')
const fs = require('fs')
const https = require('https')

module.exports = {
    name: 'kick',
    description: 'Kick a user',
    execute(message, args, config) {
        try {
            if (!message.member.hasPermission('KICK_MEMBERS')) {
                message.channel.send("Sorry but you don't have the permission to do this!")
            } else {
                if (message.mentions.members.first()) {
                    try {
                        message.mentions.members.first().kick()
                        args.shift()
                        let d = new Date()
                        let embed = new Discord.MessageEmbed()
                        let dmEmbed = new Discord.MessageEmbed()
    
                        embed.setTitle(`Kicked user ${message.mentions.members.first().user.username}`)
                        embed.addField(`User ${message.mentions.members.first().user.username} has been kicked for:`, `Reason: ${args.join(' ')}`)
                        embed.setFooter(`Kicked user on ${d.toLocaleString()}`)
                        
                        dmEmbed.setTitle(`You have been kicked from ${message.guild.name}`)
                        dmEmbed.addField("The reason for your kick:", `Reason: ${args.join(' ')}`)
                        dmEmbed.setFooter(`Kicked on ${d.toLocaleString()}`)
                        
                        embed.setColor('#1eff05')
                        dmEmbed.setColor('#fbff05')
                        
                        
                        message.channel.send(embed)
                        message.mentions.members.first().send(dmEmbed)
                    } catch(err) {
                        console.log(err)
                        message.channel.send(`I don't have permission to kick ${message.mentions.members.first().user.username}`)
                    }
                }
            }
        } catch(err) {
            console.log(err)
            message.channel.send("An internal error has occured")
        }
    }
}