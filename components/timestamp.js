import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'

import themeManager from '../lib/theme-manager'

import TimestampHelper from '../lib/timestamp-helper'

export default class Timestamp extends Component {
  static propTypes = {
    date: PropTypes.number.isRequired
  }

  render () {
    let c = themeManager.getColorsFor('timestamp')

    const timestampHelper = new TimestampHelper()
    let timestamp = timestampHelper.getTimestamp(this.props.date)

    return (
      <View style={$.timestamp}>
        <Text style={[ c.number, $.numeric ]}>{timestamp.numeric}</Text>
        <View style={[ $.words ]}>
          <Text style={[ c.words, $.timeInfo ]}>{timestamp.chrono}</Text>
          <Text style={[ c.ago, $.ago ]}>AGO</Text>
        </View>
      </View>
    )
  }
}

themeManager.setColorsFor('timestamp', themeManager.BRIGHT_THEME, {
  number: { color: 'rgb(255, 0, 255)' },
  words: { color: '#83c1d0' },
  ago: { color: '#abacad' },
})

themeManager.setColorsFor('timestamp', themeManager.DARK_THEME, {
  number: { color: 'rgb(152, 255, 82)' },
  words: { color: '#32F3FF' },
  ago: { color: 'rgb(41, 85, 93)' },
})

const $ = StyleSheet.create({
  timestamp: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  numeric: {
    marginRight: 5,

    fontFamily: 'LeagueGothic-Regular',
    fontSize: 34,
    fontWeight: '900',
    height: 40,
    letterSpacing: 2,
    lineHeight: 40
  },
  words: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  }
  ,
  timeInfo: {
    fontFamily: 'helvetica-normal',
    fontSize: 12,
    letterSpacing: 2,
    lineHeight: 14
  }
  ,
  ago: {
    fontFamily: 'helvetica-normal',
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 1,
    lineHeight: 17
  }
  ,

  time: {
    flex: 0.5,
    textAlign: 'left',
    fontSize: 12,
  }
  ,
  infoList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginHorizontal: 20,
  }
})
