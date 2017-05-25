import PersistenceClient from '../lib/persistence-client'
const persistenceClient = new PersistenceClient()

export default class NewsPostManager {

  markArticleDone ( article, articles ) {
    let _this = this

    return new Promise(resolve => {
      let newArticlesState = Object.assign([], articles)
      _this.assignTimestamp(
        newArticlesState.find(a => a.data.id === article.data.id))

      persistenceClient.persistReadNews(_this.getDoneArticles(articles), () => resolve(newArticlesState))
    })
  }

  getDoneArticles = ( articles ) => {
    return articles.filter(a => !!a.doneAt)
  }

  getUnreadArticles = ( articles ) => {
    return articles.filter(a => !a.doneAt)
  }

  fetchDonePostListFromStorage = () => {
    return new Promise(resolve => {
      persistenceClient.retrieveReadNews(( articles ) => resolve(this.sortByDoneAt(articles)))
    })
  }

  clearAllDone () {
    return persistenceClient.clearAll()
  }

  sortByDoneAt ( arr ) {
    return arr.sort(( p1, p2 ) => {
      return p2.doneAt - p1.doneAt
    })
  }

  assignTimestamp ( post ) {
    post.doneAt = new Date().getTime()
    return post
  }
}