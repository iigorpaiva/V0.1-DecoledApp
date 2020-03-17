import React, { Component } from 'react';
import ToggleButton from 'react-toggle-button';
import logo from './logo.svg';
import './App.css';

 class App extends Component {
   constructor(props) {
    super(props);
    this.state = { ledOnB: false,
                   ledOnG: false };
  }

  setLedStateB(state){
    this.setState({ ledOnB: state !== '0' })
  }

  setLedStateG(state){
    this.setState({ ledOnG: state !== '0' })
  }

  componentDidMount() {
    fetch('/ledB')
     .then(response => response.text())
     .then(state => this.setLedStateB(state));
    fetch('/ledG')
     .then(response => response.text())
     .then(state => this.setLedStateG(state));
  }

  handleStateChangeB(ledOn) {
    fetch('/ledB', { method: 'PUT', body: ledOnB ? '0' : '1' })
      .then(response => response.text())
      .then(state => this.setLedStateB(state));
  }

  handleStateChangeG(ledOn) {
    fetch('/ledG', { method: 'PUT', body: ledOnG ? '0' : '1' })
      .then(response => response.text())
      .then(state => this.setLedStateG(state));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <ToggleButton
            value={this.state.ledOnB}
            onToggle={value => this.handleStateChangeB(value)}
          />
          <ToggleButton
            value={this.state.ledOnG}
            onToggle={value => this.handleStateChangeG(value)}
          />
      </header>
    </div>
  );
  }
}

export default App;