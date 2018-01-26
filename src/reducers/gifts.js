import * as types from '../actions/giftTypes'

const gifts = (state = [], action) => {
  switch (action.type) {
    case types.ADD_GIFT:
      return [{...action.gift}, ...state]
    case types.UPDATE_GIFT:
      const otherGifts = state.filter(gift => gift.id !== action.gift.id);

      return [action.gift, ...otherGifts]
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