import React, { Component } from 'react';

import { Panel, Well, Button, Glyphicon } from 'react-bootstrap';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';

import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css'
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;

function SliderHandle(props) {
    const { value, dragging, index, ...restProps } = props;
    return (
        <Tooltip
            prefixCls="rc-slider-tooltip"
            overlay={value}
            visible={dragging}
            placement="top"
            key={index}
        >
            <Handle value={value} {...restProps} />
        </Tooltip>
    );
}


function PlayerControls(props) {

    const playpauseStyle = {
        margin: "10px",
        width: "80%"
    }

    const otherButtonStyle = {
        margin: "10px",
        width: "37%"
    }

    const header = (<div className="panelHeader"><strong>Player Controls</strong></div>)

    return (
        <Panel header={header}>
            <Well>
                <Button onClick={() => props.onInput({ type: "playpause" })} style={playpauseStyle}>
                    <Glyphicon glyph="play" /> / <Glyphicon glyph="pause" />
                </Button>
                <div>
                    <Button onClick={() => props.onInput({ type: "stop" })} style={otherButtonStyle}>
                        <Glyphicon glyph="stop" />
                    </Button>
                    <Button onClick={() => props.onInput({ type: "skip" })} style={otherButtonStyle}>
                        <Glyphicon glyph="step-forward" />
                    </Button>
                </div>
            </Well>
            <p> Volume </p>
            <Slider handle={SliderHandle} min={0} max={200} value={props.player.volume * 100} onChange={(val) => props.onInput({ type: "volume", value: val / 100.0 })} />
        </Panel>
    )
}


export default PlayerControls;