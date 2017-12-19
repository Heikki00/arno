import React, { Component } from 'react';
import './App.css';
import TopBar from './components/topbar.js'
import Player from './components/player.js'

import {Button} from 'react-bootstrap';


class App extends Component {
  ws = null;
  
  constructor(props){
    super(props)
    this.state = {
        botState: null
    }
  }


  handleInput(obj){
    if(this.connection){
      this.connection.send(JSON.stringify(obj));
    }
  }


  componentDidMount(){
    let connection = new WebSocket("ws://localhost:8888")

    connection.onopen = () => {
      this.connection = connection;   
    }

    connection.onmessage = (evt) => {
      this.setState({
        botState: JSON.parse(evt.data)
      })
    }

    connection.onclose = connection.onerror = (evt) => {
      this.connection = null;
    }
  }

  render() {
    if(this.state.botState === null){
      return (<div className="App">
        <p> Can't connect to ArnoBot server!</p>
      </div>)
    }
    return (
      <div className="App">
        <TopBar/>
        <Player onInput={(type) => this.handleInput(type)} player={this.state.botState.player}/>

        
        <footer className="footer">
          <p> &copy; 2017 WTFP</p>
        </footer>
      </div>
    );
  }
}

export default App;
