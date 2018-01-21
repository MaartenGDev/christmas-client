import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom'
import GiftPage from './containers/GiftPage'
import LoginPage from './containers/LoginPage'

class App extends Component {
  render () {
    return (
      <Router>
        <main className="App">
          <Switch>
            <Route exact path="/" component={GiftPage}/>
            <Route exact path="/login" component={LoginPage}/>
            <Route exact path="/gifts/:id" component={GiftPage}/>
          </Switch>
        </main>
      </Router>
    )
  }
}

export default App
