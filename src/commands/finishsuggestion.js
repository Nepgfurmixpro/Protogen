const Discord = require('discord.js')
const fs = require('fs')
const https = require('https')

module.exports = {
    name: 'finish_suggestion',
    description: 'Finish suggestion',
    async execute(message, args, config, Client) {
        let embed = new Discord.MessageEmbed()
        embed.setColor(config.bot.color)
        if (message.author.id == "456528012100239370") {
            if (args.length != 0) {
                embed.setTitle("Suggestion doesn't exists!")
                try {
                    var suggestions = JSON.parse(fs.readFileSync("./src/configs/suggestions.json"))
                    for (i = 0; i != suggestions.suggestions.length; i++) {
                        if (suggestions.suggestions[i].suggestion_id == parseInt(args[0])) {
                            let dmEmbed = new Discord.MessageEmbed()
                            dmEmbed.setColor(config.bot.color)
                            dmEmbed.setTitle("Suggestion status")
                            dmEmbed.addField(`Your suggestion has been ${args[1]}`, `Your suggestion was:\n${suggestions.suggestions[i].suggestion}`)
                            let user = await Client.users.fetch(suggestions.suggestions[i].author_id)
                            await Client.users.cache.get(user.id).send(dmEmbed)
                            suggestions.suggestion_amount = suggestions.suggestion_amount - 1
                            suggestions.suggestions.splice(i, 1)
                            embed.setTitle("Suggestion finished!")
                            fs.writeFileSync('./src/configs/suggestions.json', JSON.stringify(suggestions, null, 2))
                            break
                        }
                    }
                } catch(err) {
                    console.log(err)
                    embed.setTitle("Sorry but an internal error has occured")
                }
                message.channel.send(embed)
            } else {
                embed.setTitle("Sorry but you need to specify a suggestion id")
                message.channel.send(embed)
            }
        } else {
            embed.setTitle("Sorry but you can't do this!")
            message.channel.send(embed)
        }
    }
}
