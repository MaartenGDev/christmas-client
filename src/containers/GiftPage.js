import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as giftActions from '../actions/giftActions'
import { bindActionCreators } from 'redux'

class GiftPage extends Component {
  state = {
    gifts: this.props.gifts
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      gifts: nextProps.gifts
    })
  }

  handleGiftClick = task => {
    const {selectedGroup} = this.state

    this.props.history.push(`/groups/${selectedGroup.id}/tasks/${task.id}`)
  }

  render () {
    const {gifts} = this.state

    return (
      <section>
        <h1>Gifts</h1>
        {gifts.map(gift => {
          return <h1>{gift.title}</h1>
        })}
      </section>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {gifts} = state

  return {
    gifts
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(giftActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(GiftPage)