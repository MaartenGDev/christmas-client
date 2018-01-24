import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as giftReservationActions from '../../actions/giftReservationActions'
import { bindActionCreators } from 'redux'
import Gift from '../../components/Gift'

class UserGiftReservationPage extends Component {
  state = {
    session: this.props.session,
    giftReservations: this.props.giftReservations,
    hasLoadedGiftReservations: false
  }

  componentDidMount () {
    const {session} = this.state

    if (session.isAuthenticated) {
      this.props.actions.loadUserGiftReservations();
    }
  }


  componentWillReceiveProps (nextProps) {
    const {hasLoadedGiftReservations} = this.state
    const {session, giftReservations} = nextProps

    if (session.isAuthenticated && !hasLoadedGiftReservations) {
      this.props.actions.loadUserGiftReservations();
    }

    this.setState({
      session,
      giftReservations,
      hasLoadedGiftReservations: true
    })
  }

  render () {
    const {giftReservations} = this.state
    const hasGiftReservations = giftReservations.length > 0

    return (
      <div className="p-6">
        <h2 className="font-bold text-xl mt-6 mb-4">Reserved Gifts</h2>
        {giftReservations.map(gift => {
          return (<Gift key={gift.id} {...gift} />)
        })}
        {!hasGiftReservations && <p className="text-grey-darker text-base">No gift reservations found :(</p>}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {session, giftReservations} = state

  return {
    session,
    giftReservations
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(giftReservationActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UserGiftReservationPage )