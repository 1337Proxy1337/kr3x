const money = require("../money.json");
const Discord = require("discord.js")
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    let payoutembed = new Discord.MessageEmbed();
    payoutembed.setTitle("Payout!")

   let user = message.mentions.members.first() || bot.users.cache.get(args[0]);
   if(!user) return message.reply("Couldn`t find that user!")

   if(!args[1]) return message.reply("Please specify the amount you want to pay.");

   if(!money[message.author.id]) return message.reply("Sorry,you don't have any coins!");

   if(user.id === message.author.id) return message.channel.send("You cannot pay yourself!")

   if(parseInt(args[1])  > money[message.author.id].money) return message.reply("You do not have enough coins!");
   if(parseInt(args[1]) < 1) return message.reply("You can't pay less than 1 coins!");

   if(!money[user.id]) {
 
       money[user.id] = {
           name: bot.users.cache.get(user.id).tag,
           money: parseInt(args[1])
       }

        money[message.author.id].money -= parseInt(args[1])

       fs.writeFile("./money.json", JSON.stringify(money), (err) => {
           if(err) console.log(err);
       });

   } else {

    money[user.id].money += parseInt(args[1]);
    money[message.author.id].money -= parseInt(args[1]);

    fs.writeFile("./money.json", JSON.stringify(money), (err) => {
        if(err) console.log(err);
       });
   }
   adminpayembed.setTitle("Payout!")
   adminpayembed.addFields( (
       { name: 'You gifted', value: `${args[1]} Coins to ${bot.users.cache.get(user.id).username}!` }
     )
     )
     adminpayembed.setColor("#D4AF37");
   return message.channel.send(adminpayembed)
}

module.exports.help = {
    name: "pay",
    aliases: ["give"]
}