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
  View
} from 'react-native';

import RedditClient from './components/reddit-client';

export default class PopularNews extends Component {
  constructor() {
    super()
    this.redditClient = new RedditClient();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.redditClient.getNews(console.log)
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={this.handleClick}
          title="Fetch News"
          color="#841584"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('PopularNews', () => PopularNews);
