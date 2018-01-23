import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import GiftPage from './containers/Gift/GiftPage'
import LoginPage from './containers/LoginPage'
import PrivateRoute from './components/PrivateRoute'

import * as sessionActions from './actions/sessionActions'
import ManageGiftPage from './containers/Gift/ManageGiftPage'

class App extends Component {
  state = {
    session: this.props.session
  }

  componentWillReceiveProps (nextProps) {
    const {session} = nextProps

    this.setState({
      session
    })
  }

  render () {
    const {session} = this.state
    return (
      <Router>
        <main className="App">
          <Switch>
            <PrivateRoute exact path="/" component={GiftPage} isAuthenticated={session.isAuthenticated}/>
            <Route exact path="/login" component={LoginPage}/>
            <Route exact path="/gifts/:id/edit" component={ManageGiftPage}/>
            <Route exact path="/gifts/:id" component={GiftPage}/>
          </Switch>
        </main>
      </Router>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  session: state.session
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(sessionActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
