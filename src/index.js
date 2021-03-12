const config = require('./configs/config.json')
const Discord = require('discord.js')
const Client = new Discord.Client()
const fs = require('fs')
Client.commands = new Discord.Collection()
const cmds = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'))

for (const file of cmds) {
    const command = require(`./commands/${file}`)
    Client.commands.set(command.name, command)
}

const prefix = config.bot.prefix

Client.login(config.bot.secret.token)

var showItem = 0

Client.on('ready', () => {
    console.log(`${Client.user.tag} has logged in`)
    setInterval(function() {
        switch(showItem) {
            case 0:
                Client.user.setActivity(`https://discord.gg/gVmE6VDBW7`)
                break;
            case 1:
                Client.user.setActivity(`${config.bot.prefix} help. Hello from the Protogen Developer Team`)
                break;
            case 2:
                Client.user.setActivity(`${config.bot.prefix} help. Currently in ${Client.guilds.cache.size} servers.`)
                break;
            case 3:
                Client.user.setActivity(`${config.bot.prefix} help. Developers: Nepgfurmixpro, Isabellapple. Helpers: Mr.HeeHoo, society man`)
                break;
            case 4:
                Client.user.setActivity(`${config.bot.prefix} help. If you forget. The bots prefix is "${config.bot.prefix}"`)
                break;
            case 5:
                let totalSeconds = (Client.uptime / 1000);
                let days = Math.floor(totalSeconds / 86400);
                totalSeconds %= 86400;
                let hours = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                let minutes = Math.floor(totalSeconds / 60);
                let seconds = Math.floor(totalSeconds % 60);
                Client.user.setActivity(`${config.bot.prefix} help. Uptime: ${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`)
                break
            case 6:
                Client.user.setActivity(`${config.bot.prefix} help. Suggest things using pg suggest! More info in pg help bot!`)
                showItem = 0
                break;
        }
        showItem += 1
    }, 20 * 1000)
})

Client.on('message', message => {
    if (message.channel.type === "dm" || message.author.bot) return
    if (message.content.split(" ").length >= 10) {
        var data = JSON.parse(fs.readFileSync('./src/database/userdata.json'))
        let nonExist = true
        for (i = 0; i != data.users.length; i++) {
            if (data.users[i].id == message.author.id) {
                if (data.users[i].messages >= 80) {
                    data.users[i].messages = 0
                    let reward = Math.floor(Math.random() * 534) + 274
                    let embed = new Discord.MessageEmbed()
                    embed.setColor(config.bot.color)
                    embed.setTitle("You have randomly recived a reward!")
                    embed.setDescription("You have found a random reward while messaging!")
                    embed.addField("Reward:", `${reward} protocoins`)
                    var accountData = JSON.parse(fs.readFileSync('./src/database/accounts.json'))
                    var accountExists = false
                    for (x = 0; x != accountData.accounts.length; x++) {
                        if (accountData.accounts[x].id == message.author.id) {
                            accountData.accounts[x].bal += reward
                            accountExists = true
                            break
                        }
                    }
                    if (!accountExists) {
                        let noAccountEmbed = new Discord.MessageEmbed()
                        .setColor(config.bot.color).setTitle("You recieve a reward but...").setDescription("You recieved a reward but you don't have an account to deposit to! Create an account using `pg join`. More info in `pg help money`")
                    }
                    message.channel.send(embed)
                    fs.writeFileSync('./src/database/accounts.json', JSON.stringify(accountData, null, 2))
                }
                data.users[i].messages += 1
                nonExist = false
                break
            } else {
                nonExist = true
            }
        }
        if (nonExist) {
            let userData = {
                id: message.author.id,
                name: message.author.tag.split('#')[0],
                messages: 1
            }
            data.users.push(userData)
        }
        fs.writeFileSync('./src/database/userdata.json', JSON.stringify(data, null, 2))
    }
    var guessgame = JSON.parse(fs.readFileSync('./src/database/guessgame.json'))
    var blackjack = JSON.parse(fs.readFileSync('./src/database/blackjack.json'))
    if (!guessgame[message.author.id]) {
        guessgame[message.author.id] = {
            playing: "0"
        }
        fs.writeFileSync(`./src/database/guessgame.json`, JSON.stringify(guessgame, null, 2))
    }
    if (!blackjack[message.author.id]) {
        blackjack[message.author.id] = {
            playing: "0"
        }
        fs.writeFileSync('./src/database/blackjack.json', JSON.stringify(blackjack, null, 2))
    }
    if (blackjack[message.author.id].playing == "1") {
        var embed = new Discord.MessageEmbed()
        var userbust = false
        var userWin = false
        userbust = false
        embed.setColor(config.bot.color)
        embed.setTitle("Blackjack")
        embed.setDescription('Use `h` to hit, `s` to stand')
        if (message.content.split(' ')[0].toLowerCase() == "h" || message.content.split(' ')[0].toLowerCase() == "hit") {
            blackjack[message.author.id].currentNumber += Math.floor(Math.random() * 9) + 1
            fs.writeFileSync('./src/database/blackjack.json', JSON.stringify(blackjack, null, 2))
            blackjack = JSON.parse(fs.readFileSync('./src/database/blackjack.json'))
            if (blackjack[message.author.id].currentNumber == 21) {
                embed.addField('You got 21!', 'You win')
                embed.addFields([
                    {
                        name: "Your Number",
                        value: `\`${blackjack[message.author.id].currentNumber}\``,
                        inline: true
                    },
                    {
                        name: "My Number",
                        value: `\`${blackjack[message.author.id].botNumber}\``,
                        inline: true
                    }
                ])
                userWin = true
                embed.addField("Reward", `${(blackjack[message.author.id].bet * 2).toString()}<:protocoin:812471858170560603> protocoin`)
                let data = JSON.parse(fs.readFileSync('./src/database/accounts.json'))
                for (i = 0; i != data.accounts.length; i++) {
                    if (data.accounts[i].id == message.author.id) {
                        data.accounts[i].bal += blackjack[message.author.id].bet * 2
                        break
                    }
                }
                fs.writeFileSync('./src/database/accounts.json', JSON.stringify(data, null, 2))
                blackjack[message.author.id] = {
                    playing: "0"
                }
                fs.writeFileSync('./src/database/blackjack.json', JSON.stringify(blackjack, null, 2))
            } else if (blackjack[message.author.id].currentNumber >= 22) {
                userbust = true
                embed.addField('You busted!', 'The bot wins')
                embed.addFields([
                    {
                        name: "Your Number",
                        value: `\`${blackjack[message.author.id].currentNumber}\``,
                        inline: true
                    },
                    {
                        name: "My Number",
                        value: `\`${blackjack[message.author.id].botNumber}\``,
                        inline: true
                    }
                ])
                embed.addField('You lose!', `Reward: 0<:protocoin:812471858170560603> protocoin`)
                blackjack[message.author.id] = {
                    playing: "0"
                }
                fs.writeFileSync('./src/database/blackjack.json', JSON.stringify(blackjack, null, 2))
            }
            if (!userbust) {
                fs.writeFileSync('./src/database/blackjack.json', JSON.stringify(blackjack, null, 2))
                blackjack = JSON.parse(fs.readFileSync('./src/database/blackjack.json'))
                blackjack[message.author.id].botNumber += Math.floor(Math.random() * 9) + 1
                if (blackjack[message.author.id].botNumber == 21) {
                    embed.addField('I got 21!', 'I win')
                    embed.addFields([
                        {
                            name: "Your Number",
                            value: `\`${blackjack[message.author.id].currentNumber}\``,
                            inline: true
                        },
                        {
                            name: "My Number",
                            value: `\`${blackjack[message.author.id].botNumber}\``,
                            inline: true
                        }
                    ])
                    embed.addField('You lose!', `Reward: 0<:protocoin:812471858170560603> protocoin`)
                    blackjack[message.author.id] = {
                        playing: "0"
                    }
                    fs.writeFileSync('./src/database/blackjack.json', JSON.stringify(blackjack, null, 2))
                } else if (blackjack[message.author.id].botNumber >= 22) {
                    embed.addField('I busted!', 'You win')
                    embed.addFields([
                        {
                            name: "Your Number",
                            value: `\`${blackjack[message.author.id].currentNumber}\``,
                            inline: true
                        },
                        {
                            name: "My Number",
                            value: `\`${blackjack[message.author.id].botNumber}\``,
                            inline: true
                        }
                    ])
                    embed.addField("Reward", `${(blackjack[message.author.id].bet * 2).toString()}`)
                    let data = JSON.parse(fs.readFileSync('./src/database/accounts.json'))
                    for (i = 0; i != data.accounts.length; i++) {
                        if (data.accounts[i].id == message.author.id) {
                            data.accounts[i].bal += blackjack[message.author.id].bet * 2
                            break
                        }
                    }
                    fs.writeFileSync('./src/database/accounts.json', JSON.stringify(data, null, 2))
                    blackjack[message.author.id] = {
                        playing: "0"
                    }
                    fs.writeFileSync('./src/database/blackjack.json', JSON.stringify(blackjack, null, 2))
                } else {
                    if (!userWin) {
                        fs.writeFileSync('./src/database/blackjack.json', JSON.stringify(blackjack, null, 2))
                        embed.addFields([
                            {
                                name: "Your Number",
                                value: `\`${blackjack[message.author.id].currentNumber}\``,
                                inline: true
                            },
                            {
                                name: "My Number",
                                value: "`?`",
                                inline: true
                            }
                        ])
                    }
                }
            }
        }
        if (message.content.split(' ')[0].toLowerCase() == "s" || message.content.split(' ')[0].toLowerCase() == "stand") {
            embed.addFields([
                {
                    name: "Your Number",
                    value: `\`${blackjack[message.author.id].currentNumber}\``,
                    inline: true
                },
                {
                    name: "My Number",
                    value: `\`${blackjack[message.author.id].botNumber}\``,
                    inline: true
                }
            ])
            if (blackjack[message.author.id].currentNumber > blackjack[message.author.id].botNumber && blackjack[message.author.id].currentNumber != blackjack[message.author.id].botNumber) {
                embed.addField('You win!', `Reward: ${blackjack[message.author.id].bet * 2}<:protocoin:812471858170560603> protocoin`)
                let data = JSON.parse(fs.readFileSync('./src/database/accounts.json'))
                for (i = 0; i != data.accounts.length; i++) {
                    if (data.accounts[i].id == message.author.id) {
                        data.accounts[i].bal += blackjack[message.author.id].bet * 2
                        break
                    }
                }
                blackjack[message.author.id] = {
                    playing: "0"
                }
                fs.writeFileSync('./src/database/blackjack.json', JSON.stringify(blackjack, null, 2))
                fs.writeFileSync('./src/database/accounts.json', JSON.stringify(data, null, 2))
            } else if (blackjack[message.author.id].currentNumber < blackjack[message.author.id].botNumber && blackjack[message.author.id].currentNumber != blackjack[message.author.id].botNumber) {
                embed.addField('You lose!', `Reward: 0<:protocoin:812471858170560603> protocoin`)
                blackjack[message.author.id] = {
                    playing: "0"
                }
                fs.writeFileSync('./src/database/blackjack.json', JSON.stringify(blackjack, null, 2))
            } else if (blackjack[message.author.id].currentNumber === blackjack[message.author.id].botNumber) {
                embed.addField('You tie!', `Reward: 0<:protocoin:812471858170560603> protocoin`)
                blackjack[message.author.id] = {
                    playing: "0"
                }
                fs.writeFileSync('./src/database/blackjack.json', JSON.stringify(blackjack, null, 2))
            }
        }
        message.channel.send(embed)
    }
    if (guessgame[message.author.id].playing == "1") {
        let guesses = guessgame[message.author.id].guesses
        if (guesses <= 4) {
            guessgame[message.author.id].guesses += 1
            fs.writeFileSync('./src/database/guessgame.json', JSON.stringify(guessgame, null, 2))
            guessgame = JSON.parse(fs.readFileSync('./src/database/guessgame.json'))
            if (parseInt(message.content) == guessgame[message.author.id].number) {
                guessgame[message.author.id] = {
                    playing: "0"
                }
                let winAmount = Math.floor(650 / (guesses + 1))
                let embed = new Discord.MessageEmbed()
                embed.setTitle("You guessed correctly!")
                embed.setColor(config.bot.color)
                embed.setDescription(`${winAmount}<:protocoin:812471858170560603> protocoin has been depositied into your account!`)
                message.channel.send(embed)
                let data = JSON.parse(fs.readFileSync('./src/database/accounts.json'))
                for (i = 0; i != data.accounts.length; i++) {
                    if (data.accounts[i].id == message.author.id) {
                        data.accounts[i].bal += winAmount
                        break
                    }
                }
                fs.writeFileSync('./src/database/accounts.json', JSON.stringify(data, null, 2))
                fs.writeFileSync('./src/database/guessgame.json', JSON.stringify(guessgame, null, 2))
            } else {
                let embed = new Discord.MessageEmbed()
                let guessesleft = 4 - guesses
                if (guessesleft == 0) {
                    let embed = new Discord.MessageEmbed()
                    embed.setTitle(`Wrong! You ran out of guesses!`)
                    embed.setDescription(`The correct answer was ${guessgame[message.author.id].number} 3:`)
                    embed.setColor(config.bot.color)
                    message.channel.send(embed)
                    guessgame[message.author.id] = {
                        playing: "0"
                    }
                    fs.writeFileSync('./src/database/guessgame.json', JSON.stringify(guessgame, null, 2))
                } else {
                    embed.setTitle(`Wrong! You have ${guessesleft} guesses left!`)
                    if (parseInt(message.content) < guessgame[message.author.id].number) { var toHighOrLow =  "Too low!" } else { var toHighOrLow =  "Too high!" }
                    embed.setDescription(`${toHighOrLow}`)
                    embed.setColor(config.bot.color)
                    message.channel.send(embed)
                }
            }
        }
    } else {
        const args = message.content.slice(prefix.length).trim().split(/ +/)
        const command = args.shift().toLowerCase()

        if (!message.content.toLowerCase().startsWith(prefix))
            return
        switch(command) {
            case "help":
                Client.commands.get('help').execute(message, args, config)
                break;
            case "r/furry_irl":
                Client.commands.get('furry_irl').execute(message, args, config)
                break;
            case "r/furry":
                Client.commands.get('furry').execute(message, args, config)
                break;
            case "reddit":
                Client.commands.get('reddit').execute(message, args, config)
                break;
            case "pat":
                Client.commands.get('pat').execute(message, args, config)
                break;
            case "wag":
                Client.commands.get('wag').execute(message, args, config)
                break;
            case "fursona":
                Client.commands.get('fursona_generator').execute(message, args, config)
                break;
            case "gayrate":
                Client.commands.get('gayrate').execute(message, args, config)
                break;
            case "bap":
                Client.commands.get('bap').execute(message, args, config)
                break;
            case "boop":
                Client.commands.get('boop').execute(message, args, config)
                break;
            case "suggest":
                Client.commands.get('suggest').execute(message, args, config, Client)
                break;
            case "ban":
                Client.commands.get('ban').execute(message, args, config)
                break;
            case "kick":
                Client.commands.get('kick').execute(message, args, config)
                break;
            case "news":
                Client.commands.get('news').execute(message, args, config)
                break;
            case "join":
                Client.commands.get('join').execute(message, args, config)
                break;
            case "bal":
                Client.commands.get('bal').execute(message, args, config)
                break;
            case "leave":
                Client.commands.get('leave').execute(message, args, config)
                break;
            case "ping":
                Client.commands.get('ping').execute(message, args, config, Client)
                break;
            case "murder":
                Client.commands.get('murder').execute(message, args, config)
                break;
            case "finish":
                Client.commands.get('finish_suggestion').execute(message, args, config, Client)
                break;
            case "guessgame":
                Client.commands.get('guessgame').execute(message, args, config)
                break;
            case "gamble":
                Client.commands.get('gamble').execute(message, args, config)
                break;
            case "hit":
                Client.commands.get('hit').execute(message, args, config)
                break;
            case "hello":
                Client.commands.get('hello').execute(message, args, config)
                break;
            case "owoify":
                Client.commands.get('owoify').execute(message, args, config)
                break;
            case "blackjack":
                Client.commands.get('blackjack').execute(message, args, config)
                break;
            case "isdibzsthem":
                message.channel.send("Yes")
                break;
            case "isaikothem":
                message.channel.send("Yes")
                break;
            case "ismotherthem":
                message.channel.send("Yes")
                break;
            default:
                Client.commands.get('help').execute(message, [], config)
                break;
        }
    }
})

Client.on('guildCreate', (guild) => {
    
})