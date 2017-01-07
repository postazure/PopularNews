import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity
} from 'react-native';

import moment from 'moment';

export default class NewsTile extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      isViewed: false
    }
  }

  handleClick() {
    Linking.canOpenURL(this.props.link).then(supported => {
      if (supported) {
        this.setState({isViewed: true})
        Linking.openURL(this.props.link);
      } else {
        console.log('Don\'t know how to open URI: ' + this.props.link);
      }
    });
  }

  render() {
    let color = this.state.isViewed ? $.viewedTile : $.unViewedTile

    return (
      <TouchableOpacity
        style={[color, $.tile]}
        onPress={this.handleClick}
      >
        <Text style={$.title}>{this.props.title}</Text>
        <Text style={$.source}>{moment.unix(this.props.created).fromNow()} | {this.props.source}</Text>
      </TouchableOpacity>
    );
  }
}

const $ = StyleSheet.create({
  tile: {
    paddingVertical: 10,
    flex: 1,
    flexDirection: 'column',
  },
  viewedTile: {
    backgroundColor: '#A9A9A9'
  },
  unViewedTile: {
    backgroundColor: '#DCDCDC'
  },
  title: {
    fontSize: 17,
    margin: 10,
    color: '#171414',
  },
  source: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333333',
  },
});
