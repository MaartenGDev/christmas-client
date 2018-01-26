import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as giftActions from '../../actions/giftActions'
import { bindActionCreators } from 'redux'
import Gift from '../../components/Gift'
import { Link } from 'react-router-dom'

class GiftListPage extends Component {
  state = {
    gifts: this.props.gifts,
    session: this.props.session,
  }

  componentDidMount () {
    const {session, gifts} = this.state

    if (session.isAuthenticated && gifts.length === 0) {
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

  deleteGift = (gift, e) => {
    this.props.actions.destroyGift(gift)
  }

  render () {
    const {gifts, session} = this.state
    const hasGifts = gifts.length > 0;

    return (
      <div className="mx-auto container-compact">
        <h2 className="font-bold text-xl mt-6 mb-4">My Gifts</h2>
        {gifts.map(gift => <Gift key={gift.id} gift={gift} session={session} showReservationStatus={false} showManageActions={true} onDeleteGiftClick={this.deleteGift} />)}
        {!hasGifts && <p className="text-grey-darker text-base">No gifts found :( Create one by tapping the + button.</p>}
        <Link to='/gifts/create' className="fixed bg-blue text-white pin-r pin-b mr-4 mb-18 rounded-full shadow-lg"><i className="material-icons p-3">add</i></Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(GiftListPage)