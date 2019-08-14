import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/login';
import Home from './components/home/home';
class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/home" exact component={Home} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;