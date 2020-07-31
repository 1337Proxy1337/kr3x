// Modules


const Discord = require("discord.js")

let premiumembed = new Discord.MessageEmbed();
premiumembed.setTitle = "Premium checker"
premiumembed.setColor = "#000000"

// Normal Server

let nopremiumembed = new Discord.MessageEmbed();
nopremiumembed.setTitle = "Premium checker"
nopremiumembed.setColor = "#000000"

// Premium Server

if(Discord.Guild.id === 732211012526276678)
premiumembed.addField('This Server Has Premium!');
premiumembed.addField('Premium Advantages:');
premiumembed.addField('2x Work command payment');
premiumembed.addField('2x Premium daily command');
premiumembed.addField('Access to promoting ur server'); 
message.reply(premiumembed) 

//declaration or statement expected 


} else {
nopremiumembed.addField('This server doesnt have premium!')

message.reply(nopremiumembed)


module.exports.help = {
    name: "ping",
    aliases: ["p"]
}
}
