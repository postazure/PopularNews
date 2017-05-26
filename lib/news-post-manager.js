import moment from 'moment'
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
    return this.sortByDoneAt(articles.filter(a => !!a.doneAt))
  }

  getUnreadArticles = ( articles ) => {
    return this.sortByCreated(articles.filter(a => !a.doneAt))
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
      let number = moment.utc(p2.doneAt).diff(moment.utc(p1.doneAt))
      debugger
      return number
    })
  }

  sortByCreated ( arr ) {
    return arr.sort(( p1, p2 ) => {
      let number = moment.utc(p2.data.created).diff(moment.utc(p1.data.created))
      debugger
      return number
    })
  }

  assignTimestamp ( post ) {
    post.doneAt = new Date().getTime()
    return post
  }
}