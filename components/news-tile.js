import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';

import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import Icon from 'react-native-vector-icons/FontAwesome';

import moment from 'moment';
import themeManager from '../lib/theme-manager'

export default class NewsTile extends Component {
  constructor(props) {
    super(props);
    this.openArticle = this.openArticle.bind(this);
    this.dismissArticle = this.dismissArticle.bind(this);
  }

  openArticle() {
    let data = this.props.article.data;

    Linking.canOpenURL(data.url).then(supported => {
      if (supported) {
        this.dismissArticle(() => Linking.openURL(data.url))
      } else {
        console.log('Don\'t know how to open URI: ' + data.url);
      }
    });
  }

  dismissArticle(cb) {
    this.props.onRead(this.props.article, () => {
      if (typeof(cb) === "function") {
        cb();
      }
    });
  }

  render() {
    let c = themeManager.getColorsFor('newsTile');
    let data = this.props.article.data;

    let markAsReadButton = this.props.markedAsRead ? null : this.dismissArticle

    return (
      <TouchableOpacity onLongPress={markAsReadButton} onPress={this.openArticle}>
        <View style={[c.tile, $.tile]}>
          <Text style={[c.title, $.title]}>{data.title}</Text>
          <View style={$.infoList}>
            <Text style={[c.source, $.source]}
                  ellipsizeMode="tail"
                  numberOfLines={1}
            >{data.domain}</Text>
            <Text style={[c.source, $.time]}>{moment.unix(data.created).fromNow()}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

themeManager.setColorsFor('newsTile', themeManager.BRIGHT_THEME, {
  title: {color: '#171414'},
  source: {color: '#333333'},
  tile: {backgroundColor: 'white'},
});

themeManager.setColorsFor('newsTile', themeManager.DARK_THEME, {
  title: {color: '#D3D3D3'},
  source: {color: '#D3D3D3'},
  tile: {backgroundColor: '#131313'},
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
    textAlign: 'center',
    fontSize: 12,
  },
  time: {
    flex: 0.5,
    textAlign: 'left',
    fontSize: 12,
  },
  infoList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginHorizontal: 20,
  }
});
