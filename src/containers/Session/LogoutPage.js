import React, { Component } from 'react'
import {
  Redirect
} from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as sessionActions from '../../actions/sessionActions'

class LogoutPage extends Component {
  state = {
    session: this.props.session,
  }

  componentDidMount () {
    const {session} = this.state

    this.props.actions.destroySession(session)
  }

  render () {
    return <Redirect to='/login'/>
  }
}

const mapStateToProps = (state, ownProps) => {
  const {session} = state

  return {
    session
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(sessionActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage)