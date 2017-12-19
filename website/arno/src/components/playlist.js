import React, { Component } from 'react';

import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap';

import Song from './song.js'

function Playlist(props) {
        let songs = props.songs.map((song, index) => (<ListGroupItem> <Song song={song} paused={props.paused} time={props.time} first={index === 0}/> </ListGroupItem>) )
        const header = (<div className="panelHeader"><strong>Playlist</strong></div>)
        
        return (
            
            <Panel header={header} style={{width: "97%"}}>
                <ListGroup>
                    {songs}
                </ListGroup>
            </Panel>
        )
    }


export default Playlist;