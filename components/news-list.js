import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import NewsTile from './news-tile';

export default class NewsList extends Component {
  render() {
    const newsTiles = this.props.newsPosts.map((post) => {
      return (
        <NewsTile
          title={post.data.title}
          source={post.data.domain}
          link={post.data.url}
          key={post.data.id}
        />
      )
    })

    return (
      <View>
        {newsTiles}
      </View>
    );
  }
}
