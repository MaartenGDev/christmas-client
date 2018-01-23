import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as giftReservationActions from '../../actions/giftReservationActions'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import Gift from '../../components/Gift'

class GiftReservationPage extends Component {
  state = {
    session: this.props.session,
    giftReservations: this.props.giftReservations,
    hasLoadedGiftReservations: false
  }

  componentDidMount () {
    const {session} = this.state

    if (session.isAuthenticated) {
      this.props.actions.loadGiftReservations()
    }
  }


  componentWillReceiveProps (nextProps) {
    const {hasLoadedGiftReservations} = this.state
    const {session, giftReservations} = nextProps

    if (session.isAuthenticated && !hasLoadedGiftReservations) {
      this.props.actions.loadGiftReservations()
    }

    this.setState({
      session,
      giftReservations,
      hasLoadedGiftReservations: true
    })
  }

  render () {
    const {giftReservations} = this.state

    return (
      <div className="p-6">
        <h1>Gifts</h1>
        {giftReservations.map(gift => {
          return (<Gift key={gift.id} {...gift} />)
        })}
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

export default connect(mapStateToProps, mapDispatchToProps)(GiftReservationPage)