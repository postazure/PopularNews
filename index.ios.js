import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Button,
  Text,
  View
} from 'react-native'

import Swiper from 'react-native-page-swiper'
import NewsList from './components/news-list'
import Icon from 'react-native-vector-icons/FontAwesome'

import NewsPostManager from './lib/news-post-manager'
const newsPostManager = new NewsPostManager()
import ContentFetcher from './lib/content-fetcher'
const contentFetcher = new ContentFetcher()

import themeManager from './lib/theme-manager'

const POPULAR_PAGE_INDEX = 1
const DONE_PAGE_INDEX = 0

export default class PopularNews extends Component {
  constructor () {
    super()
    this.state = {
      theme: themeManager.BRIGHT_THEME,
      viewReadStories: false,
      unreadNewsPosts: [],
      doneNewsPosts: []
    }

    this.toggleTheme = this.toggleTheme.bind(this)
    this.toggleViewReadStories = this.toggleViewReadStories.bind(this)
    this.addPostToDoneNewsPosts = this.addPostToDoneNewsPosts.bind(this)
  }

  componentDidMount () {
    newsPostManager.fetchDonePostListFromStorage((readPosts) => {
      this.setState({doneNewsPosts: readPosts},
        this.fetchNews
      )
    })
  }

  toggleTheme () {
    let theme = themeManager.toggleTheme()
    this.setState({theme: theme})
  }

  toggleViewReadStories (indexOfCurrentPage) {
    this.setState({viewReadStories: indexOfCurrentPage === DONE_PAGE_INDEX})
  }

  addPostToDoneNewsPosts = (post, cb) => {
    return new Promise(resolve => {
      newsPostManager.transferPostToDoneList(
        post, this.state.unreadNewsPosts, this.state.doneNewsPosts,
        (newUnreadList, newDoneList) => {
          this.setState({doneNewsPosts: newDoneList, unreadNewsPosts: newUnreadList})
        }, resolve)
    })
      .then(cb())
  }

  fetchNews = () => {
    let unreadNewsPosts = this.state.unreadNewsPosts

    return new Promise(resolve => {
      contentFetcher.fetchNewArticles(unreadNewsPosts, this.state.doneNewsPosts)
        .then(newArticles => {
          this.setState({unreadNewsPosts: unreadNewsPosts.concat(newArticles)})
        })
        .then(resolve)
    })
  }

  refreshNews = () => {
    return new Promise(resolve => {
      contentFetcher.refreshNews()
      this.fetchNews()
        .then(resolve)
    })
  }

  clearAllDonePosts () {
    newsPostManager.clearAllDone(this.setState({doneNewsPosts: []}, this.refreshNews))
  }

  render () {
    let c = themeManager.getColorsFor('index')
    let themeIconName = this.state.theme === themeManager.BRIGHT_THEME ? 'sun-o' : 'moon-o'

    let headerBarColor = this.state.viewReadStories ? c.headerBarRead : c.headerBar
    return (
      <View style={[c.container, $.container]}>
        <View style={[headerBarColor, $.headerBar]}>
          <View style={$.headerButton}/>
          <View style={$.headerTitle}>
            <Text style={[c.headerTitleText, $.headerTitleText]}>Popular News</Text>
          </View>
          <View style={$.headerButton}>
            <Icon
              style={[c.headerButtonIcon, $.headerButtonIcon]}
              name={themeIconName}
              onPress={this.toggleTheme}
              size={25}/>
          </View>
        </View>

        <Swiper pager={false} index={POPULAR_PAGE_INDEX} onPageChange={this.toggleViewReadStories}>
          <View>
            <Text style={$.readBanner}>You've read all this...</Text>
            <NewsList style={$.list}
                      newsPosts={this.state.doneNewsPosts}
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
            newsPosts={this.state.unreadNewsPosts}
            onRefresh={this.refreshNews}
            fetchNews={this.fetchNews.bind(this)}
            style={$.list}
            readMoreButton={true}
            onItemDone={this.addPostToDoneNewsPosts}/>
        </Swiper>
      </View>
    )
  }
}

themeManager.setColorsFor('index', themeManager.BRIGHT_THEME, {
  container: {backgroundColor: '#808080'},
  headerBar: {backgroundColor: '#3762D5'},
  headerBarRead: {backgroundColor: '#9ba9d3'},
  headerTitleText: {color: '#FBFBFB'},
  headerButtonIcon: {color: '#FBFBFB'}
})

themeManager.setColorsFor('index', themeManager.DARK_THEME, {
  container: {backgroundColor: '#000000'},
  headerBar: {backgroundColor: '#000000'},
  headerBarRead: {backgroundColor: '#000000'},
  headerTitleText: {color: '#FBFBFB'},
  headerButtonIcon: {color: '#FBFBFB'}
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
    justifyContent: 'center',
  },
  headerTitleText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
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
