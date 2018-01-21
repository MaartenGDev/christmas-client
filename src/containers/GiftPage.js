import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as giftActions from '../actions/giftActions'
import { bindActionCreators } from 'redux'

class GiftPage extends Component {
  state = {
    gifts: this.props.gifts,
    session: this.props.session,
    hasUpdatedSession: false,
  }

  componentWillReceiveProps (nextProps) {
    const {gifts, session} = nextProps

    if (session.isAuthenticated && !this.state.hasUpdatedSession) {
      this.props.actions.loadGifts()
    }

    this.setState({
      gifts,
      session,
      hasUpdatedSession: true
    })
  }

  handleGiftClick = task => {
  }

  render () {
    const {gifts} = this.state

    return (
      <section>
        <h1>Gifts</h1>
        {gifts.map(gift => {
          return (<div key={gift.id}>
            <h1>{gift.title}</h1>
          </div>)
        })}
      </section>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {gifts, session} = state

  return {
    gifts,
    session
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(giftActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(GiftPage)