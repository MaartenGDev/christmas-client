import { combineReducers } from 'redux'
import session from './session'
import gifts from './gifts'

const rootReducer = combineReducers({
  session,
  gifts
})

export default rootReducer