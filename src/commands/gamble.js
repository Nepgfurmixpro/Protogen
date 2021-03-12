const Discord = require('discord.js')
const fs = require('fs')
const https = require('https')

module.exports = {
    name: 'gamble',
    description: 'Gamble money',
    async execute(message, args, config) {
        if (args[0] != null) {
            let embed = new Discord.MessageEmbed()
            embed.setColor(config.bot.color)
            embed.setTitle("Gamble")
            var data = JSON.parse(fs.readFileSync('./src/database/accounts.json'))
            let exists = false
            for (i = 0; i != data.accounts.length; i++) {
                if (data.accounts[i].id == message.author.id) {
                    var userAccount = data.accounts[i]
                    exists = true
                    break
                }
            }
            if (exists) {
                let userdice = Math.floor(Math.random() * 6) + 1
                let botdice = Math.floor(Math.random() * 6) + 1
                if (parseInt(args[0]) != null && args[0] != "all") {
                    if (parseInt(args[0]) > 0) {
                        let amountToGamble = parseInt(args[0])
                        if (userAccount.bal >= amountToGamble) {
                            userAccount.bal -= amountToGamble
                            if (userdice > botdice) {
                                let reward = amountToGamble * 2
                                embed.addField("You won!", `Reward: ${reward}<:protocoin:812471858170560603> protocoin\nGambled: ${amountToGamble}`)
                                userAccount.bal += reward
                                embed.addFields([
                                    {
                                        name: 'You rolled',
                                        value: userdice,
                                        inline: true
                                    },
                                    {
                                        name: 'I rolled',
                                        value: botdice,
                                        inline: true
                                    }
                                ])
                            } else if (botdice > userdice) {
                                embed.addField("You lost 'w'", `Lost: ${amountToGamble}<:protocoin:812471858170560603> protocoin\nGambled: ${amountToGamble}`)
                                embed.addFields([
                                    {
                                        name: 'You rolled',
                                        value: userdice,
                                        inline: true
                                    },
                                    {
                                        name: 'I rolled',
                                        value: botdice,
                                        inline: true
                                    }
                                ])
                            } else {
                                let reward = Math.floor(amountToGamble / 2)
                                embed.addField("It was a tie!", `Rewards: ${reward}<:protocoin:812471858170560603> protocoin\nGambled: ${amountToGamble}`)
                                embed.addFields([
                                    {
                                        name: 'You rolled',
                                        value: userdice,
                                        inline: true
                                    },
                                    {
                                        name: 'I rolled',
                                        value: botdice,
                                        inline: true
                                    }
                                ])
                                userAccount.bal += reward
                            } 
                        } else {
                            embed.setTitle(`Sorry ${userAccount.username} but you do not have suffecient funds for this!`)
                        }
                    } else {
                        embed.setTitle("Invalid arguments")
                    }
                } else if (args[0] == "all") {
                    if (userAccount.bal > 0) {
                        let amountToGamble = userAccount.bal
                        userAccount.bal -= amountToGamble
                        if (userdice > botdice) {
                            let reward = amountToGamble * 2
                            embed.addField("You won!", `Reward: ${reward}<:protocoin:812471858170560603> protocoin\nGambled: ${amountToGamble}`)
                            userAccount.bal += reward
                            embed.addFields([
                                {
                                    name: 'You rolled',
                                    value: userdice,
                                    inline: true
                                },
                                {
                                    name: 'I rolled',
                                    value: botdice,
                                    inline: true
                                }
                            ])
                        } else if (botdice > userdice) {
                            embed.addField("You lost 'w'", `Lost protocoins: ${amountToGamble}<:protocoin:812471858170560603> protocoin\nGambled: ${amountToGamble}`)
                            embed.addFields([
                                {
                                    name: 'You rolled',
                                    value: userdice,
                                    inline: true
                                },
                                {
                                    name: 'I rolled',
                                    value: botdice,
                                    inline: true
                                }
                            ])
                        } else {
                            let reward = Math.floor(amountToGamble / 2)
                            embed.addField("It was a tie!", `Rewards: ${reward}<:protocoin:812471858170560603> protocoin\nGambled: ${amountToGamble}`)
                            embed.addFields([
                                {
                                    name: 'You rolled',
                                    value: userdice,
                                    inline: true
                                },
                                {
                                    name: 'I rolled',
                                    value: botdice,
                                    inline: true
                                }
                            ])
                            userAccount.bal += reward
                        }
                    } else {
                        embed.setTitle("Invalid arguments")
                    }
                    fs.writeFileSync('./src/database/accounts.json', JSON.stringify(data, null, 2))
                    message.channel.send(embed)
                } else {
                    let errEmbed = new Discord.MessageEmbed()
                    errEmbed.setColor(config.bot.color)
                    errEmbed.setTitle("Sorry but you need to create an account first using `pg join`")
                    message.channel.send(errEmbed)
                }
            } else {
                let errEmbed = new Discord.MessageEmbed()
                errEmbed.setColor(config.bot.color)
                errEmbed.setTitle("Sorry but you need to create an account first using `pg join`")
                message.channel.send(errEmbed)
            }
        } else {
            let errEmbed = new Discord.MessageEmbed()
            errEmbed.setColor(config.bot.color)
            errEmbed.setTitle("Please set how much you want to gamble")
            message.channel.send(errEmbed)
        }
    }
}