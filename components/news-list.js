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

import contentManager from '../lib/content-manager'

import PersistenceClient from '../lib/persistence-client'
const persistenceClient = new PersistenceClient()

export default class NewsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      newsPosts: [],
      readPosts: []
    };

    this.addArticleToReadList = this.addArticleToReadList.bind(this);
    this.fetchNews = this.fetchNews.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    persistenceClient.retrieveReadNews((readPosts) => {
      this.setState({readPosts: readPosts})
    });

    this.fetchNews();
  }

  fetchNews(cb) {
    if(typeof(cb) !== 'function') {
      cb = () => {}
    }

    contentManager.fetchMoreNews(this.state.newsPosts, (combineNewsPosts) => {
      this.setState(
        {newsPosts: combineNewsPosts},
        cb)
    })

  }

  onRefresh() {
    this.setState({refreshing: true});
    contentManager.refreshNews((combineNewsPosts) => {
      this.setState({newsPosts: combineNewsPosts, refreshing: false});
    });
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
          onPress={this.fetchNews}
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
        onRefresh={this.onRefresh}/>
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
