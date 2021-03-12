const Discord = require('discord.js')
const fs = require('fs')
const https = require('https')

module.exports = {
    name: 'wag',
    description: 'Wag your tail :3',
    execute(message, args, config) {
        var messages = [
            "They so happ :3",
            "Look at them go UwU",
            "UwU",
            ":3",
            "OwO",
            "Hehe :3"
        ]
        let embed = new Discord.MessageEmbed()
        embed.setColor(config.bot.color)
        var randomMessage = messages[Math.floor(Math.random() * messages.length)]
        embed.setTitle(`${message.author.tag.split('#')[0]} wags their tail. ${randomMessage}`)
        message.channel.send(embed)
    }
}