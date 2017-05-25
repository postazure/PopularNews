import React, { Component } from 'react'
import {
  StyleSheet,
  AsyncStorage,
  View,
  ScrollView,
  RefreshControl
} from 'react-native'

import NewsTile from './news-tile'
import ButtonTile from './button-tile'

export default class NewsList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      refreshing: false
    }

    this.onRefresh = this.onRefresh.bind(this)
  }

  onRefresh () {
    this.setState({refreshing: true})
    this.props.onRefresh()
      .then(() => this.setState({refreshing: false}))
  }

  renderNewsTile (post) {
    return (
      <View style={$.item} key={post.data.id}>
        <NewsTile
          article={post}
          markedAsRead={this.props.viewReadStories}
          onRead={this.props.onItemDone}
        />
      </View>
    )
  }

  render () {
    const newsTiles = this.props.newsPosts.map((post) => this.renderNewsTile(post))

    let moreStoriesButton = null
    if (this.props.readMoreButton) {
      moreStoriesButton = (
        <View style={$.item}>
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
          tintColor={'#3762D5'}
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

const $ = StyleSheet.create({
  list: {},
  item: {
    margin: 3,
  }
})
