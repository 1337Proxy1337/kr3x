const Discord = require("discord.js")
const fs = require("fs")
const money = require ("../money.json")
const ms = require("parse-ms");
const cooldowns = require("../cooldowns.json");
const { time } = require("console");

module.exports.run = async (bot, message, args) => {

    let timeout = 1200;
    let reward = 10;

    let salaryembed = new Discord.MessageEmbed();
    salaryembed.setTitle("Salary")

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

        salaryembed.addField("You cashed out", `your salary of ${reward}! Your new balance is ${money[message.author.id].money}Coins! `)
        salaryembed.setColor("#db9c1d");
        return message.channel.send(salaryembed);

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

            salaryembed.addField("You cashed out", ` your salary of ${reward}! Your new balance is ${money[message.author.id].money }Coins! `)
            salaryembed.setColor("#db9c1d");
            return message.channel.send(salaryembed);

        } else {
            if(timeout - (Date.now() - cooldowns[message.author.id].daily) > 0) {

                let time = ms(timeout - (Date.now() - cooldowns[message.author.id].daily));

                salaryembed.setColor("#e01919");
                salaryembed.addField("Work failed", `**You already worked!**`)
                salaryembed.addField("Work again in",  `${time.hours}h ${time.minutes}m ${time.seconds}s`);
                return message.channel.send(salaryembed);

            } else {

                money[message.author.id].money += reward;
                fs.writeFile("./money.json", JSON.stringify(money), (err) => {
                    if(err) console.log(err);
                });

                cooldowns[message.author.id] = Date.now();
                fs.writeFile("./cooldowns.json", JSON.stringify(cooldowns), (err) => {
                    if(err) console.log(err);       
                });

                salaryembed.addField("You cashed out", ` your salary of ${reward}! Your new balance is ${money[message.author.id].money} Coins! `)
                salaryembed.setColor("#db9c1d");
                return message.channel.send(salaryembed)
    
            }
            
        }


    }

    }
    //name of command and aliases
    module.exports.help = {
        name: "work",
        aliases: []
    }