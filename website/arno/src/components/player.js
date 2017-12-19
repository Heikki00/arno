import React, { Component } from 'react';

import { Row, Col} from 'react-bootstrap';

import PlayerControls from './playercontrols.js'

import Playlist from './playlist.js'

import Addsong from './addsong.js'

function Player(props) {
    let songs = [props.player.current].concat(props.player.queue)

    songs = songs.filter(song => song !== null)

    return (
        <Row>
            <Col md={3}>
                <PlayerControls onInput={props.onInput} player={props.player}/>
                <Addsong onInput={props.onInput}/>
            </Col>
            <Col md={9}>
                <Playlist songs={songs} paused={props.player.paused} time={props.player.time}/>
            </Col>
        </Row>
    )

}

export default Player