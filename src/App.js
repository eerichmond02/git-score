import React, { Component } from 'react';
import './App.css';
import './ui-toolkit/css/nm-cx/main.css' //* Need to download these
import axios from 'axios';

const GitScore = (props) => {
  return (
    <div>
      <h2>Your score</h2>
    </div>
  );
}

const GitForm = (props) => {
  return (
    <form id='gitForm'>
      <div className="large-12 columns md-text-field with-floating-label">
        <input type="text" id="user" required></input>
        <label htmlFor="user">Github Username</label>        
      </div>
      <button id='calculate'>Calculate my Github Score</button>
    </form>
  );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">GitHub Score</h1>
        </header>
        <div className="row">
          <div className="medium-6 columns">
            <GitForm />
          </div>
          <div className="medium-6 columns">
            <GitScore />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
