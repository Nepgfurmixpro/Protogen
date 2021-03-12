const Discord = require('discord.js')
const fs = require('fs')
const https = require('https')

module.exports = {
    name: 'blackjack',
    description: 'Play blackjack',
    async execute(message, args, config) {
        if (args[0] != null) {
            let embed = new Discord.MessageEmbed()
            embed.setColor(config.bot.color)
            embed.setTitle("Blackjack")
            var gameInstance = JSON.parse(fs.readFileSync('./src/database/blackjack.json'))
            var data = JSON.parse(fs.readFileSync('./src/database/accounts.json'))
            let exists = false
            var userAccount
            for (i = 0; i != data.accounts.length; i++) {
                if (data.accounts[i].id == message.author.id) {
                    userAccount = data.accounts[i]
                    exists = true
                    break
                }
            }
            if (exists) {
                var bet = parseInt(args[0])
                if (args[0].toLowerCase() == 'all') {
                    bet = userAccount.bal
                }
                if (0 > bet) {
                    embed.setDescription("You can't bet negative coins!")
                } else {
                    if (userAccount.bal >= bet) {
                        gameInstance[message.author.id] = {
                            playing: "1",
                            bet: bet,
                            currentNumber: Math.floor(Math.random() * 14) + 1,
                            botNumber: Math.floor(Math.random() * 14) + 1
                        }
                        embed.setDescription(`${message.author.tag.split(' ')[0]} is playing blackjack. Use \`h\` to hit, \`s\` to stand`)
                        embed.addFields([
                            {
                                name: "Your Number",
                                value: `\`${gameInstance[message.author.id].currentNumber}\``,
                                inline: true
                            },
                            {
                                name: "My Number",
                                value: "`?`",
                                inline: true
                            }
                        ])
                        userAccount.bal -= bet
                        fs.writeFileSync('./src/database/accounts.json', JSON.stringify(data))
                        fs.writeFileSync('./src/database/blackjack.json', JSON.stringify(gameInstance))
                    } else {
                        embed.setDescription("You don't have " + bet + "<:protocoin:812471858170560603> protocoins. You also can't bet 0")
                    }
                }
            } else {
                embed.setDescription('You do not have a Protogen Account! Go to `pg help money` to learn more.')
            }
            message.channel.send(embed)
        }
    }
}