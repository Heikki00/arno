import React, { Component } from 'react';

import { Row, Col, Panel, Well, Button, Glyphicon, Grid, ProgressBar, Label} from 'react-bootstrap';

function toSeconds(ms){
    return Math.floor(ms / 1000.0)
}

class Song extends Component {
    constructor(props){
        super(props)
        console.log("Constructor!")
        this.state = {
            time: toSeconds(props.time),
            startTime: toSeconds(props.time)
        }
    }

    componentWillUnmount(){
        if(!this.props.first) return
        clearInterval(this.timer)
    }
    componentDidMount(){
        if(!this.props.first) return
        this.timer = setInterval(() => {
            this.setState((prevState, props) => {
                if(toSeconds(props.time) != prevState.startTime){
                    console.log("Updatetime")
                    return {time: toSeconds(props.time), startTime: toSeconds(props.time)}
                }        

                return {time: prevState.time + (props.paused ? 0 : 1)}
            })
        }, 1000);
            
        
    }

    render() {
        let now = Math.floor((this.state.time / this.props.song.length) * 100)
       
        return (
            <div>
            <a href={this.props.song.link} target="_blank">{this.props.song.title}</a> 
            <Label bsStyle="info" style={{marginLeft:"10px"}}><Glyphicon glyph="repeat"/> {this.props.song.loops}</Label>
            {this.props.first && 
            <ProgressBar active now={now} label={`${now}%`} style={{textAlign: "center"}}/>
            }
            </div>
        )
    }
}

export default Song;