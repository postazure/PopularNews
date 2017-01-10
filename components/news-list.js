import React, { Component } from 'react';
import {
  StyleSheet,
  AsyncStorage,
  View,
  ScrollView,
  RefreshControl
} from 'react-native';

import NewsTile from './news-tile';
import NewsParser from '../lib/news-parser';
import RedditClient from './reddit-client';
import ButtonTile from './button-tile'
import PersistenceClient from '../lib/persistence-client'

const persistenceClient = new PersistenceClient()


export default class NewsList extends Component {
  constructor(props) {
    super(props);

    this.redditClient = new RedditClient();
    this.newsParser = new NewsParser();

    this.state = {
      refreshing: false,
      newsPosts: [],
      viewCount: 0,
      lastPostId: null,
      readPosts: []
    };

    this.addArticleToReadList = this.addArticleToReadList.bind(this);
    this.loadMoreStories = this.loadMoreStories.bind(this);
  }

  componentDidMount() {
    persistenceClient.retrieveReadNews((readPosts) => {
      this.setState({readPosts: readPosts})
    });

    this.fetchNews();
  }

  fetchNews(cb) {
    if (cb === undefined) {
      cb = () => {
      }
    }

    this.redditClient.getNews(this.state.viewCount, this.state.lastPostId, (res) => {
      let newsPosts = Object.assign([], this.state.newsPosts);
      let newItems = this.newsParser.parse(res);
      let combindPosts = newsPosts
        .concat(newItems)
        .filter((post, pos, arr) => {
          return arr
              .map(post => post.data.url)
              .indexOf(post.data.url) === pos;
        });

      this.setState({
          newsPosts: combindPosts,
          lastPostId: res.data.after
        },
        cb())
    })
  }

  onRefresh() {
    this.setState({refreshing: true});
    this.fetchNews(() => {
      this.setState({
        refreshing: false,
        viewCount: 0,
        newsPosts: []
      });
    });
  }

  loadMoreStories() {
    this.fetchNews(()=> {
      this.setState({viewCount: this.state.viewCount + 25})
    })
  }

  addArticleToReadList(post, cb) {
    let newReadPosts = Object.assign([], this.state.readPosts);
    newReadPosts.push(post);

    this.setState({readPosts: newReadPosts}, () => {
      persistenceClient.persistReadNews(newReadPosts, cb)
    });
  }

  filterStories() {
    if (this.props.viewReadStories) {
      //Include only already read stories
      return this.state.readPosts;
    } else {
      //Include only unread stories
      return this.state.newsPosts
        .filter((post) => {
            return this.state.readPosts.find(p => p.data.url === post.data.url) === undefined
          }
        )
    }
  }

  renderNewsTile(post) {
    return (
      <View style={$.item} key={post.data.id}>
        <NewsTile
          article={post}
          markedAsRead={this.props.viewReadStories}
          onRead={this.addArticleToReadList}
        />
      </View>
    )
  }

  render() {
    const newsTiles = this.filterStories().map((post) => this.renderNewsTile(post));

    let moreStoriesButton = this.props.viewReadStories ? null : (
      <View style={$.item}>
        <ButtonTile
          onPress={this.loadMoreStories}
          text={"More Stories"}
          iconName={"chevron-down"}
          iconSize={12}
        />
      </View>
    );

    let refreshControl = this.props.viewReadStories ? null : (
      <RefreshControl
        refreshing={this.state.refreshing}
        tintColor={'#3762D5'}
        title={'refreshing'}
        onRefresh={this.onRefresh.bind(this)}/>
    );

    return (
      <ScrollView
        contentContainerStyle={$.list}
        refreshControl={refreshControl}
        showsVerticalScrollIndicator={false}
      >
        {newsTiles}
        {moreStoriesButton}
      </ScrollView>
    );
  }
}

const $ = StyleSheet.create({
  list: {},
  item: {
    margin: 3,
  }
});
