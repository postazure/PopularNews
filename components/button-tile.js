import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import themeManager from '../lib/theme-manager'

export default class ButtonTile extends Component {
  render() {
    let c = themeManager.getColorsFor('buttonTile');

    if (this.props.children) {
      return (
        <TouchableOpacity
          style={[c.background, $.tile]}
          onPress={this.props.onPress}>
          <View style={$.content}>
            {this.props.children}
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={[c.background, $.tile]}
          onPress={this.props.onPress}>

          <View style={$.content}>
            <Text style={[c.text, $.text]}>{this.props.text}</Text>
            <View style={$.icon}>
              <Icon name={this.props.iconName} size={this.props.iconSize} style={c.text}/>
            </View>
            {this.props.children}
          </View>
        </TouchableOpacity>
      );
    }
  }
}

themeManager.setColorsFor('buttonTile', themeManager.BRIGHT_THEME, {
  text: {color: '#171414'},
  background: {backgroundColor: 'white'},
});

themeManager.setColorsFor('buttonTile', themeManager.DARK_THEME, {
  text: {color: '#D3D3D3'},
  background: {backgroundColor: '#131313'},
});

const $ = StyleSheet.create({
  tile: {
    paddingVertical: 10,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  text: {
    fontSize: 17,
    margin: 5,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
  },
  content: {
    flexDirection: 'row',
  },

  icon: {
    flex: 0.27,
    alignSelf: 'center',
  }

});
