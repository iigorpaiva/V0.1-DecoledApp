import React, { Component } from "react";
import ToggleButton from "react-toggle-button";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { ledon1: false, ledOn2: false,
                   ledon3: false, ledOn4: false  };
  }

  // SETA OS LEDS
  setledstate1(state) {
    this.setState({ ledon1: state !== "0" });
  }

  setledstate2(state) {
    this.setState({ ledon2: state !== "0" });
  }

  setledstate3(state) {
    this.setState({ ledon3: state !== "0" });
  }

  setledstate4(state) {
    this.setState({ ledon4: state !== "0" });
  }

  // CHAMADO A APÓS O RENDER PARA GARANTIR QUE OS LEDS SERÃO SETADOS
  componentDidMount() {
    fetch("/led1")
      .then(response => response.text())
      .then(state => this.setledstate1(state));
    fetch("/led2")
      .then(response => response.text())
      .then(state => this.setledstate2(state));
    fetch("/led3")
      .then(response => response.text())
      .then(state => this.setledstate3(state));
    fetch("/led4")
      .then(response => response.text())
      .then(state => this.setledstate4(state));
  }

  handleStateChange1(ledon1) {
    fetch("/led1", { method: "PUT", body: ledon1 ? "0" : "1" })
      .then(response => response.text())
      .then(state => this.setledstate1(state));
  }

  handleStateChange2(ledon2) {
    fetch("/led2", { method: "PUT", body: ledon2 ? "0" : "1" })
      .then(response => response.text())
      .then(state => this.setledstate2(state));
  }

  handleStateChange3(ledon3) {
    fetch("/led3", { method: "PUT", body: ledon3 ? "0" : "1" })
      .then(response => response.text())
      .then(state => this.setledstate3(state));
  }

  handleStateChange4(ledon4) {
    fetch("/led4", { method: "PUT", body: ledon4 ? "0" : "1" })
      .then(response => response.text())
      .then(state => this.setledstate4(state));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <body data-spy="scroll" data-target="#lambda-navbar" data-offset="0">
            <nav
              class="navbar navbar-expand-md navbar-dark navbar-transparent fixed-top sticky-navigation"
              id="lambda-navbar"
            >
              <a class="navbar-brand" href="">
                Decoled App
              </a>
              <button
                class="navbar-toggler navbar-toggler-right border-0"
                type="button"
                data-toggle="collapse"
                data-target="#navbarCollapse"
                aria-controls="navbarCollapse"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span data-feather="menu"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav ml-auto">
                  <li class="nav-item">
                    <a class="nav-link page-scroll" href="#principal">
                      Sala
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link page-scroll" href="#hall">
                      Hall
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </body>

          <section class="App-trans" id="principal">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Sala</h1>
            <ToggleButton
              value={this.state.ledon1}
              onToggle={value => this.handleStateChange1(value)}
            />
            <ToggleButton
              value={this.state.ledon2}
              onToggle={value => this.handleStateChange2(value)}
            />
          </section>
          <section class="App-trans" id="hall">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Hall</h1>
            <ToggleButton
              value={this.state.ledon3}
              onToggle={value => this.handleStateChange3(value)}
            />
            <ToggleButton
              value={this.state.ledon4}
              onToggle={value => this.handleStateChange4(value)}
            />
          </section>
        </header>
      </div>
    );
  }
}

export default App;
