const fs = require("fs");
const Discord = require("discord.js");
const player = require("./player.js")
const websocket = require('./websocket.js')

const client = new Discord.Client();

const config = JSON.parse(fs.readFileSync("./config.json").toString("utf-8"))
var helpfile = fs.readFileSync("./help.txt").toString("utf-8")



function killBot(){
    console.log("Killing the bot!")
    client.destroy().then(() => {
        process.exit()
    })
}


var voiceConnection = null;


client.on('ready', () => {
    console.log("Logged in, starting to init shit...")
  client.channels.forEach((channel) => {
      if(channel.type === "voice" && channel.id === config.vchannel){
          channel.join().then((connection) => {
            voiceConnection = connection;

            player.init(connection, () => {
                console.log("State changed!")
                websocket.broadcastState();         
            });
            websocket.init(player, kill);
          })
      }
  })
});


client.on('message', msg => {
    if(msg.channel.id === config.commandChannel){
        let words = msg.toString().split(" ").filter((s) => s);
        
        console.log("Recieved message on command channel: " + words);
        if(words.length == 0) return;
        if(words[0].startsWith("!")) msg.delete()

        if(words[0] === "!play"){
            if(voiceConnection !== null && words.length > 1){
                player.addToQueue(words[1], words[3], words[2]); 
            }
        }
        else if(words[0] === "!volume"){
            if(voiceConnection !== null  && words[1]){
                try{
                    var vol = parseFloat(words[1]) / 100.0
                }
                catch(err){
                    return
                }
                player.setVolume(vol) 
            }
        }
        else if(words[0] === "!skip"){
            if(voiceConnection !== null){
                player.skip()
            }
        }
        else if(words[0] === "!stfu"){
            if(voiceConnection !== null){
               player.stfu()
            }
        }
        else if(words[0] === "!pause"){
            if(voiceConnection !== null){
               player.pause(true)
            }
        }
        else if(words[0] === "!resume"){
            if(voiceConnection !== null){
               player.pause(false)
            }
        }
        else if(words[0] === "!help"){
            console.log(helpfile)
            msg.channel.send(helpfile).catch((err) => {})
        }
        
    }
});

client.login(config.discordToken);