const Discord = require('discord.js')
const fs = require('fs')
const https = require('https')

module.exports = {
    name: 'pay',
    description: 'Pay someone mola',
    async execute(message, args, config) {
        var embed = new Discord.MessageEmbed()
        embed.setColor(config.bot.color)
        if (message.mentions.members.first()) {
            if (parseInt(args[1]) != null) {
                var userExist = false
                var userToPayExist = false
                var userPaying, userToPay
                for (i = 0; i != database.accounts.length; i++) {
                    if (database.accounts[i].id == message.author.id) {
                        userExist = true
                        userPaying = database.accounts[i]
                        break;
                    }
                }
                for (i = 0; i != database.accounts.length; i++) {
                    if (database.accounts[i].id == message.mentions.members.first().id) {
                        userToPayExist = true
                        userToPay = database.accounts[i]
                        break;
                    }
                }
                if (!accountExist) {
                    embed.setTitle("Sorry but you need to create an account first using `pg join`")
                    msg.edit(embed)
                }
                if (!userToPayExist) {
                    embed.setTitle("Sorry but that user doesn't have a Protogen account.")
                }
                userPaying -= parseInt(args[1])
                userToPay += parseInt(args[1])
            }
        } else {
            embed.setTitle(`You can't pay nobody!`)
        }
        message.channel.send(embed)
    }
}