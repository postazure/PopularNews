import PersistenceClient from '../lib/persistence-client'
const persistenceClient = new PersistenceClient();

export default class NewsPostManager {
  transferPostToDoneList(post, unreadList, doneList, cb) {
    let postWithTimeStamp = this.addMarkedDoneTimestampToPost(post);

    let newDoneList = Object.assign([], doneList);
    newDoneList.push(postWithTimeStamp);

    let newUnreadList = this.removePostFromList(unreadList, postWithTimeStamp);

    persistenceClient.persistReadNews(newDoneList,() => {
      cb(
        this.sortByDoneAt(newUnreadList), this.sortByDoneAt(newDoneList));
    });
  }

  fetchDonePostListFromStorage(cb) {
    persistenceClient.retrieveReadNews((readPosts) => {
      cb(this.sortByDoneAt(readPosts));
    });
  }

  clearAllDone(cb){
    persistenceClient.clearAll(cb)
  }

  removePostFromList(list, post) {
    let postInUnreadList = list.find((p) => p.data.url === post.data.url);
    let index = list.indexOf(postInUnreadList);

    if (index > -1) {
      list.splice(index, 1)
    }

    return list;
  }

  sortByDoneAt(arr){
    return arr.sort((p1, p2) => {
      return p2.doneAt - p1.doneAt
    })
  }

  addMarkedDoneTimestampToPost(post) {
    post.doneAt = new Date().getTime();
    return post
  }
}