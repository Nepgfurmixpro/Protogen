const Discord = require('discord.js')
const fs = require('fs')
const https = require('https')

module.exports = {
    name: 'leave',
    description: 'Delete your Protogen account. CAN NOT BE UNDONE!!!',
    async execute(message, args, config) {
        let embed = new Discord.MessageEmbed()
        embed.setTitle("Deleting account")
        embed.setThumbnail("https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/b6e0b072897469.5bf6e79950d23.gif")
        embed.setColor(config.bot.color)
        var msg = await message.channel.send(embed)
        try {
            var database = JSON.parse(fs.readFileSync('./src/database/accounts.json'))
            var accountExist = false
            for (i = 0; i != database.accounts.length; i++) {
                if (database.accounts[i].id == message.author.id) {
                    setTimeout(() => {
                        database.accounts.splice(i, 1)
                        fs.writeFileSync('./src/database/accounts.json', JSON.stringify(database, null, 2))
                        embed.setTitle("Account delete!")
                        embed.addField(`Success!`, "You have successfully deleted your account", true)
                        let d = new Date()
                        embed.setFooter(`Account deleted on ${d.toLocaleString()}`)
                        embed.setThumbnail(null)
                        msg.edit(embed)
                    }, 500)
                    accountExist = true
                    break;
                }
            }
            if (!accountExist) {
                embed.setTitle("Failed to delete account. You don't have an account to delete")
                embed.setThumbnail(null)
                msg.edit(embed)
            }
        } catch(err) {
            console.log(err)
            console.log(process.cwd())
            embed.setTitle("Failed to delete account. Internal error occured")
            embed.setThumbnail(null)
            msg.edit(embed)
        }
    }
}