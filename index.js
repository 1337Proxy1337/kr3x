const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: false });
const botconfig = require("./botconfig.json");
const fs = require("fs");

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

// Make Bot Read Commands.
fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0) {
        console.log("Couldn`t Find Any Commands!");
        return;

       }

       jsfile.forEach((f) => {
           let props = require(`./commands/${f}`)
           console.log(`${f} loaded!`)
           bot.commands.set(props.help.name, props);

           props.help.aliases.forEach(alias => {
               bot.aliases.set(alias, props.help.name);
           })
       })


})


//bot activity message
bot.on("ready", async () =>{
    console.log(`${bot.user.username} is online on ${bot.guilds.cache.size} servers!`);
    bot.user.setActivity(`Upgrading ${bot.guilds.cache.size} Servers!`)
})

bot.on("message", async message => {

    //check channel type
    if(message.channel.type === "dm") return;
    if(message.author.bot) return;

    // find prefix
    let prefix = botconfig.prefix;

    // prefix.check
    if(!message.content.startsWith(prefix)) return;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd
    cmd = args.shift().toLowerCase();
    let command;
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot, message, args);

    // CommandsFiles
     if(bot.commands.has(cmd)) {
         command = bot.commands.get(cmd);
     } else if (bot.aliases.has(cmd)) {
         command = bot.commands.get(bot.aliases.get(cmd));
     }
     try {
         command.run(bot, message, args);
     } catch (e) {
         return;
     }
})

bot.login(botconfig.token);
