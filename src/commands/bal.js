const Discord = require('discord.js')
const fs = require('fs')
const https = require('https')

module.exports = {
    name: 'bal',
    description: 'Check your balance',
    async execute(message, args, config) {
        try {
            var embed = new Discord.MessageEmbed()
            embed.setTitle("Checking balance")
            embed.setThumbnail("https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/b6e0b072897469.5bf6e79950d23.gif")
            embed.setColor(config.bot.color)
            var msg = await message.channel.send(embed)
            setTimeout(() => {
                var database = JSON.parse(fs.readFileSync('./src/database/accounts.json'))
                var accountExist = false
                if (message.mentions.members.first() == null) {
                    for (i = 0; i != database.accounts.length; i++) {
                        if (database.accounts[i].id == message.author.id) {
                            embed.setThumbnail(null)
                            embed.setTitle("Account balance")
                            embed.addField(`Balance for ${database.accounts[i].username}`, `${database.accounts[i].bal}<:protocoin:812471858170560603> protocoin`, true)
                            msg.edit(embed)
                            accountExist = true
                            break;
                        }
                    }
                    if (!accountExist) {
                        embed.setThumbnail(null)
                        embed.setTitle("Sorry but you need to create an account first using `pg join`")
                        msg.edit(embed)
                    }
                } else {
                    for (i = 0; i != database.accounts.length; i++) {
                        if (database.accounts[i].id == message.mentions.members.first().id) {
                            embed.setThumbnail(null)
                            embed.setTitle("Account balance")
                            embed.addField(`Balance for ${database.accounts[i].username}`, `${database.accounts[i].bal}<:protocoin:812471858170560603> protocoin`, true)
                            msg.edit(embed)
                            accountExist = true
                            break;
                        }
                    }
                    if (!accountExist) {
                        embed.setThumbnail(null)
                        embed.setTitle("Sorry but they don't have an account!")
                        msg.edit(embed)
                    }
                }
            }, 600)
        } catch(err) {
            embed.setThumbnail(null)
            embed.setTitle("Internal error occured.")
            msg.edit(embed)
            console.log(err)
        }
    }
}