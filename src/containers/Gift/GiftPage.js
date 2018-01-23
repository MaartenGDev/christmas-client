import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as giftActions from '../../actions/giftActions'
import { Link } from 'react-router-dom'

class GiftPage extends Component {
  state = {
    gift: this.props.gift,
    session: this.props.session,
    hasLoadedGifts: false,
  }

  componentDidMount () {
    const {session} = this.state

    if (session.isAuthenticated) {
      this.props.actions.loadGifts()
    }
  }

  componentWillReceiveProps (nextProps) {
    const {hasLoadedGifts} = this.state
    const {session, gift} = nextProps

    if (session.isAuthenticated && !hasLoadedGifts) {
      this.props.actions.loadGifts()
    }

    this.setState({
      session,
      gift,
      hasLoadedGifts: true
    })
  }

  render () {
    const {gift} = this.state

    return (
      <section className="container mx-auto">
        <h2>{gift.title}</h2>
        <p>{gift.description}</p>
        {gift.url && <Link to={gift.url}>{gift.url}</Link>}
      </section>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {id} = ownProps.match.params
  const {session, gifts} = state
  const loadGiftById = id !== undefined && gifts.length > 0

  const gift = loadGiftById
    ? gifts.find(collection => collection.id === parseInt(id, 10))
    : {id: undefined, title: '', description: '', url: ''}

  return {
    session,
    gift
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(giftActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(GiftPage)
