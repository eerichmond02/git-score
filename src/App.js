import React, { Component } from 'react';
import './App.css';

const GitScore = (props) => {
  return (
    <div>
      <h1>Your score</h1>
    </div>
  );
}

const GitForm = (props) => {
  return (
    <form>
      <label>Github Username:</label>
      <input placeholder="github_username"></input>
      <button>Calculate my Github Score</button>
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
      </div>
    );
  }
}

export default App;
