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
    const {from} = this.props.location.state || {from: {pathname: '/'}}
    const {form, session} = this.state

    if (session.isAuthenticated) {
      return (
        <Redirect to={from}/>
      )
    }

    return (
      <div>
        <div className="flex justify-center">
          <img src="/assets/images/logo.png" style={{height: '180px', marginTop: '40px', marginBottom: '60px' }} alt="Logo for the christmas app"/>
        </div>
        <div className="flex justify-center">
          <form style={{width: 'calc(100% - 100px)'}} onSubmit={this.login}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                       htmlFor="grid-username">
                  Username
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                  id="grid-username" type="text" name="name" placeholder="Username" value={form.name} onChange={this.handleFormChange}/>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                       htmlFor="grid-password">
                  Password
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                  id="grid-password" type="password" name="password" placeholder="***********" value={form.password}
                  onChange={this.handleFormChange}/>
              </div>
            </div>
            <input type="submit" value="Submit" className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"/>
          </form>
        </div>
      </div>
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