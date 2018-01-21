import { API_ENDPOINT } from '../config'
import RestApi from './RestApi'

class GiftApi extends RestApi {
  constructor(){
    super(API_ENDPOINT, 'gifts')
  }
}


export default GiftApi