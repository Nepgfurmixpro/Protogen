const Discord = require('discord.js')
const fs = require('fs')
const http = require('http')

module.exports = {
    name: 'news',
    description: 'Get the newest news about Protogen',
    execute(message, args, config) {
        http.get('http://192.168.0.145:3000/news', resp => {
            let data = ''

            resp.on('data', chunk => {
                data += chunk
            })

            resp.on('end', () => {
                let botnews = JSON.parse(data)
                let embed = new Discord.MessageEmbed()
                embed.setTitle('News')
                embed.setDescription('News channel')
                if (args[0] === 'full') {
                    let newslist = []
                    for (i = 0; i != botnews.news.length; i++) {
                        newslist.push({
                            name: `Version ${botnews.news[i].version}`,
                            value: `${botnews.news[i].info}`
                        })
                    }
                    embed.addFields(newslist)
                } else {
                    embed.addFields([
                        {
                            name: `Version ${botnews.news[0].version}`,
                            value: `${botnews.news[0].info}`
                        },
                        {
                            name: `Version ${botnews.news[1].version}`,
                            value: `${botnews.news[1].info}`
                        },
                    ])
                }
                embed.setThumbnail('https://www.pngkit.com/png/full/246-2464495_free-icons-png-information-icon-png.png')
                embed.setColor(config.bot.color)
                message.channel.send(embed)
            })
        }).on('error', err => {
            console.log(err.message)
        })
    }
}