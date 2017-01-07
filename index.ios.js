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
  View
} from 'react-native';

import NewsList from './components/news-list';

export default class PopularNews extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={$.container}>
        <View style={$.headerBar}>
          <Text style={$.headerTitle}>Popular News</Text>
        </View>

        <NewsList style={$.list}/>
      </View>
    );
  }
}

const $ = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#808080',
    marginTop: 20,
  },
  headerBar: {
    flex: 0.07,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#3762D5'
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FBFBFB'
  },
  list: {
    flex: 1,
  },
});

AppRegistry.registerComponent('PopularNews', () => PopularNews);
