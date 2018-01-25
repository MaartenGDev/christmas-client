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

  handleGiftChange = ({target}) => {
    this.setState({
      gift: {...this.state.gift, [target.name]: target.value}
    })
  }

  updateGift = e => {
    this.props.actions.updateGift(this.state.gift)

    e.preventDefault()
  }

  render () {
    const {gift} = this.state
    const isNewGift = gift.id === undefined

    return (
      <div className="mx-auto container-compact mb-80">
        <h2 className="font-bold text-xl mt-6 mb-4">Manage Gift</h2>
        <form onSubmit={this.updateGift} className="shadow-md p-6 mt-2">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                     htmlFor="grid-username">
                Title
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                id="grid-username" type="text" name="title" value={gift.title} onChange={this.handleGiftChange}/>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                     htmlFor="grid-username">
                Description
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                id="grid-username" type="text" name="description" value={gift.description}
                onChange={this.handleGiftChange}/>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                     htmlFor="grid-username">
                Url(Optional)
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                id="grid-username" type="text" name="url" value={gift.url} onChange={this.handleGiftChange}/>
            </div>
          </div>

          <input type="submit" value={isNewGift ? 'Create' : 'Update'}
                 className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"/>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {id} = ownProps.match.params
  const {session, gifts} = state
  const loadGiftById = id !== undefined && gifts.length > 0

  const gift = loadGiftById
    ? gifts.find(gift => gift.id === parseInt(id, 10))
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
