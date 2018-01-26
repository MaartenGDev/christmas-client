import * as types from '../actions/giftReservationTypes'

const gifts = (state = [], action) => {
  switch (action.type) {
    case types.UPDATE_GIFT_RESERVATION:
      const indexOfGiftToUpdate = state.findIndex(giftReservation => giftReservation.id === action.giftReservation.id);
      const allGifts = [...state];
      allGifts.splice(indexOfGiftToUpdate, 1, action.giftReservation)
      return allGifts
    case types.LOAD_GIFT_RESERVATIONS: {
      return [...action.giftReservations];
    }
    default:
      return state
  }
}

export default gifts