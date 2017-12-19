import React, { Component } from 'react';

import { Row, Col, Panel, Well, Button, Glyphicon, Grid, FormGroup, FormControl, ControlLabel, Tooltip, OverlayTrigger } from 'react-bootstrap';


class Addsong extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: "",
            repeats: "0",
            start: "0"
        }
    }

    handleChange(name, e) {
        if (name === "url")
            this.setState({ url: e.target.value })
        else if (name === "repeats" && !isNaN(e.target.value))
            this.setState({ repeats: e.target.value })
        else if (name === "start" && !isNaN(e.target.value))
            this.setState({ start: e.target.value })
    }

    getValidationState(type) {
        if (type === "url") {
            if (this.state.url.startsWith("http") || this.state.url === "")
                return null;
            else return 'error';
        }
        else if (type === "repeats") {

            var n = Math.floor(Number(this.state.repeats));
            if (String(n) === this.state.repeats && n >= 0) {
                return null;
            }
            else return 'error';
        }
        else if (type === "start") {

            var n = Math.floor(Number(this.state.start));
            if (String(n) === this.state.start && n >= 0) {
                return null;
            }
            else return 'error';
        }
    }

    addSong(e) {
        e.preventDefault()
        if (this.getValidationState("url") === "error" 
        || this.getValidationState("repeats") === "error" 
        || this.getValidationState("start") === "error"
        || this.state.url === ""){         
            return
        }
            this.props.onInput({ type: "addsong", link: this.state.url, repeats: this.state.repeats, start: this.state.start})
            this.setState({url:""})
    }



    render() {

        const repeatsTooltip = (<Tooltip id="tooltip"><p>How many times the song should repeat</p></Tooltip>)
        const startTooltip = (<Tooltip id="tooltip"><p>At which point should the song start (in seconds)</p></Tooltip>)

        const addSongStyle = {marginTop: "25px", width: "80%"}
        const header = (<div className="panelHeader"><strong>Add song</strong></div>)
        
        return (
            <Panel header={header}>
                <form>
                    <FormGroup validationState={this.getValidationState("url")}>
                        <ControlLabel>YouTube URL</ControlLabel>

                        <FormControl
                            type="text"
                            placeholder="YouTube url"
                            value={this.state.url}
                            onChange={(e) => this.handleChange("url", e)}
                        />

                    </FormGroup>
                    <Row>
                        <Col md={3}>
                            <FormGroup validationState={this.getValidationState("repeats")}>
                                <ControlLabel>Repeats</ControlLabel>
                                <OverlayTrigger placement="bottom" overlay={repeatsTooltip}>
                                    <FormControl
                                        type="text"
                                        placeholder="repeats"
                                        value={this.state.repeats}
                                        onChange={(e) => this.handleChange("repeats", e)}
                                    />
                                </OverlayTrigger>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup validationState={this.getValidationState("start")}>
                                <ControlLabel>Start</ControlLabel>
                                <OverlayTrigger placement="bottom" overlay={startTooltip}>
                                    <FormControl
                                        type="text"
                                        placeholder="Start"
                                        value={this.state.start}
                                        onChange={(e) => this.handleChange("start", e)}
                                    />
                                </OverlayTrigger>
                            </FormGroup>
                        </Col>
                        <Col md={6}>

                            <Button type="submit" onClick={(e) => this.addSong(e)} style={addSongStyle}>
                                Add song
                        </Button>
                        </Col>
                    </Row>
                </form>
            </Panel>
        )
    }
}

export default Addsong;