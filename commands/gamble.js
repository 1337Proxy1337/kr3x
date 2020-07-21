const Discord = require("discord.js");
const money = require("../money.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    let lostgambleembed = new Discord.MessageEmbed();
    lostgambleembed.setTitle("Gamble")
    
      lostgambleembed.setColor("#ff0000");

      let wingambleembed = new Discord.MessageEmbed();
      wingambleembed.setTitle("Gamble")

      wingambleembed.setColor("#00ff44");
  
    var maxBet = 9999999999
    

    if(!money[message.author.id] || money[message.author.id].money <= 0) return message.reply("you don't have any coins.");

    if(!args[0]) return message.reply("please specify a bet.");

    try {
        var bet = parseFloat(args[0]);
    } catch {
        return message.reply("you can only enter whole numbers.");
    }

    if(bet != Math.floor(bet)) return message.reply("you can only enter whole numbers.");

    if(money[message.author.id].money < bet) return message.reply("you don't have that much coins!");

    if(bet > maxBet) return message.reply(`the maximum bet is ${maxBet.toLocaleString()}!`);

    let chances = ["win","win","win","win","lose","lose","lose","lose","lose","lose"]
    var pick = chances[Math.floor(Math.random() * chances.length)]

    if(pick === "lose") {
        money[message.author.id].money -= bet;
        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if(err) console.log(err);
        }); 
        
        lostgambleembed.addFields( (
        { name: 'You Lost! ', value: `You lost ${bet} coins by gambling!`}
      )
      )
       return message.reply(lostgambleembed);
    } else {
        money[message.author.id].money += bet += bet;
        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if(err) console.log(err);
        }); 
        
              wingambleembed.addFields( (
          { name: 'You Won!', value: `You gained ${bet * 1} coins by gambling!`}
      )
      )
        return message.reply(wingambleembed);
    }

}

  module.exports.help = {
    name: "gamble",
    aliases: ["gamb"]
}