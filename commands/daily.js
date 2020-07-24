const Discord = require("discord.js")
const ms = require("parse-ms");
const { time } = require("console");
const botconfig = require("../botconfig.json")

module.exports.run = async (bot, message, args) => {

    // database
mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// MODELS
const Data = require("../models/data.js");


    let timeout = 86400000;
    let reward = 250;

    let dailyembed = new Discord.MessageEmbed();
    dailyembed.setTitle("Daily reward!")

    let collectagainembed = new Discord.MessageEmbed();
    collectagainembed.setTitle("Daily reward!")

    let balanceembed = new Discord.MessageEmbed();
    balanceembed.setTitle("Balance")

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
            balanceembed.addFields( (
          { name: 'You have', value: `${reward} Coins!` }
        )
        )
            message.channel.send(balanceembed)
        } else {
            if(timeout - (Date.now() - data.daily) > 0) {
            let time = ms(timeout - (Date.now() - data.daily))
             message.reply(collectagainembed);
        } else {
         data.money += reward;
         data.daily = Date.now();
         data.save().catch(err => console.log(err));
         
          message.reply(dailyembed); 

         collectagainembed.addFields( 
            { name: 'You already collected your daily reward!', value: `collect again in ${time.hours}h ${time.minutes}m ${time.seconds}s` }
          
          )          

                  balanceembed.addFields( 
      { name: 'You Have', value: `${data.money} Coins!` } 
    
                  )
        }
    }
}
    )
}
    

      
    

    module.exports.help = {
        name: "daily",
        aliases: []
    }
