const Discord = require("discord.js")
const ms = require("parse-ms");
const { time } = require("console")
const botconfig = require("../botconfig.json")
const mongoose = require("mongoose");


module.exports.run = async (bot, message, args,) => {

    // database
mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// MODELS
const Data = require("../models/data.js");

    let user = message.author;
    let timeout = 30000;
    let reward = 15;
    let premiumreward = 30;

    let dailyembed = new Discord.MessageEmbed();
    dailyembed.setTitle("Daily reward!")

    let premiumrewardembed = new Discord.MessageEmbed();
    premiumrewardembed.setTitle("Premium salary")
    premiumrewardembed.setColor("#ff7b00")

    let salaryembed = new Discord.MessageEmbed();
    salaryembed.setTitle("Salary")
    salaryembed.setColor("#ff7b00")

    let collectagainembed = new Discord.MessageEmbed();
    collectagainembed.setTitle("Salary")
    collectagainembed.setColor("#D4AF37")

    Data.findOne({
        userID: user.id
    }, (err, data) => {
        if(err) console.log(err);
        if(!data) {
            const newData = new Data({
                name: message.author.username,
                userID: message.author.id,
                lb: "all",
                money: reward,
                daily: Date.now(),
            })
            newData.save().catch(err => console.log(err));
        } else {
            if(timeout - (Date.now() - data.daily) > 0) {
            let time = ms(timeout - (Date.now() - data.daily))

            collectagainembed.addFields( 
                { name: 'You already collected your salary', value: `collect again in ${time.minutes}m ${time.seconds}s` }
              
              )
              
              
            message.reply(collectagainembed);

           
            }else if(Discord.Guild.id === 732211012526276678) {
                data.money += reward * 2;
                
                data.save().catch(err => console.log(err));

        premiumrewardembed.addFields(
            { name: "You cashed out", value: `your premium salary of ${premiumreward}! Your new balance is ${data.money}Coins!`}
         )
        message.reply(premiumrewardembed)
                } else  {
         data.money += reward;
         data.daily = Date.now();
         data.save().catch(err => console.log(err));
        
         salaryembed.addFields(
            { name: "You cashed out", value: `your salary of ${reward}! Your new balance is ${data.money}Coins!`}
         )
          message.reply(salaryembed)

        }
     }
    })
}


    module.exports.help = {
        name: "work",
        aliases: []
    }
