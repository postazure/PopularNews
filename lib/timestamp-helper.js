import moment from 'moment'

export default class TimestampHelper {
  constructor () {
    this.now = moment()
  }

  _getNumericValue(value) {
    return value[0] === 'a' ? 1 : value
  }

  getTimestamp = (unixDate) => {
    let dateString = moment.unix(unixDate).from(this.now)

    let dateInfo = dateString.split(' ')
    let numeric = 1
    let chrono = 'second'

    if (dateInfo.length === 3) {
      numeric = this._getNumericValue(dateInfo[ 0 ])
      chrono = dateInfo[ 1 ]
    }

    return {numeric, chrono}
  }
}