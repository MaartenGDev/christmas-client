import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Tabs = ({tabs}) => {
  return (
    <div className="pin-x pin-b bg-white fixed shadow-md">
      <div className="flex content-around">
      {tabs.map((tab, index) => {
        return <div key={index} className={`w-1/${tabs.length} text-center py-4`}>
          <Link to={tab.link}><i className="material-icons text-grey">{tab.icon}</i></Link>
        </div>
      })}
      </div>
    </div>
  )
}

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired).isRequired
}


export default Tabs