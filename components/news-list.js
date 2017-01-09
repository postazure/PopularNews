import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl
} from 'react-native';
import {debounce} from 'throttle-debounce';

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
      newsPosts: [],
      viewCount: 0,
      lastPostId: null
    };

    this.onScroll = debounce(10000, this.onScroll);
  }

  componentDidMount() {
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

  onScroll(){
    this.fetchNews(()=>{
      console.log("this.state news", this.state.newsPosts);
      this.setState({viewCount: this.state.viewCount + 25})
    })
  }

  render() {
    const newsTiles = this.state.newsPosts.map((post) => {
      return (
        <View style={$.item} key={post.data.id}>
          <NewsTile
            title={post.data.title}
            source={post.data.domain}
            link={post.data.url}
            created={post.data.created}
            id={post.data.id}
          />
        </View>
      )
    });

    return (
      <ScrollView
        contentContainerStyle={$.list}
        refreshControl={
          <RefreshControl
          refreshing={this.state.refreshing}
          tintColor={'#3762D5'}
          title={'fetching stories'}
          onRefresh={this.onRefresh.bind(this)}/>
        }
        onScroll={this.onScroll.bind(this)}
        scrollEventThrottle={0}
        showsVerticalScrollIndicator={false}
      >
        {newsTiles}
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
