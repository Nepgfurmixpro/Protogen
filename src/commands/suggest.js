const Discord = require('discord.js')
const fs = require('fs')
const https = require('https')
const { checkServerIdentity } = require('tls')

module.exports = {
    name: 'suggest',
    description: 'Suggest something for the bot',
    async execute(message, args, config, Client) {
        if (args.length != 0) {
            var suggestion = args.join(" ")
            try {
                var suggestions = JSON.parse(fs.readFileSync("./src/configs/suggestions.json"))
                console.log(suggestions.suggestions.length)
                var id = (suggestions.suggestions.length + 8) * Math.floor(Math.random() * 9999) + 9999
                while(!checkId(id)) {
                    id = (suggestions.suggestions.length + 8) * Math.floor(Math.random() * 9999) + 9999
                }
                suggestions.suggestions.push({
                    author_tag: `${message.author.tag}`,
                    author_id: `${message.author.id}`,
                    suggestion: `${suggestion}`,
                    suggestion_id: id
                })
                fs.writeFileSync('./src/configs/suggestions.json', JSON.stringify(suggestions, null, 2))
                let embed = new Discord.MessageEmbed()
                embed.setTitle("Thank you for the suggestion")
                embed.addField(`Thank you ${message.author.tag.split('#')[0]} for the following suggestion`, `${suggestion}`)
                embed.setColor(config.bot.color)
                message.channel.send(embed)
                let dmEmbed = new Discord.MessageEmbed()
                dmEmbed.setColor(config.bot.color)
                dmEmbed.setTitle("New suggestion!")
                dmEmbed.addFields([
                    {
                        name: `Submitted by: Tag: ${message.author.tag}, ID: ${message.author.id}`,
                        value: `Suggestion: "${suggestion}", Suggestion ID: ${id}`,
                        inline: true
                    }
                ])
                let user = await Client.users.fetch("456528012100239370")
                await Client.users.cache.get(user.id).send(dmEmbed)
            } catch(err) {
                message.channel.send("Sorry but an internal error has occured")
            }
        }
    }
}

function checkId(id) {
    let idExists = false
    for (i = 0; i != suggestions.suggestions.length; i++) {
        if (suggestions.suggestions[i].suggestion_id == id) {
            idExists = true
            break
        }
    }
    return idExists
}