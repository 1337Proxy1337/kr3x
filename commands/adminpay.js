const money = require("../money.json");
const Discord = require("discord.js")
const fs = require("fs");
const mongoose = require("mongoose");
const botconfig = require("../botconfig.json")

// database
mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// MODELS
const Data = require("../models/data.js");
const data = require("../models/data.js")

module.exports.run = async (bot, message, args) => {

    let adminpayembed = new Discord.MessageEmbed();
   

   let user = message.mentions.members.first() || bot.users.cache.get(args[0]);
   if(!user) return message.reply("Couldn`t find that user!")

   Data.findOne({
       userID: message.author.id
   }, (err, authorData) => {
       if(err) console.log(err);
       if(!authorData) {
               return message.reply("You don't have any coins to send!")
       } else {
            Data.findOne({
                userID: user.id
            }, (err, userData) => {
                if(err) console.log(err)

                if(!args[1]) return message.reply("Please specify the amount you want to pay.");
             
             
                if(!userData) {
                    const newData = new Data({
                        name: bot.users.cache.get(user.id).username,
                        userID: user.id,
                        lb: "all",
                        money: parseInt(args[1]),
                        daily: 0,
                    })
                     newData.save().catch(err => console.log(err));
                } else {
                   userData.money += parseInt(args[1]),
                   userData.save().catch(err => console.log(err));
                }
            }    
            )
        }
     }
   )


   adminpayembed.setTitle("Gift!")
   adminpayembed.addFields( (
       { name: 'You gifted', value: `${args[1]} Coins to ${bot.users.cache.get(user.id).username}!` }
     )
     )
     adminpayembed.setColor("#D4AF37");

   message.reply(adminpayembed)
}

module.exports.help = {
    name: "ap",
    aliases: ["ag", "adp"]
}