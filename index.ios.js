/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Button,
  Text,
  View,
  ScrollView
} from 'react-native';

import RedditClient from './components/reddit-client';
import NewsList from './components/news-list';
import NewsParser from './lib/news-parser';

export default class PopularNews extends Component {
  constructor() {
    super();
    this.redditClient = new RedditClient();
    this.newsParser = new NewsParser();

    this.state = {
      newsPosts: []
    };
  }

  componentDidMount() {
    this.redditClient.getNews((data) => {
      this.setState({newsPosts: this.newsParser.parse(data)})
    })
  }

  render() {
    return (
      <View style={$.container}>
        <View style={$.headerBar}>
          <Text style={$.headerTitle}>Popular News</Text>
        </View>

        <ScrollView style={$.list}>
          <NewsList newsPosts={this.state.newsPosts}/>
        </ScrollView>
      </View>
    );
  }
}

const $ = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 20,
    backgroundColor: '#908B8A'
  },
  headerBar: {
    flex: 0.07,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#524948'
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#7CB4B8'
  },
  list: {
    flex: 1
  },
});

AppRegistry.registerComponent('PopularNews', () => PopularNews);
