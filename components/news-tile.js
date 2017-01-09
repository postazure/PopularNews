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
    let data = this.props.article.data;
    let addArticleToReadList = this.props.onRead;
    let alreadyRead = this.state.isViewed;

    Linking.canOpenURL(data.url).then(supported => {
      if (supported) {
        if (!alreadyRead) {
          this.setState({isViewed: true});
          addArticleToReadList(this.props.article, () => {
            Linking.openURL(data.url);
          });
        }

      } else {
        console.log('Don\'t know how to open URI: ' + data.url);
      }
    });
  }

  render() {
    let c = themeManager.getColorsFor('newsTile');
    let tileGbColor = this.state.isViewed ? c.viewedTile : c.unviewedTile;
    let data = this.props.article.data;
    return (
      <TouchableOpacity
        style={[tileGbColor, $.tile]}
        onPress={this.handleClick}
      >
        <Text style={[c.title, $.title]}>{data.title}</Text>
        <View style={$.infoList}>
          <Text style={[c.source, $.source]}>{data.source}</Text>
          <Text style={[c.source, $.source]}>{moment.unix(data.created).fromNow()}</Text>
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
