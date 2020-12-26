    // Modules

    module.exports.run = async (bot, message, args) => {
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
    premiumembed.addFields (
        { name: 'This server has premium!', value: 'to see premium advantages use command k!premiumad!' },
    )
    message.reply(premiumembed) 
    
    
    }
    module.exports.help = {
        name: "premium",
        aliases: ["pre"]
    }
    
    