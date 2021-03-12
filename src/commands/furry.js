const Discord = require('discord.js')
const fs = require('fs')
const https = require('https')

module.exports = {
    name: 'furry',
    description: 'Pull posts from r/furry',
    execute(message, args, config) {
        try {
            const options = {
                hostname: "www.reddit.com",
                port: 443,
                path: `/r/furry/.json?jsonp=`,
                method: "GET"
            }

            var data = ''
            var req = https.request(options, res => {

                res.on('data', chunk => {
                    data += chunk
                })

                res.on('end', () => {
                    var posts = JSON.parse(data).data.children
                    var post = posts[Math.floor(Math.random() * posts.length)].data
                    if (post.is_video) {
                        message.reply(`The post I got was a video. Here is the link for it: https://reddit.com${post.permalink}`)
                    } else {
                        let embed = new Discord.MessageEmbed()
                        embed.setColor(config.bot.color)
                        embed.setImage(post.url)
                        embed.setTitle(post.title)
                        embed.setFooter(`Original poster: ${post.author} Link: https://reddit.com${post.permalink}`)
                        message.channel.send(embed)
                    }
                })
            })

            req.on('error', err => {
                console.log(err)
                message.channel.send("Sorry but an internal error occured")
            })

            req.end()
        } catch(err) {
            message.channel.send("An internal error has occured")
        }
    }
}
