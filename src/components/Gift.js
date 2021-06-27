import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import GiftReservationHelper from '../helpers/GiftReservationHelper'

const Gift = ({gift, session, showManageActions = false, showReservationStatus = true, onDeleteGiftClick = () => {}}) => {
  const {id, title, description, image_url, user} = gift

  const reservationStatus = GiftReservationHelper.getStatus(gift, session.user)
  const reservationStatusColor = GiftReservationHelper.getColor(reservationStatus);

  const deleteWithConfirm = (...params) => window.confirm('Are you sure you want to delete this gift?')
      ? onDeleteGiftClick(...params)
      : () => {}

  const actionBar = showManageActions
    ? <div>
      <Link className="text-indigo no-underline font-bold text-sm" to={`/gifts/${id}/edit`}>Edit</Link>
      <span className="text-red no-underline font-bold text-sm ml-4"
            onClick={e => deleteWithConfirm(gift, e)}>Remove</span>
    </div>
    : <Link className="text-indigo no-underline font-bold text-sm" to={`/reservations/${id}`}>SHOW</Link>


  return (
    <div className="shadow-md rounded-sm overflow-hidden mb-4">
      {image_url &&
          <div style={{backgroundImage: `url(${image_url})`}}
               className="h-150 w-full h-full bg-cover bg-bottom"/>
      }
      <div className="p-4">
        <span className="text-indigo align-middle"><i
          className="material-icons align-middle">account_circle</i> {user.name}</span>

        {showReservationStatus &&
        <span className={`ml-4 align-middle text-${reservationStatusColor}`}><i
          className={`material-icons align-middle`}>check_circle</i> {GiftReservationHelper.getDescription(reservationStatus)}</span>
        }

        <div className="font-bold text-xl mb-1 mt-2">{title}</div>
        <p className="text-grey-darker text-base mb-4">{description}</p>
        {actionBar}
      </div>
    </div>
  )
}

Gift.propTypes = {
  gift: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired,
  }).isRequired,
  session: PropTypes.shape({

  }),
  showManageActions: PropTypes.bool,
  onDeleteGiftClick: PropTypes.func
}

export default Gift