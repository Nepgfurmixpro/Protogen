const Discord = require('discord.js')
const fs = require('fs')
const https = require('https')

module.exports = {
    name: 'join',
    description: 'Join Protogen to use money commands',
    async execute(message, args, config) {
        let embed = new Discord.MessageEmbed()
        embed.setTitle("Creating account")
        embed.setThumbnail("https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/b6e0b072897469.5bf6e79950d23.gif")
        embed.setColor(config.bot.color)
        var msg = await message.channel.send(embed)
        try {
            var database = JSON.parse(fs.readFileSync('./src/database/accounts.json'))
            var accountExist = false
            for (i = 0; i != database.accounts.length; i++) {
                if (database.accounts[i].id == message.author.id) {
                    embed.setTitle("Failed to create account. You already have an account")
                    embed.setThumbnail(null)
                    msg.edit(embed)
                    accountExist = true
                    break;
                }
            }
            if (!accountExist) {
                var account = {
                    username: `${message.author.tag.split('#')[0]}`,
                    id: `${message.author.id}`,
                    bal: 0,
                    inventory: [
    
                    ]
                }
                database.accounts.push(account)
                setTimeout(() => {
                    try {
                        fs.writeFileSync('./src/database/accounts.json', JSON.stringify(database, null, 2))
                        embed.setTitle("Account created!")
                        embed.addField(`Congrats ${message.author.tag.split('#')[0]}`, "You can now use `pg help money` to learn about other money commands!", true)
                        let d = new Date()
                        embed.setFooter(`Account created on ${d.toLocaleString()}`)
                        embed.setThumbnail(null)
                        let dmEmbed = new Discord.MessageEmbed()
                        dmEmbed.setTitle("Welcome to the Protogen family!")
                        dmEmbed.setDescription(`We are happy you are here ${message.author.tag.split('#')[0]}`)
                        dmEmbed.setThumbnail(message.author.avatarURL())
                        dmEmbed.addField("You can now use commands in `pg help money`", "Note: Commands don't work in DM's as that has been disabled. You can only use this bot in servers. Leaving a server doesn't delete your Protogen account!")
                        dmEmbed.setColor(config.bot.color)
                        message.member.send(dmEmbed)
                        msg.edit(embed)
                    } catch(err) {
                        console.log(err)
                        console.log(process.cwd())
                        embed.setTitle("Failed to create account. Internal error occured")
                        embed.setThumbnail(null)
                        msg.edit(embed)
                    }
                }, 500)
            }
        } catch(err) {
            console.log(err)
            console.log(process.cwd())
            embed.setTitle("Failed to create account. Internal error occured")
            embed.setThumbnail(null)
            msg.edit(embed)
        }
    }
}