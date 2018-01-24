import { API_ENDPOINT } from '../config'
import RestApi from './RestApi'

class GiftReservationApi extends RestApi {
  constructor(){
    super(API_ENDPOINT, 'gift-reservations')
  }

  me(){
    return new Promise((res, rej) => {
      this.requestHelper.getJson(`${this.endpoint}/${this.resource}/me`)
        .then(response =>  res(response.data))
        .catch(err => rej(err))
    })
  }
}

export default GiftReservationApi