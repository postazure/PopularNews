import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity
} from 'react-native';

import moment from 'moment';
import themeManager from '../lib/theme-manager'

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
    let c = themeManager.getColorsFor('newsTile');
    let tileGbColor = this.state.isViewed ? c.viewedTile : c.unviewedTile;

    return (
      <TouchableOpacity
        style={[tileGbColor, $.tile]}
        onPress={this.handleClick}
      >
        <Text style={[c.title, $.title]}>{this.props.title}</Text>
        <View style={$.infoList}>
          <Text style={[c.source, $.source]}>{this.props.source}</Text>
          <Text style={[c.source, $.source]}>{moment.unix(this.props.created).fromNow()}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

themeManager.setColorsFor('newsTile', themeManager.BRIGHT_THEME, {
  title: {color: '#171414'},
  source: {color: '#333333'},
  viewedTile: {backgroundColor: '#D3D3D3'},
  unviewedTile: {backgroundColor: 'white'},
});

themeManager.setColorsFor('newsTile', themeManager.DARK_THEME, {
  title: {color: '#D3D3D3'},
  source: {color: '#D3D3D3'},
  viewedTile: {backgroundColor: '#020202'},
  unviewedTile: {backgroundColor: '#131313'},
});

const $ = StyleSheet.create({
  tile: {
    paddingVertical: 10,
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontSize: 17,
    margin: 10,
    fontWeight: 'bold'
  },
  source: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
  },
  infoList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  }
});
