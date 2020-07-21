const Discord = require("discord.js")
const fs = require("fs")
const money = require ("../money.json")
const ms = require("parse-ms");
const cooldowns = require("../cooldowns.json");
const { time } = require("console");

module.exports.run = async (bot, message, args) => {

    let timeout = 86400000;
    let reward = 50;

    let dailyembed = new Discord.MessageEmbed();
    dailyembed.setTitle("Daily reward!")

    if(!money[message.author.id]) {

        money[message.author.id] = {
            name: bot.users.cache.get(message.author.id).tag,
            money: reward
        }
        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if(err) console.log(err);
        });

        if (!cooldowns[message.author.id]) {
            cooldowns[message.author.id] = {
                name: bot.users.cache.get(message.author.id).tag,
                daily: Date.now()
            }
            fs.writeFile("./cooldowns.json", JSON.stringify(cooldowns), (err) => {
                if(err) console.log(err);       
            });
        } else {
            cooldowns[message.author.id] = Date.now();
            fs.writeFile("./cooldowns.json", JSON.stringify(cooldowns), (err) => {
                if(err) console.log(err);       
            });
        }

        dailyembed.addField("Money collected", `You collected your daily reward of ${reward}! Your new balance is ${money[message.author.id].money}! `)
        dailyembed.setColor("#db9c1d");
        return message.channel.send(dailyembed);

    } else {

        if (!cooldowns[message.author.id]) {

            cooldowns[message.author.id] = {
                name: bot.users.cache.get(message.author.id).tag,
                daily: Date.now()
            }
            fs.writeFile("./cooldowns.json", JSON.stringify(cooldowns), (err) => {
                if(err) console.log(err);       
            });

            money[message.author.id].money += reward;
            fs.writeFile("./money.json", JSON.stringify(money), (err) => {
                if(err) console.log(err);
            });

            dailyembed.addField("You cashed out", ` your daily reward of ${reward}! Your new balance is ${money[message.author.id].money}coins!! `)
            dailyembed.setColor("#db9c1d");
            return message.channel.send(dailyembed);

        } else {
            if(timeout - (Date.now() - cooldowns[message.author.id].daily) > 0) {

                let time = ms(timeout - (Date.now() - cooldowns[message.author.id].daily));

                dailyembed.setColor("#e01919");
                dailyembed.addField("Daily cash out failed", `**You already collected your daily reward!**`)
                dailyembed.addField("Collect again in",  `${time.hours}h ${time.minutes}m ${time.seconds}s`);
                return message.channel.send(dailyembed);

            } else {

                money[message.author.id].money += reward;
                fs.writeFile("./money.json", JSON.stringify(money), (err) => {
                    if(err) console.log(err);
                });

                cooldowns[message.author.id] = Date.now();
                fs.writeFile("./cooldowns.json", JSON.stringify(cooldowns), (err) => {
                    if(err) console.log(err);       
                });

                dailyembed.addField("You cashed out", ` your daily reward of ${reward}! Your new balance is ${money[message.author.id].money}! `)
                dailyembed.setColor("#db9c1d");
                return message.channel.send(dailyembed)
    
            }
            
        }


    }

    }
    //name of command and aliases
    module.exports.help = {
        name: "daily",
        aliases: []
    }