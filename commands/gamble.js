const Discord = require("discord.js");
const money = require("../money.json");
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

    let lostgambleembed = new Discord.MessageEmbed();
    lostgambleembed.setTitle("Gamble")
    
      lostgambleembed.setColor("#ff0000");

      let wingambleembed = new Discord.MessageEmbed();
      wingambleembed.setTitle("Gamble")

      wingambleembed.setColor("#00ff44");

      let specifyabetembed = new Discord.MessageEmbed();
      specifyabetembed.setTitle("Gamble")

      let wholenumberembed = new Discord.MessageEmbed();
      wholenumberembed.setTitle("Gamble")

      let nocoinsembed = new Discord.MessageEmbed();
      nocoinsembed = new Discord.MessageEmbed();

  
    var maxBet = 9999999999;
    


    Data.findOne({
        userID: user.id
    }, (err, data) => {
        if(err) console.log(err);
        if(!data) {
            const newData = new Data({
                name: message.author.username,
                userID: message.author.id,
                lb: "all",
                money: 0,
                daily: 0,
            })
            newData.save().catch(err => console.log(err));
            return message.reply(nocoinsembed)
        } else {
            var maxBet = 9999999999;

        }
    })
    if(data.money <= 0) return message.reply(nocoinsembed);

    if(!args[0]) return message.reply(specifyabetembed);

    try {
        var bet = parseFloat(args[0]);
    } catch {

        wholenumberembed.addFields ( (
         { name: 'Bet', value: `You can only enter whole numbers.`}
        )
        )
        return message.reply(wholenumberembed);
    }

    if(bet != Math.floor(bet)) return message.reply(wholenumberembed);

    nocoinsembed.addFields((
    { name: 'Bet', value: `You don't have enough coins!`}
    )
    )

    if(data.money < bet) return message.reply(nocoinsembed);

    if(bet > maxBet) return message.reply(`the maximum bet is ${maxBet.toLocaleString()}!`);

    let chances = ["win","win","win","lose","lose","lose","lose","lose","lose","lose"]
    var pick = chances[Math.floor(Math.random() * chances.length)]

    if(pick === "lose") {
        data.money -= bet;
        data.save().catch(err => console.log(err));

        specifyabetembed.addFields( (
            { name: 'Bet ', value: `Please specify a bet.`}
                     
        )
        )
        
        lostgambleembed.addFields( (
        { name: 'You Lost! ', value: `You lost ${bet} coins by gambling!`}
      )
      )
       return message.reply(lostgambleembed);
    } else {
        data.money += bet += bet;
        data.save().catch(err => console.log(err));
        
              wingambleembed.addFields( (
          { name: 'You Won!', value: `You gained ${bet * 1} coins by gambling!`}
      )
      )
        return message.reply(wingambleembed);
    }

}

  module.exports.help = {
    name: "gamble",
    aliases: ["g"]
}