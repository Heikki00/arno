const WebSocket = require('ws')

const port = 8888;
var wss = null;
var player = null
var killBot = null
exports.broadcastState = () => {
    wss.clients.forEach((client) => {
        let state = JSON.stringify({
            player: player.getState()
        })
        console.log("Bradcasting state: " + state)

        if(client.readyState === WebSocket.OPEN) client.send(state)
    })
}

exports.init = (pla, kill) => {
    player = pla;
    killBot = kill;
    wss = new WebSocket.Server({port: port});
    console.log("Websocket server created!");

    wss.on('connection', (ws) => {
        console.log("New WbSocket connection")
        exports.broadcastState()
        ws.on('message', (message) => {
            let obj = JSON.parse(message)
            console.log("RECIEVED MESSAGE: " + message)
            if(obj.type === "playpause"){
                player.pause(!player.isPaused())
            }
            else if(obj.type  === "stop"){
                player.stfu()
            }
            else if(obj.type  === "skip"){
                player.skip()
            }
            else if(obj.type  === "volume"){
                player.setVolume(obj.value)
            }
            else if(obj.type  === "addsong"){
                player.addToQueue(obj.link, obj.start, obj.repeats)
            }
            else if(obj.type === "kill"){
                killBot()
            }
        })
    })


   

}
