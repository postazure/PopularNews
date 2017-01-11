import PersistenceClient from '../lib/persistence-client'
const persistenceClient = new PersistenceClient();

export default class NewsPostManager {
  transferPostToDoneList(post, unreadList, doneList, cb) {
    let newDoneList = Object.assign([], doneList);
    newDoneList.push(post);

    let newUnreadList = this.removePostFromList(unreadList, post);

    persistenceClient.persistReadNews(newDoneList,() => {
      cb(newUnreadList, newDoneList)
    });
  }

  fetchDonePostListFromStorage(cb) {
    persistenceClient.retrieveReadNews((readPosts) => {
      cb(readPosts)
    });
  }

  removePostFromList(list, post) {
    let postInUnreadList = list.find((p) => p.data.url === post.data.url);
    let index = list.indexOf(postInUnreadList);

    if (index > -1) {
      list.splice(index, 1)
    }

    return list;
  }

}