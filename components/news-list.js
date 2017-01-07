import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView
} from 'react-native';

import NewsTile from './news-tile';
import NewsParser from '../lib/news-parser';
import RedditClient from './reddit-client';

export default class NewsList extends Component {
  constructor(props){
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

  fetchNews(){
    this.redditClient.getNews((data) => {
      this.setState({newsPosts: this.newsParser.parse(data)})
    })
  }

  onRefresh() {
    this.setState({refreshing: true});
    fetchData().then(() => {
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
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh.bind(this)}>
        {newsTiles}
      </ScrollView>
    );
  }
}
