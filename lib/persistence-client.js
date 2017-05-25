import { AsyncStorage } from 'react-native'

const READ_LIST = 'READ_LIST'

export default class PersistenceClient {
  persistReadNews ( newReadPosts, cb ) {
    AsyncStorage.setItem(READ_LIST, JSON.stringify(newReadPosts), ( err ) => {
      console.log('Set ' + newReadPosts.length + 'number of items in storage')
      cb()
    })
  }

  retrieveReadNews ( cb ) {
    AsyncStorage.getItem(READ_LIST, ( err, readListFromStorage ) => {
      if (readListFromStorage) {
        let readPostsFromStorage = JSON.parse(readListFromStorage)
        console.log('Got ' + readPostsFromStorage.length + 'number of items from storage')
        cb(PersistenceClient.removeDuplicatePosts(readPostsFromStorage))
      } else {
        cb([])
      }
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