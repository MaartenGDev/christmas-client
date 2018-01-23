import { API_ENDPOINT } from '../config'
import RestApi from './RestApi'

class GiftReservationApi extends RestApi {
  constructor(){
    super(API_ENDPOINT, 'gift-reservations')
  }
}

export default GiftReservationApi