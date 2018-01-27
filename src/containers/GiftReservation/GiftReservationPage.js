import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import * as giftReservationActions from '../../actions/giftReservationActions'
import * as giftReservationStatuses from '../../enums/giftReservationStatus'
import GiftReservationHelper from '../../helpers/GiftReservationHelper'

class GiftReservationPage extends Component {
  state = {
    giftReservation: this.props.giftReservation,
    session: this.props.session,
    hasLoadedGifts: false,
  }

  componentDidMount () {
    const {session} = this.state

    if (session.isAuthenticated) {
      this.props.actions.loadGiftReservations()
    }
  }

  componentWillReceiveProps (nextProps) {
    const {hasLoadedGifts} = this.state
    const {session, giftReservation} = nextProps

    if (session.isAuthenticated && !hasLoadedGifts) {
      this.props.actions.loadGiftReservations()
    }

    this.setState({
      session,
      giftReservation,
      hasLoadedGifts: true
    })
  }

  changeReservationStatus = () => {
    const {session, giftReservation} = this.state

    const currentStatus = GiftReservationHelper.getStatus(giftReservation, session.user)

    if (currentStatus !== giftReservationStatuses.RESERVED_BY_SOMEONE_ELSE) {
      this.props.actions.updateGiftReservation({
        ...giftReservation,
        reserved_by: this.getToggledReservationStatus(giftReservation, session.user)
      })
    }
  }

  getToggledReservationStatus = (giftReservation, user) => {
    const currentStatus = GiftReservationHelper.getStatus(giftReservation, user)

    if (currentStatus === giftReservationStatuses.NOT_RESERVED) return user.id
    if (currentStatus === giftReservationStatuses.RESERVED_BY_ME) return -1
    if (currentStatus === giftReservationStatuses.RESERVED_BY_SOMEONE_ELSE) return giftReservation.reserved_by

    return giftReservation.reserved_by
  }

  render () {
    const {giftReservation, session} = this.state

    const reservationStatus = GiftReservationHelper.getStatus(giftReservation, session.user)
    const reservationStatusColor = GiftReservationHelper.getColor(reservationStatus)

    return (
      <div className="mx-auto container-compact">
        <h2 className="font-bold text-xl mt-6 mb-4">Manage Reservation</h2>
        <div className="shadow-md mt-2 relative">
          {giftReservation.image_url &&
          <div style={{backgroundImage: `url(${giftReservation.image_url})`}}
               className="h-150 w-full h-full bg-cover bg-top"/>
          }

          <div className="p-6">
            <h3 className="font-bold text-xl mb-2">{giftReservation.title}</h3>
            <p className="text-grey-darker text-base">{giftReservation.description}</p>
            {giftReservation.url &&
            <Link className="no-underline text-indigo mt-2 inline-block"
                  to={giftReservation.url}>{giftReservation.url}</Link>}
          </div>
          <div className={`w-full py-3 px-4 text-white bg-${reservationStatusColor}`}
               onClick={this.changeReservationStatus}>
            <p>{GiftReservationHelper.getDescription(reservationStatus)}</p>
          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {id} = ownProps.match.params
  const {session, giftReservations} = state
  const loadGiftById = id !== undefined && giftReservations.length > 0

  const giftReservation = loadGiftById
    ? giftReservations.find(giftReservation => giftReservation.id === parseInt(id, 10))
    : {id: undefined, title: '', description: '', url: '', reserved_by: null}

  return {
    session,
    giftReservation
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(giftReservationActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(GiftReservationPage)
