import expect from 'expect'
import moment from 'moment'

import TimestampHelper from '../../lib/timestamp-helper'

describe('Timestamp', () => {
  let subject, now

  beforeEach(() => {
    subject = new TimestampHelper()
    subject.now = now = moment()
  })

  it('should return an object with a numeric value', () => {
    let threeHoursAgo = moment(now)
    threeHoursAgo.subtract(3, 'hours')
    let actual = subject.getTimestamp(threeHoursAgo.unix())

    expect(actual.numeric).toEqual(3)
  })

  it('should return an object with a chrono value', () => {
    let threeHoursAgo = moment(now)
    threeHoursAgo.subtract(3, 'hours')

    let actual = subject.getTimestamp(threeHoursAgo.unix())

    expect(actual.chrono).toEqual('hours')
  })

  it('should display 1 instead of "a"', () => {
    // "a day ago" should be "1 day ago"
    let aDayAgo = moment(now)
    aDayAgo.subtract(1, 'day')

    let actual = subject.getTimestamp(aDayAgo.unix())

    expect(actual.numeric).toEqual(1)
    expect(actual.chrono).toEqual('day')
  })

  describe('when an event just happend', () => {
    it('should set it to 1 second', () => {
      let actual = subject.getTimestamp(moment(now).unix())

      expect(actual.numeric).toEqual(1)
      expect(actual.chrono).toEqual('second')
    })
  })
})