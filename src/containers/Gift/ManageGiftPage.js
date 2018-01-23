import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as giftActions from '../../actions/giftActions'

class ManageGiftPage extends Component {
  state = {
    gift: this.props.gift,
    session: this.props.session,
    hasLoadedGifts: false,
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

  handleGiftChange = ({target}) => {
    this.setState({
      gift: {...this.state.gift, [target.name]: target.value}
    })
  }

  updateGift = e => {
    this.props.actions.updateGift(this.state.gift);

    e.preventDefault();
  }

  render () {
    const {gift} = this.state
    const isNewGift = gift.id === undefined

    return (
      <section className="container mx-auto">
        <h2>Manage Gift</h2>
        <form onSubmit={this.updateGift}>
          <input type="text" name="title" value={gift.title} onChange={this.handleGiftChange}/>
          <input type="text" name="description" value={gift.description} onChange={this.handleGiftChange}/>
          <input type="text" name="url" value={gift.url} onChange={this.handleGiftChange}/>

          <input type="submit" value={isNewGift ? 'Create' : 'Update'}/>
        </form>
      </section>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {id} = ownProps.match.params
  const {session, gifts} = state
  const loadGiftById = !(['create', 'edit'].includes(id)) && gifts.length

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

export default connect(mapStateToProps, mapDispatchToProps)(ManageGiftPage)
