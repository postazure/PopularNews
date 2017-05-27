import React, { Component } from 'react'
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Timestamp from './timestamp'
import themeManager from '../lib/theme-manager'
import colors from '../lib/colors'
import Icon from 'react-native-vector-icons/FontAwesome'
import SourceScreener from '../lib/source-screener'

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
    if (!this.props.onRead) {
      cb()
      return
    }

    this.props.onRead(this.props.article, () => {
      if (typeof(cb) === 'function') {
        cb()
      }
    })
  }

  renderSourceWarning = () => {
    switch (this.props.article.sourceValidity) {
      case SourceScreener.FAKE:
        return <Icon name={'exclamation-triangle'} style={{color: colors.red}}/>
      case SourceScreener.SUSPECT:
        return <Icon name={'exclamation-triangle'} style={{color: colors.orange}}/>
    }
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
            <View style={[ $.timestamp, c.infoBorder ]}>
              <Timestamp date={data.created}/>
            </View>
            <View style={$.source}>
              <Text style={[ c.info, { fontSize: 12 } ]}>
                SOURCE {this.renderSourceWarning()}
              </Text>
              <Text style={[ c.source, $.sourceText ]}
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
  title: { color: colors.dogerBlue },
  source: { color: colors.halfBacked },
  tile: { backgroundColor: colors.white },
  infoBorder: { borderRightColor: colors.mischka },
  info: { color: colors.bombay }
})

themeManager.setColorsFor('newsTile', themeManager.DARK_THEME, {
  title: { color: colors.cyan },
  source: { color: colors.cyan },
  tile: { backgroundColor: colors.swamp },
  infoBorder: { borderRightColor: colors.casal },
  info: { color: colors.casal },
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
  sourceText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
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
