import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Linking,
  TouchableOpacity
} from 'react-native';

export default class NewsTile extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    Linking.canOpenURL(this.props.link).then(supported => {
      if (supported) {
        Linking.openURL(this.props.link);
      } else {
        console.log('Don\'t know how to open URI: ' + this.props.link);
      }
    });
  }

  render() {
    return (
      <TouchableOpacity
        style={$.tile}
        onPress={this.handleClick}
      >
        <Text style={$.title}>{this.props.title}</Text>
        <Text style={$.source}>{this.props.source}</Text>
      </TouchableOpacity>
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