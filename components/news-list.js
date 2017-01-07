import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl
} from 'react-native';

import NewsTile from './news-tile';
import NewsParser from '../lib/news-parser';
import RedditClient from './reddit-client';

export default class NewsList extends Component {
  constructor(props) {
    super(props);

    this.redditClient = new RedditClient();
    this.newsParser = new NewsParser();

    this.state = {
      refreshing: false,
      newsPosts: []
    };
  }

  componentDidMount() {
    this.fetchNews();
  }

  fetchNews(cb) {
    if (cb === undefined) {
      cb = () => {
      }
    }

    this.redditClient.getNews((data) => {
      this.setState({newsPosts: this.newsParser.parse(data)}, cb())
    })
  }

  onRefresh() {
    this.setState({refreshing: true});
    this.fetchNews(() => {
      this.setState({refreshing: false});
    });
  }

  render() {
    const newsTiles = this.state.newsPosts.map((post) => {
      return (
        <NewsTile
          title={post.data.title}
          source={post.data.domain}
          link={post.data.url}
          created={post.data.created}
          key={post.data.id}
        />
      )
    });

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
          refreshing={this.state.refreshing}
          tintColor={'#3762D5'}
          title={'fetching stories'}
          onRefresh={this.onRefresh.bind(this)}/>
        }
      >
        {newsTiles}
      </ScrollView>
    );
  }
}