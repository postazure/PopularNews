import React, { Component } from 'react'
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Timestamp from './timestamp'
import themeManager from '../lib/theme-manager'

export default class NewsTile extends Component {
  constructor ( props ) {
    super(props)
    this.openArticle = this.openArticle.bind(this)
    this.dismissArticle = this.dismissArticle.bind(this)
  }

  openArticle () {
    let data = this.props.article.data

    Linking.canOpenURL(data.url).then(supported => {
      if (supported) {
        this.dismissArticle(() => Linking.openURL(data.url))
      } else {
        console.log('Don\'t know how to open URI: ' + data.url)
      }
    })
  }

  dismissArticle ( cb ) {
    this.props.onRead(this.props.article, () => {
      if (typeof(cb) === 'function') {
        cb()
      }
    })
  }

  render () {
    let c = themeManager.getColorsFor('newsTile')
    let data = this.props.article.data

    let markAsReadButton = this.props.markedAsRead ? null : this.dismissArticle

    return (
      <TouchableOpacity onLongPress={markAsReadButton} onPress={this.openArticle}>
        <View style={[ c.tile, $.tile ]}>
          <Text style={[ c.title, $.title ]}>{data.title}</Text>
          <View style={$.infoList}>
            <View style={[$.timestamp, c.infoBorder]}>
              <Timestamp date={data.created}/>
            </View>
            <View style={$.source}>
              <Text style={[ c.info, { fontSize: 12 } ]}>SOURCE</Text>
              <Text style={[ c.source ]}
                    ellipsizeMode="tail"
                    numberOfLines={1}>
                {data.domain}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

themeManager.setColorsFor('newsTile', themeManager.BRIGHT_THEME, {
  title: { color: 'rgb(0, 175, 255)' },
  source: { color: '#83c1d0' },
  tile: { backgroundColor: 'white' },
  infoBorder: { borderRightColor: '#e9e5eb'},
  info: {color: '#abacad' }
})

themeManager.setColorsFor('newsTile', themeManager.DARK_THEME, {
  title: { color: '#32F3FF' },
  source: { color: '#32F3FF' },
  tile: { backgroundColor: '#001E26' },
  infoBorder: { borderRightColor: 'rgb(41, 85, 93)'},
  info: { color: 'rgb(41, 85, 93)' },
})

const $ = StyleSheet.create({
  tile: {
    paddingVertical: 10,
    flex: 1,
    flexDirection: 'column'
  },
  title: {
    fontFamily: 'LeagueGothic-Regular',
    fontSize: 34,
    lineHeight: 34,
    letterSpacing: 1,
    fontWeight: '400',
    margin: 10
  },
  source: {
    flex: 1,
    marginLeft: 20
  },
  timestamp: {
    borderRightWidth: 2
  },
  infoList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  }
})
