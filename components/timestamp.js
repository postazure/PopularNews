import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

import moment from 'moment'
import themeManager from '../lib/theme-manager'

export default class Timestamp extends Component {
  render () {
    let c = themeManager.getColorsFor('timestamp')

    let dateString = moment.unix(this.props.date).fromNow()

    let dateInfo = dateString.split(' ')
    let numericInfo = 1
    let timeInfo = 'second'

    if (dateInfo.length === 3) {
      numericInfo = dateInfo[ 0 ]
      timeInfo = dateInfo[ 1 ]
    }

    return (
      <View style={[ $.timestamp ]}>
        <Text style={[ c.number, $.numeric ]}>{numericInfo}</Text>
        <View style={[ $.words ]}>
          <Text style={[ c.words, $.timeInfo ]}>{timeInfo}</Text>
          <Text style={[ c.ago, $.ago ]}>AGO</Text>
        </View>
      </View>
    )
  }
}

themeManager.setColorsFor('timestamp', themeManager.BRIGHT_THEME, {
  number: { color: '#333333' },
  words: { color: 'rgb(41, 85, 93)' },
  ago: { color: 'rgb(41, 85, 93)' },
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
    flex: 0.3,

    alignSelf: 'center',
    marginRight: 8,

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
