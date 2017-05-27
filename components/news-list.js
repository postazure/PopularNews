import React, { Component } from 'react'
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native'

import NewsTile from './news-tile'
import ButtonTile from './button-tile'
import themeManager from '../lib/theme-manager'

export default class NewsList extends Component {
  constructor ( props ) {
    super(props)
    this.state = {
      refreshing: false
    }

    this.onRefresh = this.onRefresh.bind(this)
  }

  onRefresh () {
    this.setState({ refreshing: true })
    this.props.onRefresh()
      .then(() => this.setState({ refreshing: false }))
  }

  renderNewsTile ( post ) {
    let c = themeManager.getColorsFor('newsList')

    return (
      <View style={[c.panelBorder, $.item]} key={post.data.id}>
        <NewsTile
          article={post}
          markedAsRead={this.props.viewReadStories}
          onRead={this.props.onItemDone}
        />
      </View>
    )
  }

  render () {
    let c = themeManager.getColorsFor('newsList')

    const newsTiles = this.props.newsPosts.map(( post ) => this.renderNewsTile(post))

    let moreStoriesButton = null
    if (this.props.readMoreButton) {
      moreStoriesButton = (
        <View style={[c.panelBorder, $.item]}>
          <ButtonTile
            onPress={this.props.fetchNews}
            text={'More Stories'}
            iconName={'chevron-down'}
            iconSize={12}
          />
        </View>
      )
    }

    let refreshControl = null
    if (this.props.onRefresh) {
      refreshControl = (
        <RefreshControl
          refreshing={this.state.refreshing}
          title={'refreshing'}
          onRefresh={this.onRefresh}/>
      )
    }

    return (
      <ScrollView
        contentContainerStyle={$.list}
        refreshControl={refreshControl}
        showsVerticalScrollIndicator={false}>
        {newsTiles}
        {moreStoriesButton}
      </ScrollView>
    )
  }
}

themeManager.setColorsFor('newsList', themeManager.BRIGHT_THEME, {
  panelBorder: { borderBottomColor: '#e9e5eb'}
})

themeManager.setColorsFor('newsList', themeManager.DARK_THEME, {
  panelBorder: { borderBottomColor: '#000'},
})

const $ = StyleSheet.create({
  list: {},
  item: {
    borderBottomWidth: 2,
  }
})
