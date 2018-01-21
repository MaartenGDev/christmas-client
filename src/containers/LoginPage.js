import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as sessionActions from '../actions/sessionActions'
import { bindActionCreators } from 'redux'
import {
  Redirect,
} from 'react-router-dom'

class LoginPage extends Component {
  state = {
    form: {
      name: '',
      password: ''
    },
    session: this.props.session
  }

  componentWillReceiveProps (nextProps) {
    const {session} = nextProps

    this.setState({
      session
    })
  }

  login = e => {
    const {form} = this.state

    this.props.actions.createSession(form)
    e.preventDefault()
  }

  handleFormChange = ({target}) => {
    const {form} = this.state

    this.setState({
      form: {...form, [target.name]: target.value}
    })

  }

  render () {
    const {form, session} = this.state


    if (session.isAuthenticated) {
      return (
        <Redirect to='/'/>
      )
    }


    return (
      <section>
        <h1>{session.isAuthenticated ? `Hello ${session.user.name}` : 'Hello Guest'}</h1>
        <form onSubmit={this.login}>
          <input type="text" name="name" value={form.name} onChange={this.handleFormChange}/>
          <input type="password" name="password" value={form.password} onChange={this.handleFormChange}/>
          <input type="submit" value="Submit"/>
        </form>
      </section>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    session: state.session
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(sessionActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)