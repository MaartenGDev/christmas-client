import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LoginPage from './containers/LoginPage'
import PrivateRoute from './components/PrivateRoute'

import * as sessionActions from './actions/sessionActions'
import ManageGiftPage from './containers/Gift/ManageGiftPage'
import Tabs from './components/Tabs'
import GiftListPage from './containers/Gift/GiftListPage'
import UserGiftReservationPage from './containers/Gift/UserGiftReservationPage'
import GiftReservationListPage from './containers/Gift/GiftReservationListPage'
import GiftReservationPage from './containers/Gift/GiftReservationPage'

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

    const tabs = [
      {
        icon: 'home',
        link: '/'
      },
      {
        icon: 'card_giftcard',
        link: '/reservations'
      },
      {
        icon: 'shopping_basket',
        link: '/my-reservations'
      }
    ]

    return (
      session.isAuthenticated
        ? (<Router>
          <main className="App">
            <Switch>
              <Route exact path="/login" component={LoginPage}/>
              <PrivateRoute exact path="/" component={GiftListPage} isAuthenticated={session.isAuthenticated}/>
              <PrivateRoute exact path="/reservations" component={GiftReservationListPage}
                            isAuthenticated={session.isAuthenticated}/>
              <PrivateRoute exact path="/my-reservations" component={UserGiftReservationPage}
                            isAuthenticated={session.isAuthenticated}/>
              <PrivateRoute exact path="/gifts/create" component={ManageGiftPage}
                            isAuthenticated={session.isAuthenticated}/>
              <PrivateRoute exact path="/reservations/:id" component={GiftReservationPage} isAuthenticated={session.isAuthenticated}/>
              <PrivateRoute exact path="/gifts/:id/edit" component={ManageGiftPage}
                            isAuthenticated={session.isAuthenticated}/>
            </Switch>

            <Tabs tabs={tabs}/>
          </main>
        </Router>)
        : <LoginPage location={{from: '/'}}/>
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
