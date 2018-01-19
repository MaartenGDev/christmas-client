import { API_ENDPOINT } from '../config'
import RestApi from './RestApi'

class GroupApi extends RestApi {
  constructor(){
    super(API_ENDPOINT, 'groups')
  }
}


export default GroupApi