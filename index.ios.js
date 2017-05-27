import React, { Component } from 'react'
import { AppRegistry, Button, StyleSheet, Text, View } from 'react-native'

import Swiper from 'react-native-page-swiper'
import NewsList from './components/news-list'
import Icon from 'react-native-vector-icons/FontAwesome'

import NewsPostManager from './lib/news-post-manager'
import ContentFetcher from './lib/content-fetcher'

import themeManager from './lib/theme-manager'
import RedditClient from './lib/reddit-client'
const newsPostManager = new NewsPostManager()

const POPULAR_PAGE_INDEX = 1
const DONE_PAGE_INDEX = 0

const contentFetcher = new ContentFetcher(new RedditClient())

export default class PopularNews extends Component {
  constructor () {
    super()
    this.state = {
      theme: themeManager.BRIGHT_THEME,
      viewReadStories: false,
      articles: []
    }

    this.toggleTheme = this.toggleTheme.bind(this)
    this.toggleViewReadStories = this.toggleViewReadStories.bind(this)
    this.markArticleAsDone = this.markArticleAsDone.bind(this)
  }

  componentDidMount () {
    newsPostManager.fetchDonePostListFromStorage()
      .then(articles => this.setState({ articles: articles }, this.fetchNews))
  }

  toggleTheme () {
    let theme = themeManager.toggleTheme()
    this.setState({ theme: theme })
  }

  toggleViewReadStories ( indexOfCurrentPage ) {
    this.setState({ viewReadStories: indexOfCurrentPage === DONE_PAGE_INDEX })
  }

  markArticleAsDone = ( articleToMark, cb ) => {
    newsPostManager.markArticleDone(articleToMark, this.state.articles)
      .then(articles => this.setState({ articles: articles }))
      .then(cb)
  }

  fetchNews = () => {
    return new Promise(resolve => {
      contentFetcher.fetchNewArticles(
        newsPostManager.getUnreadArticles(this.state.articles),
        newsPostManager.getDoneArticles(this.state.articles))
        .then(newArticles => {
          let articles = Object.assign([], this.state.articles)
          let combined = articles.concat(newArticles)
          this.setState({ articles: combined }, resolve)
        })
    })
  }

  refreshNews = () => {
    return new Promise(resolve => {
      contentFetcher.resetContentTrackers()
      this.fetchNews().then(resolve)
    })
  }

  clearAllDonePosts () {
    newsPostManager.clearAllDone()
      .then(this.setState({ articles: [] }, this.refreshNews))
  }

  render () {
    let c = themeManager.getColorsFor('index')
    let themeIconName = this.state.theme === themeManager.BRIGHT_THEME ? 'sun-o' : 'moon-o'

    let headerBarColor = this.state.viewReadStories ? c.headerBarRead : c.headerBar
    return (
      <View style={[ c.container, $.container ]}>
        <View style={[ headerBarColor, $.headerBar ]}>
          <View style={$.headerTitle}>
            <Text style={[ c.headerTitleText, $.headerTitleText ]}>SH*T PEOPLE ARE READING</Text>
          </View>
          <View style={$.headerButton}>
            <Icon
              style={[ c.headerButtonIcon, $.headerButtonIcon ]}
              name={themeIconName}
              onPress={this.toggleTheme}
              size={25}/>
          </View>
        </View>

        <Swiper pager={false} index={POPULAR_PAGE_INDEX} onPageChange={this.toggleViewReadStories}>
          <View>
            <Text style={$.readBanner}>You've read all this...</Text>
            <NewsList style={$.list}
                      newsPosts={newsPostManager.getDoneArticles(this.state.articles)}
                      readMoreButton={false}
                      fetchNews={this.fetchNews.bind(this)}
            />
            <Button
              title="Clear History"
              color="red"
              onPress={this.clearAllDonePosts.bind(this)}
            />
          </View>
          <NewsList
            newsPosts={newsPostManager.getUnreadArticles(this.state.articles)}
            onRefresh={this.refreshNews}
            fetchNews={this.fetchNews.bind(this)}
            style={$.list}
            readMoreButton={true}
            onItemDone={this.markArticleAsDone}/>
        </Swiper>
      </View>
    )
  }
}

themeManager.setColorsFor('index', themeManager.BRIGHT_THEME, {
  container: { backgroundColor: '#808080' },
  headerBar: { backgroundColor: 'white' },
  headerBarRead: { backgroundColor: 'gray' },
  headerTitleText: { color: '#000' },
  headerButtonIcon: { color: '#000' }
})

themeManager.setColorsFor('index', themeManager.DARK_THEME, {
  container: { backgroundColor: '#001E26' },
  headerBar: { backgroundColor: '#001E26' },
  headerBarRead: { backgroundColor: '#000000' },
  headerTitleText: { color: '#32F3FF' },
  headerButtonIcon: { color: '#32F3FF' }
})

const $ = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  headerBar: {
    flex: 0.08,
    flexDirection: 'row',
  },
  headerTitle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  headerTitleText: {
    fontSize: 10,
    fontFamily: 'helvetica-normal',
    height: 12,
    letterSpacing: 2,
    lineHeight: 12,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingLeft: 10
  },
  headerButton: {
    flex: 0.28,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  headerButtonIcon: {
    alignSelf: 'center',
  },
  list: {
    flex: 1,
  },
  readBanner: {
    textAlign: 'center',
    color: 'white'
  }
})

AppRegistry.registerComponent('PopularNews', () => PopularNews)
