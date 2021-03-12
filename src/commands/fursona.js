const Discord = require('discord.js')
const fs = require('fs')
const https = require('https')

module.exports = {
    name: 'fursona_generator',
    description: 'Generate a fursona',
    execute(message, args, config) {
        if (args.length >= 2) {
            let species = config.bot.fursona.species
            let bodytype = config.bot.fursona.body_types
            let embed = new Discord.MessageEmbed()
            embed.addField(`Fursona for ${message.author.tag.split('#')[0]}`, `
            **General Info**
Name: ${args[0]}
Gender: ${args[1]}
Age: ${Math.floor(Math.random() * 47) + 13}

**Physical Appearance**
Species: ${species[Math.floor(Math.random() * species.length)]}
Body Type: ${bodytype[Math.floor(Math.random() * bodytype.length)]}
Chest Size: ${Math.floor(Math.random() * 4) + 1}/5
Fur/Scale Color: #${Math.floor(Math.random()*16777215).toString(16)}, #${Math.floor(Math.random()*16777215).toString(16)}, #${Math.floor(Math.random()*16777215).toString(16)}
Eye Color: #${Math.floor(Math.random()*16777215).toString(16)}
Height: ${Math.floor(Math.random() * 5) + 4}'${Math.floor(Math.random() * 11)}"
Misc Colors: #${Math.floor(Math.random()*16777215).toString(16)}, #${Math.floor(Math.random()*16777215).toString(16)}

**Stats**
Strength: ${Math.floor(Math.random() * 10)}/10
Intelligence: ${Math.floor(Math.random() * 10)}/10
Stamina: ${Math.floor(Math.random() * 10)}/10
Wisdom: ${Math.floor(Math.random() * 10)}/10
            `)
            embed.setColor(`#${Math.floor(Math.random()*16777215).toString(16)}`)
            embed.setTitle("The Fursona Generator")
            message.channel.send(embed)
        }
    }
}