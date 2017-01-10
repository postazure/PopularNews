import {AsyncStorage} from 'react-native';

const READ_LIST = 'READ_LIST';

export default class NewsListController {
  persistReadNews(newReadPosts, cb) {
    AsyncStorage.setItem(READ_LIST, JSON.stringify(newReadPosts), (err) => {
      console.log('Set ' + newReadPosts.length + 'number of items in storage');
      cb()
    });
  }

  retrieveReadNews(cb){
    AsyncStorage.getItem(READ_LIST, (err, readListFromStorage) => {
      if (readListFromStorage) {
        let readPostsFromStorage = JSON.parse(readListFromStorage);
        console.log('Got ' + readPostsFromStorage.length + 'number of items from storage');
        cb(readPostsFromStorage);
      } else {
        cb([])
      }
    });
  }


}