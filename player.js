timers = require("timers")


const ytdl = require("ytdl-core")

const options = {
    seek: 0,
    volume: 1,
    passes: 1,
    bitrate: 48000
}


var streamDispatcher = null;

var connection = null;

var current = null

var queue = []

const ytdlOptions = {
    filter: "audioonly"
}

var paused = false;
var stateChanged = null;

exports.getState = () => {
    console.log("PLAYER: Getting the state...")
    let state =  {
        queue: queue,
        volume: options.volume,
        paused: paused,
        current: current,
    }
    if(connection.dispatcher){
        state = Object.assign(state, {time: connection.dispatcher.time})
        console.log(connection.dispatcher.time)
    }
    
    return state
}


exports.init = (voiceConnection, stateChangedd) => {
    console.log("PLAYER: initing...")
    connection = voiceConnection;
    stateChanged = stateChangedd;
}

exports.kill = () => {
    console.log("PLAYER: killing...")
    connection = null;
}

exports.pause = (state) => {
    console.log("PLAYER: pausing: " + state)
    if (!connection.dispatcher || paused === state) return;
    if (paused) connection.dispatcher.resume();
    else connection.dispatcher.pause();
    paused = state;
    stateChanged()
}

exports.isPaused = () => paused

exports.setVolume = (volume) => {
    console.log("PLAYER: Volume set to " + volume)
    options.volume = volume;
    if (connection.dispatcher)
        connection.dispatcher.setVolumeLogarithmic(volume);
    stateChanged()
    
}


function startNext() {

    console.log("PLAYER: Starting " + JSON.stringify(queue[0]))
    current = queue[0];
    if (current.loops > 0) current.loops = current.loops - 1;
    else queue.shift()



    const stream = ytdl(current.link, ytdlOptions);

    connection.playStream(stream, Object.assign(options, { seek: current.seek }));
    stateChanged()

    connection.dispatcher.on("end", (reason) => {
        setTimeout(() => {
            console.log("PLAYER: Streamendcallbackthing")
            current = null;
            if (queue.length != 0) {
                startNext()
            }
            else stateChanged()
        }, 200)
    })


}

exports.skip = () => {
    console.log("PLAYER: Skipping")
    if (connection.dispatcher)
        connection.dispatcher.end("skip")


}


exports.addToQueue = (link, seek, loops) => {
    seek = seek === undefined ? 0 : seek;
    loops = loops === undefined ? 0 : loops;
    console.log("PLAYER: requesting yt info for " + link)
    ytdl.getInfo(link, (err, info) => {

        
        queue.push({ link: link, seek: seek, loops: loops, length: Number(info.length_seconds), title: info.title });
        if (!connection.dispatcher) {
            startNext()
        }
        stateChanged()
        console.log("PLAYER: Added " + info.title + " to queue!")
    })

}

exports.getQueue = () => queue

exports.stfu = () => {
    console.log("PLAYER: Shutting the fuck up")
    queue = []
    if (connection.dispatcher)
        connection.dispatcher.end("stfu")
    stateChanged()
}