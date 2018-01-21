import * as types from '../actions/sessionTypes'

const session = (state = {isAuthenticated: false}, action) => {
  switch (action.type) {
    case types.CREATE_SESSION:
      return {...action.session};
    case types.UPDATE_SESSION:
      return {...action.session};
    case types.DESTROY_SESSION:
      return {...action.session};
    default:
      return state
  }
}

export default session