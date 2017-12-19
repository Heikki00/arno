const WebSocket = require('ws')

const port = 8888;
var wss = null;
var player = null

exports.broadcastState = () => {
    wss.clients.forEach((client) => {
        if(client.readyState === WebSocket.OPEN) client.send(JSON.stringify({
            player: player.getState()
        }))
    })
}

exports.init = (pla) => {
    player = pla;
    wss = new WebSocket.Server({port: port});
    console.log("Websocket server created!");

    wss.on('connection', (ws) => {
        exports.broadcastState()
        ws.on('message', (message) => {
            let obj = JSON.parse(message)

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
        })
    })


   

}
