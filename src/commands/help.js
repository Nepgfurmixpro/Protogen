const Discord = require('discord.js')
const fs = require('fs')
module.exports = {
    name: 'help',
    description: 'Display the help box',
    execute(message, args, config) {
        let embed = new Discord.MessageEmbed()
        embed.setColor(config.bot.color)
        if (args.length === 0) {
            embed.setThumbnail(message.author.avatarURL())
            embed.setTitle(`Hello ${message.author.tag.split('#')[0]}!`)
            embed.addFields(config.bot.help.areas)
            embed.addField("There are:", `Furry Commands: ${config.bot.help.furry.length}\nMeme Commands: ${config.bot.help.meme.length}\nBot Commands: ${config.bot.help.bot.length}\nAdmin Commands: ${config.bot.help.admin.length}\nMoney Commands: ${config.bot.help.money.length}\nTotal commands: ${config.bot.help.furry.length + config.bot.help.bot.length + config.bot.help.meme.length + config.bot.help.admin.length + config.bot.help.money.length}`)
            embed.setDescription("Welcome to the help center! Don't forget the prefix is " + config.bot.prefix + ". <> = required, [] = optional.")
        }
        if (args.length == 1) {
            switch(args[0]) {
                case "furry":
                    embed.setTitle(`Hello ${message.author.tag.split('#')[0]}!`)
                    embed.setDescription("Welcome to the furry help center!")
                    embed.addFields(config.bot.help.furry)
                    break;
                case "meme":
                    embed.setTitle(`Hello ${message.author.tag.split('#')[0]}!`)
                    embed.setDescription("Welcome to the meme help center!")
                    embed.addFields(config.bot.help.meme)
                    break;
                case "bot":
                    embed.setTitle(`Hello ${message.author.tag.split('#')[0]}!`)
                    embed.setDescription("Welcome to the bot help center!")
                    embed.addFields(config.bot.help.bot)
                    break;
                case "admin":
                    embed.setTitle(`Hello ${message.author.tag.split('#')[0]}!`)
                    embed.setDescription("Welcome to the admin help center!")
                    embed.addFields(config.bot.help.admin)
                    break;
                case "money":
                    embed.setTitle(`Hello ${message.author.tag.split('#')[0]}!`)
                    embed.setDescription("Welcome to the money help center!")
                    embed.addFields(config.bot.help.money)
                    break;
                default:
                    message.channel.send("Not a valid area!")
                    break;
            }
        }
        message.channel.send(embed)
    }
}