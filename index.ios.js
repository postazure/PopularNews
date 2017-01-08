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
import Icon from 'react-native-vector-icons/FontAwesome';

import themeManager from './lib/theme-manager'



export default class PopularNews extends Component {
  constructor() {
    super();
    this.state = {
      theme: themeManager.BRIGHT_THEME
    }

    this.toggleTheme = this.toggleTheme.bind(this);
  }

  toggleTheme(){
    let theme = themeManager.toggleTheme();
    this.setState({theme: theme})
  }

  render() {
    let c = themeManager.getColorsFor('index');
    let themeIconName = this.state.theme === themeManager.BRIGHT_THEME ? "sun-o" : "moon-o";

    return (
      <View style={[c.container, $.container]}>
        <View style={[c.headerBar, $.headerBar]}>
          <View style={$.headerButton}>
          </View>
          <View style={$.headerTitle}>
            <Text style={[c.headerTitleText, $.headerTitleText]}>Popular News</Text>
          </View>
          <View style={$.headerButton}>
            <Icon
              style={[c.headerButtonIcon, $.headerButtonIcon]}
              name={themeIconName}
              onPress={this.toggleTheme}
              size={20}/>
          </View>
        </View>

        <NewsList style={$.list}/>
      </View>
    );
  }
}

themeManager.setColorsFor('index', themeManager.BRIGHT_THEME, {
  container: {backgroundColor: '#808080'},
  headerBar: {backgroundColor: '#3762D5'},
  headerTitleText: {color: '#FBFBFB'},
  headerButtonIcon: {color: '#FBFBFB'}
});

themeManager.setColorsFor('index', themeManager.DARK_THEME, {
  container: {backgroundColor: '#000000'},
  headerBar: {backgroundColor: '#333333'},
  headerTitleText: {color: '#FBFBFB'},
  headerButtonIcon: {color: '#FBFBFB'}
});

const $ = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  headerBar: {
    flex: 0.07,
    flexDirection: 'row',
  },
  headerTitle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  headerTitleText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerButton: {
    flex: 0.15,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  headerButtonIcon: {
    alignSelf: 'center',
  },
  list: {
    flex: 1,
  },
});

AppRegistry.registerComponent('PopularNews', () => PopularNews);
