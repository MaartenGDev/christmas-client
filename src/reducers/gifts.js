import * as types from '../actions/giftTypes'

const gifts = (state = [], action) => {
  switch (action.type) {
    case types.ADD_GIFT:
      return [...state, {...action.gift}]
    case types.UPDATE_GIFT:
      const indexOfGiftToUpdate = state.findIndex(gift => gift.id === action.gift.id);
      const allGifts = [...state];
      allGifts.splice(indexOfGiftToUpdate, 1, action.gift)
      return allGifts
    case types.DESTROY_GIFT:
      return [...state.filter(gift => gift.id !== action.gift.id)]
    case types.LOAD_GIFTS: {
      return [...action.gifts];
    }
    default:
      return state
  }
}

export default gifts