import { CREATE_SESSION, UPDATE_SESSION, DESTROY_SESSION } from './sessionTypes'
import SessionApi from '../services/SessionApi'
const sessionApi = new SessionApi()

export const createSessionSuccess = ({access_token, user}) => ({
  type: CREATE_SESSION,
  session: {
    isAuthenticated: true,
    access_token: access_token,
    user: user
  }
})

export const createSessionError = error => ({
  type: CREATE_SESSION,
  session: {
    isAuthenticated: false,
    message: error
  }
})

export const updateSessionSuccess = session => ({
  type: UPDATE_SESSION,
  session
})

export const destroySessionSuccess = session => ({
  type: DESTROY_SESSION,
  session: {
    isAuthenticated: false
  }
})



export const createSession = ({name, password}) => {
  return async dispatch => {
    return sessionApi.store({name, password})
      .then(session => {
        localStorage.setItem('access_token', session.access_token)
        dispatch(createSessionSuccess(session))
      }).catch(error => {
        dispatch(createSessionError(error))
      })
  }
}


export const createSessionFromToken = (token) => {
  return async dispatch => {
    sessionApi.setAuthorization(token);
    return sessionApi.me()
      .then(session => {
        dispatch(createSessionSuccess({...session, access_token: token}))
      }).catch(error => {
        dispatch(destroySession(error))
      })
  }
}



export const destroySession = session => {
  return async dispatch => {
    return sessionApi.destroy(session)
      .then(res => {
        localStorage.removeItem('access_token')
        dispatch(destroySessionSuccess(session))
      })
  }
}