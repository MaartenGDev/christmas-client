import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as giftActions from '../../actions/giftActions'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

class GiftPage extends Component {
  state = {
    gifts: this.props.gifts,
    session: this.props.session,
  }

  componentDidMount () {
    const {session} = this.state

    if (session.isAuthenticated) {
      this.props.actions.loadGifts()
    }
  }

  componentWillReceiveProps (nextProps) {
    const {gifts, session} = nextProps

    this.setState({
      gifts,
      session
    })
  }

  handleGiftClick = task => {
  }

  render () {
    const {gifts} = this.state

    return (
      <div className="p-8">
        <h1>Gifts</h1>
        {gifts.map(gift => {
          return (<div key={gift.id} className="shadow-md rounded-sm p-8">
            <h3>{gift.title}</h3>
            <p>{gift.description}</p>
            {gift.url && <Link to={gift.url}>{gift.url}</Link>}
            <Link to={`/gifts/${gift.id}/edit`}>Edit</Link>
          </div>)
        })}
      </div>
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