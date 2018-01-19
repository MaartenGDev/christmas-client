import { API_ENDPOINT } from '../config'
import RestApi from './RestApi'

class SessionApi extends RestApi {
  constructor(){
    super(API_ENDPOINT, 'sessions')
  }
}


export default SessionApi