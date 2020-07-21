const fs = require("fs");
const Discord = require("discord.js");
const mongoose = require("mongoose");
const botconfig = require("../botconfig.json");

// database
mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// MODELS
const Data = require("../models/data.js");

module.exports.run = async (bot, message, args) => {

    let balanceembed = new Discord.MessageEmbed();
    balanceembed.setTitle("Balance")
    

if(!args[0]) {
    var user = message.author;
} else {
    var user = message.mentions.users.first() || bot.users.cache.get(args[0]);
}

  Data.findOne({
      userID: user.id
  }, (err, data) => {
      if(err) console.log(err);
      if(!data) {
          const newData = new Data({
              name: bot.users.cache.get(user.id).username,
              userID: user.id,
              lb: "all",
              money: 0,
              daily: 0,
          })
          newData.save().catch(err => console.log(err));
          balanceembed.addFields( (
        { name: 'You Have', value: `${newData.money} Coins!` }
      )
      )
          return message.channel.send(balanceembed)
      } else {
                    balanceembed.addFields( (
        { name: 'You Have', value: `${data.money} Coins!` }
      )
      )
      balanceembed.setColor("#db9c1d");
        return message.channel.send(balanceembed)
        
      }
  })

if(!money[user.id]) {
    money[user.id] = {
        name: bot.users.cache.get(user.id).tag,
        money: 0
    }
 
  return message.channel.send(balanceembed); 
}
}

module.exports.help = {
    name: "balance",
    aliases: ["bal"]
}