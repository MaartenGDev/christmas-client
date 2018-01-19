import { LOAD_SESSIONS, ADD_SESSION, UPDATE_SESSION, DESTROY_SESSION } from './sessionTypes'
import SessionApi from '../services/SessionApi'

const sessionApi = new SessionApi();

export const createSessionSuccess = session => ({
  type: ADD_SESSION,
  session
})

export const updateSessionSuccess = session => ({
  type: UPDATE_SESSION,
  session
})

export const destroySessionSuccess = session => ({
  type: DESTROY_SESSION,
  session
})
export const loadSessionsSuccess = sessions => ({
  type: LOAD_SESSIONS,
  sessions
})

export const loadSessions = () => {
  return async dispatch => {
    return sessionApi.all()
      .then(sessions => dispatch(loadSessionsSuccess(sessions)))
  }
}

export const updateSession = session => {
  return async dispatch => {
    return sessionApi.createOrUpdate(session)
      .then(savedSession => {
        const providedSessionWithPossibleNewId = {...session, id: savedSession.id};
        session.id === undefined
          ? dispatch(createSessionSuccess(providedSessionWithPossibleNewId))
          : dispatch(updateSessionSuccess(providedSessionWithPossibleNewId))
      })
  }
}

export const destroySession = session => {
  return async dispatch => {
    return sessionApi.destroy(session)
      .then(res => dispatch(destroySessionSuccess(session)))
  }
}