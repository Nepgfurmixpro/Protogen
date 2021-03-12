const Discord = require('discord.js')
const fs = require('fs')
const https = require('https')

module.exports = {
    name: 'reddit',
    description: 'Pull posts from any subreddit',
    execute(message, args, config) {
        if (parseInt(args[1]) != 0 && parseInt(args[1]) <=10 && parseInt(args[1]) != null) {
            for (var i = 0; i != parseInt(args[1]); i++) {
                getRedditPost()
            }
        } else {
            getRedditPost()
        }
        function getRedditPost() {
            try {
                if (args.length >= 1) {
                    if(!args[0].startsWith("r/")){ args[0] = "r/" + args[0] }
                    if (config.bot.banned_subreddits.includes(args[0])) {
                        message.channel.send("Sorry but that subreddit was put to a ban from this bot after causing issues!")
                    } else {
                        const jsonp = Math.floor(Math.random() * 10)
                        const options = {
                            hostname: "www.reddit.com",
                            port: 443,
                            path: "/" + args[0] +`/.json?jsonp=` + jsonp,
                            method: "GET"
                        }
                
                        var data = ''
                        var req = https.request(options, res => {
                
                            res.on('data', chunk => {
                                data += chunk
                            })
                
                            res.on('end', () => {
                                data = data.slice(6)
                                data = data.slice(0, -1)
                                try {
                                    var posts = JSON.parse(data).data.children
                                } catch(err) {
                                    message.channel.send("Sorry but either that subreddit doesn't exist or reddit is broken atm.")
                                    return -1
                                }
                                var post = posts[Math.floor(Math.random() * posts.length)].data
                                if (post.over_18) {
                                    if (message.channel.nsfw) {
                                        sendContent(post, message, config, args)
                                    } else {
                                        message.channel.send("Sorry but the post that was grabbed was marked NSFW. Please use that subreddit in a NSFW channel to get posts from there")
                                    }
                                } else {
                                    sendContent(post, message, config, args)
                                }
                            })
                        })
                
                        req.on('error', err => {
                            return -1
                        })
                
                        req.end()
                    }
                }
            } catch(err) {
                message.channel.send("An internal error has occured")
            }
        }
    }
}

function sendContent(post, message, config, args) {
    if (post.is_video) {
        let embed = new Discord.MessageEmbed()
        embed.setColor(config.bot.color)
        embed.setImage(post.thumbnail)
        embed.setTitle(post.title)
        embed.setURL(`https://reddit.com${post.permalink}`)
        embed.setFooter(`Original poster: ${post.author}. \n🔼 ${post.ups}`)
        message.channel.send(embed)
    } else {
        if (!post.spoiler) {
            sendEmbed(post, message, config)
        } else if (post.spoiler && args.includes("y")) {
            sendEmbed(post, message, config)
        } else {
            message.channel.send("Please add `y` to the command to see spoilers")
        }
    }
}
function sendEmbed(post, message, config) {
    let embed = new Discord.MessageEmbed()
    embed.setColor(config.bot.color)
    embed.setImage(post.url)
    embed.setTitle(post.title)
    embed.setURL(`https://reddit.com${post.permalink}`)
    embed.setFooter(`Original poster: ${post.author}.\n🔼 ${post.ups}`)
    message.channel.send(embed)
}