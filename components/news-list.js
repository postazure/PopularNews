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
import ButtonTile from './button-tile'

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
    newReadPosts.push(post)

    this.setState({readPosts: newReadPosts}, cb());
  }

  render() {
    const newsTiles = this.state.newsPosts
      .filter((post) => {
        if (this.props.viewReadStories) {
          return this.state.readPosts.indexOf(post) > -1
        } else {
          return this.state.readPosts.indexOf(post) === -1
        }

      })
      .map((post) => {
        return (
          <View style={$.item} key={post.data.id}>
            <NewsTile
              title={post.data.title}
              source={post.data.domain}
              link={post.data.url}
              created={post.data.created}
              id={post.data.id}
              article={post}
              onRead={this.addArticleToReadList}
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
        showsVerticalScrollIndicator={false}
      >
        {newsTiles}
        <View style={$.item}>
          <ButtonTile
            onPress={this.loadMoreStories}
            text={"More Stories"}
            iconName={"chevron-down"}
            iconSize={12}
          />
        </View>
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
