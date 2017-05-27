import { AsyncStorage } from 'react-native'

const READ_LIST = 'READ_LIST'
const THEME = 'THEME'

export default class PersistenceClient {
  persistReadNews ( newReadPosts, cb ) {
    AsyncStorage.setItem(READ_LIST, JSON.stringify(newReadPosts), ( err ) => {
      cb()
    })
  }

  retrieveReadNews ( cb ) {
    AsyncStorage.getItem(READ_LIST, ( err, readListFromStorage ) => {
      if (readListFromStorage) {
        let readPostsFromStorage = JSON.parse(readListFromStorage)
        cb(PersistenceClient.removeDuplicatePosts(readPostsFromStorage))
      } else {
        cb([])
      }
    })
  }

  persistTheme(themeName) {
    return new Promise(done => {
      AsyncStorage.setItem(THEME, themeName, done)
    })
  }

  retrieveTheme(fallbackTheme) {
    return new Promise(done => {
      AsyncStorage.getItem(THEME, ( err, themeName ) => {
        if (themeName) {
          return done(themeName)
        } else {
          return done(fallbackTheme)
        }
      })
    })
  }

  clearAll () {
    return new Promise (resolve => {
      AsyncStorage.clear(resolve)
    })
  }

  static removeDuplicatePosts ( arrayWithDups ) {
    return arrayWithDups.filter(( post, pos, arr ) => {
      return arr
          .map(post => post.data.url)
          .indexOf(post.data.url) === pos
    })
  }
}