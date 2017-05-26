import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native'

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
            <Timestamp date={data.created}/>
            <Text style={[ c.source, $.source ]}
                  ellipsizeMode="tail"
                  numberOfLines={1}
            >{data.domain}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

themeManager.setColorsFor('newsTile', themeManager.BRIGHT_THEME, {
  title: { color: '#171414' },
  source: { color: '#333333' },
  tile: { backgroundColor: 'white' },
})

themeManager.setColorsFor('newsTile', themeManager.DARK_THEME, {
  title: { color: '#32F3FF' },
  source: { color: 'rgb(41, 85, 93)' },
  tile: { backgroundColor: '#001E26' },
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
    textAlign: 'center',
    fontSize: 12,
  },
  time: {
    flex: 0.5,
    textAlign: 'left',
    fontSize: 12,
  },
  infoList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  }
})
