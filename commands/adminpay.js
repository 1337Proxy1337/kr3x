
const Discord = require("discord.js")
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    if(message.author.id != "644194388767146012") return message.reply("You can't use this command!")

    let adminpayembed = new Discord.MessageEmbed();
    adminpayembed.setTitle("AdminPayout!")

   let user = message.mentions.members.first() || bot.users.cache.get(args[0]);
   if(!user) return message.reply("Couldn`t find that user!")

   if(!args[1]) return message.reply("Please specify the amount you want to pay.")

   if(!money[user.id]) {
 
       money[user.id] = {
           name: bot.users.cache.get(user.id).tag,
           money: parseInt(args[1])
       }



       fs.writeFile("./money.json", JSON.stringify(money), (err) => {
           if(err) console.log(err);
       });

   } else {

    money[user.id].money += parseInt(args[1]);

    fs.writeFile("./money.json", JSON.stringify(money), (err) => {
        if(err) console.log(err);
       });
   }
   adminpayembed.setTitle("Admin Payout")
   adminpayembed.addFields( (
       { name: 'You gifted', value: `${args[1]} Coins to ${bot.users.cache.get(user.id).username}!` }
     )
     )
     adminpayembed.setColor("#db9c1d");
    return message.channel.send(adminpayembed)
}

module.exports.help = {
    name: "apay",
    aliases: ["agive"]
}