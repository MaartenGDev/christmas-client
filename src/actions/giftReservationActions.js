import { LOAD_GIFT_RESERVATIONS, UPDATE_GIFT_RESERVATION} from './giftReservationTypes'
import GiftReservationApi from '../services/GiftReservationApi'

const giftReservationApi = new GiftReservationApi();

export const loadGiftReservationsSuccess = giftReservations => ({
  type: LOAD_GIFT_RESERVATIONS,
  giftReservations
})

export const updateGiftReservationSuccess = giftReservation => ({
  type: UPDATE_GIFT_RESERVATION,
  giftReservation
})

export const loadGiftReservations = () => {
  return async (dispatch, getState) => {
    const { session } = getState();
    giftReservationApi.setAuthorization(session.access_token);

    return giftReservationApi.all()
      .then(gifts => dispatch(loadGiftReservationsSuccess(gifts)))
  }
}

export const loadUserGiftReservations = () => {
  return async (dispatch, getState) => {
    const { session } = getState();
    giftReservationApi.setAuthorization(session.access_token);

    return giftReservationApi.me()
      .then(gifts => dispatch(loadGiftReservationsSuccess(gifts)))
  }
}

export const updateGiftReservation = gift => {
  return async (dispatch, getState) => {
    const { session } = getState();
    giftReservationApi.setAuthorization(session.access_token);

    return giftReservationApi.update(gift)
      .then(savedGift => {
        dispatch(updateGiftReservationSuccess(savedGift))
      })
  }
}