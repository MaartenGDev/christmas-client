import { LOAD_GIFTS, ADD_GIFT, UPDATE_GIFT, DESTROY_GIFT } from './giftTypes'
import GiftApi from '../services/GiftApi'

const giftApi = new GiftApi()

export const createGiftSuccess = gift => ({
  type: ADD_GIFT,
  gift
})

export const updateGiftSuccess = gift => ({
  type: UPDATE_GIFT,
  gift
})

export const destroyGiftSuccess = gift => ({
  type: DESTROY_GIFT,
  gift
})
export const loadGiftsSuccess = gifts => ({
  type: LOAD_GIFTS,
  gifts
})

export const loadGifts = () => {
  return async (dispatch, getState) => {
    const {session} = getState()
    giftApi.setAuthorization(session.access_token)

    return giftApi.all()
      .then(gifts => dispatch(loadGiftsSuccess(gifts)))
  }
}

export const updateGift = gift => {
  return async (dispatch, getState) => {
    const {session} = getState()
    giftApi.setAuthorization(session.access_token)

    return giftApi.createOrUpdate(gift)
      .then(savedGift => {
        const providedGiftWithPossibleNewId = {...gift, id: savedGift.id, user: session.user}

        gift.id === undefined
          ? dispatch(createGiftSuccess(providedGiftWithPossibleNewId))
          : dispatch(updateGiftSuccess(providedGiftWithPossibleNewId))
      })
  }
}

export const destroyGift = gift => {
  return async (dispatch, getState) => {
    const {session} = getState()
    giftApi.setAuthorization(session.access_token)

    return giftApi.destroy(gift)
      .then(res => dispatch(destroyGiftSuccess(gift)))
  }
}