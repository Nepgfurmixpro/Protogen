const Discord = require('discord.js')
const fs = require('fs')
const https = require('https')
const owoify = require('owoify-js').default

module.exports = {
    name: 'owoify',
    description: 'OwOify text',
    execute(message, args, config) {
        let embed = new Discord.MessageEmbed()
        embed.setColor(config.bot.color)
        var text = "", sendText = false
        if (args.length != 0) {
            embed.setTitle("OwOify")
            var type = 'owo'
            if (parseInt(args[0])) {
                switch(parseInt(args[0])) {
                    case 0:
                        type = 'owo'
                        break;
                    case 1:
                        type = 'uwu'
                        break;
                    case 2:
                        type = 'uvu'
                        break;
                }
                args.shift()
            }
            if (args.length <= 1024) {
                embed.addField("OwOified text", owoify(args.join(' '), type))
            } else {
                sendText = true
                text = owoify(args.join(' '), type)
            }
        } else {
            embed.setTitle("OwO please specify the text to owoify")
        }
        message.channel.send(embed)
        if (sendText) {
            message.channel.send(text)
        }
    }
}