const Discord = require('discord.js')
const fs = require('fs')
const https = require('https')

module.exports = {
    name: 'guessgame',
    description: 'Play a guessing game for money.',
    execute(message, args, config) {
        var guessgame = JSON.parse(fs.readFileSync('./src/database/guessgame.json'))
        let embed = new Discord.MessageEmbed()
        embed.setColor(config.bot.color)
        try {
            var data = JSON.parse(fs.readFileSync('./src/database/accounts.json'))
            let exists = false
            for (i = 0; i != data.accounts.length; i++) {
                if (data.accounts[i].id == message.author.id) {
                    exists = true
                    break
                }
            }
            if (exists) {
                if (guessgame[message.author.id].playing == 0) {
                    try {
                        guessgame[message.author.id] = {
                            playing: "1",
                            number: Math.floor(Math.random() * 15) + 1,
                            guesses: 0
                        }
                        fs.writeFileSync('./src/database/guessgame.json', JSON.stringify(guessgame, null, 2))
                        embed.setTitle("Starting game!")
                        embed.setDescription("Pick a number 0-15. You have 5 guess to get it right!")
                        message.channel.send(embed)
                    } catch(err) {
                        console.log(err)
                        embed.setTitle("An internal error occured!")
                        message.channel.send(embed)
                    }
                }
            } else {
                embed.setTitle("Sorry but you need to create an account first using `pg join`")
                message.channel.send(embed)
            }
        } catch(err) {
            console.log(err)
            embed.setTitle("Internal error occured")
            message.channel.send(embed)
        }
    }
}