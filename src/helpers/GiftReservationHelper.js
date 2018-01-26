import { RESERVED_BY_SOMEONE_ELSE, RESERVED_BY_ME, NOT_RESERVED } from '../enums/giftReservationStatus'
import * as giftReservationStatuses from '../enums/giftReservationStatus'

class GiftReservationHelper {
  static getStatus (giftReservation, user) {
    if (giftReservation.reserved_by === null) return NOT_RESERVED

    return giftReservation.reserved_by === user.id ? RESERVED_BY_ME : RESERVED_BY_SOMEONE_ELSE
  }

  static getDescription (giftReservationStatus) {
    if (giftReservationStatus === NOT_RESERVED) return 'Available to reserve'
    if (giftReservationStatus === RESERVED_BY_ME) return 'Reserved by me'
    if (giftReservationStatus === RESERVED_BY_SOMEONE_ELSE) return 'Reserved by someone else'

    return 'Unknown status'
  }

  static getColor (giftReservationStatus) {
    if (giftReservationStatus === giftReservationStatuses.NOT_RESERVED) return 'blue'
    if (giftReservationStatus === giftReservationStatuses.RESERVED_BY_ME) return 'green'

    return 'grey'
  }
}

export default GiftReservationHelper