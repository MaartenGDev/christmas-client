import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Gift = ({id, title, description, user, showManageActions = false}) => {
  const actionBar = showManageActions
    ? <div><Link className="text-blue font-bold text-sm" to={`/gifts/${id}/edit`}>Edit</Link><Link className="text-red text-sm" to={`/gifts/${id}/remove`}>Remove</Link></div>
    : <Link className="text-indigo no-underline font-bold text-sm" to={`/gifts/${id}`}>SHOW</Link>
  return (
    <div className="shadow-md rounded-sm p-4 mb-4">
      <span className="text-indigo align-middle"><i className="material-icons align-middle">account_circle</i> {user.name}</span>
      <div className="font-bold text-xl mb-1 mt-2">{title}</div>
      <p className="text-grey-darker text-base mb-4">{description}</p>
      {actionBar}
    </div>
  )
}

Gift.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  showManageActions: PropTypes.bool
}


export default Gift