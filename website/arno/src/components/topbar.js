import React, { Component } from 'react';

import {Navbar, Nav, NavDropdown, MenuItem, NavItem} from 'react-bootstrap';


class TopBar extends Component {


    constructor(props){
        super(props)
        this.state = {
            page: "player"
        }
    }

    handleSelect(eventKey, e){
        console.log(eventKey)
    }

    render() {
        return (
            <Navbar onSelect={(ek, e) => this.handleSelect(ek, e)}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">ArnoBotti</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1} href="#">Player</NavItem>
                </Nav>
            </Navbar>
        )
    }


} 

export default TopBar;