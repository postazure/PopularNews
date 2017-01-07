import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class NewsTile extends Component {
  render() {
    return (
      <View style={$.tile}>
        <Text style={$.title}>{this.props.title}</Text>
        <Text style={$.source}>{this.props.source}</Text>
      </View>
    );
  }
}


const $ = StyleSheet.create({
  tile: {
    borderBottomWidth: 1,
    marginTop: 5,
    paddingBottom: 10,
  },
  title: {
    fontSize: 14,
    marginBottom: 2,
    textAlign: 'left',
  },
  source: {
    fontSize: 10,
    textAlign: 'center',
    color: '#333333',
  },
});