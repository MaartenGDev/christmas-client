import { combineReducers } from 'redux'
import session from './session'
import gifts from './gifts'
import giftReservations from './giftReservations'

const rootReducer = combineReducers({
  session,
  gifts,
  giftReservations
})

export default rootReducer