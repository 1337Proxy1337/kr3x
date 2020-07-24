const Discord = require("discord.js")
const ms = require("parse-ms");
const { time } = require("console");

module.exports.run = async (bot, message, args) => {

    let timeout = 86400000;
    let reward = 50;

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
                 message.channel.send(dailyembed)
    
            }
            
        }
        //end of unreachable code

    }
    

    module.exports.help = {
        name: "daily",
        aliases: []
    }
})
}
