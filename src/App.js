import React, { Component } from 'react';
import './App.css';
import './ui-toolkit/css/nm-cx/main.css' //* Need to download these
import axios from 'axios';

const GitScore = (props) => {
  if (props.found) {
    let message;

    if (props.points < 20) { message = (<p style={needsWork}>Needs work!</p>); }
    else if (props.points < 50) { message = (<p style={decentStart}>A decent start!</p>); }
    else if (props.points < 100) { message = (<p style={doingGood}>Doing good!</p>); }
    else if (props.points < 200) { message = (<p style={greatJob}>Great job!</p>); }
    else if (props.points >= 200) { message = (<p style={elite}>Github Elite!</p>); }

    return (
      <div>
        <h3>Your score: {props.points}</h3>
        {message}
      </div>
    );
  } else if (!props.found && !props.submitted) {
    return (
      <div>
        <br />
        <p>Enter your username to see your GitHub score!</p>
      </div>
    );
  } else {
    return (
      <div>
        <h4>User does not exist; pick a different username.</h4>
      </div>   
    ); 
  }
}

const GitForm = (props) => {
  return (
    <form id='gitForm' onSubmit={props.search}>
      <div className="large-12 columns md-text-field with-floating-label">
        <input type="text" id="user" required onChange={props.updateUser} value={props.username}></input>
        <label htmlFor="user">Github Username</label>        
      </div>
      <div className="large-12 columns" id="buttonDiv">
        <button id='calculate' disabled={!props.validated}>Calculate my Github Score</button>
      </div>
    </form>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      points: 0,
      found: false,
      submitted: false,
      validated: false
    }
    this.search = this.search.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.validate = this.validate.bind(this);
  }

  search(e) {
    e.preventDefault();

    const promise = axios.get('https://api.github.com/users/' + this.state.username)

    promise.then(({data}) => {
      if (data.message === 'Not found') {
        this.setState({found: false, submitted: true});
      } else {
        let points = this.state.points + data.followers + data.public_repos;
        this.setState({points, found: true, submitted: true});
      }
    })

    promise.catch(err => {
      this.setState({found: false, submitted: true});
      console.log(err);
    })
  }

  updateUser({target}) {
    this.setState({username: target.value, points: 0, submitted: false, found: false}, function() {
      this.validate();
    });
  }

  validate() {
    if (this.state.username.trim() !== ''){
      this.setState({validated: true});
    } else {
      this.setState({validated: false});
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">GitHub Score</h1>
        </header>
        <br />
        <div className="row">
          <div className="medium-6 columns">
            <GitForm search={this.search} username={this.state.username} updateUser={this.updateUser} validated={this.state.validated}/>
          </div>
          <div className="medium-6 columns">
            <GitScore found={this.state.found} username={this.state.username} submitted={this.state.submitted} points={this.state.points}/>
          </div>
        </div>
      </div>
    );
  }
}

// styles

const needsWork = {
  color: 'red'
}
const decentStart = {
  color: 'orange'
}
const doingGood = {
  color: 'black'
}
const greatJob = {
  color: 'green'
}
const elite = {
  color: 'blue'
}

export default App;
