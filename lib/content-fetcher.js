let instance = null

import RedditClient from './reddit-client'
import NewsParser from './news-parser'

const newRedditClient = new RedditClient()
export default class ContentFetcher {
  constructor () {
    if (!instance) {
      instance = this
    }

    return instance
  }

  refreshNews () {
    newRedditClient.initializeCounter()
  }

  _fetchNews () {
    return newRedditClient.getNews()
      .then(posts => NewsParser.parse(posts))
      .then(articles => {
        console.log('Parsed Posts into Articles', articles)
        return articles
      })
  }

  fetchNews (cb) {
    this._fetchNews()
      .then(articles => {cb(articles)})
  }

  fetchMoreNews (unreadArticles, previouslyReadArticles) {
    return this._fetchNews()
      .then(articles => this.removeItemsPresentInExistingList(articles, previouslyReadArticles))
      .then(newAndUnreadArticles => this.appendNewUniqueItemsToList(newAndUnreadArticles, unreadArticles))
      .then(combinedListOfArticles => combinedListOfArticles)
  }

  removeItemsPresentInExistingList (newItems, existingList) {
    let itemsNotInExistingList = newItems.filter(item => !this.isItemInList(item, existingList))
    console.log('Found New Articles Not In Existing List', itemsNotInExistingList)
    return itemsNotInExistingList
  }

  appendNewUniqueItemsToList (newItems, existingList) {
    let newUniqueItems = this.removeItemsPresentInExistingList(newItems, existingList)
    console.log('Found New Unique Articles', newUniqueItems.length)
    return existingList.concat(newUniqueItems)
  }

  isItemInList(item, list){
    let isPresent = false;

    list.forEach(e => {
      if (e.data.id === item.id) {
        isPresent = true
      }
    })

    return isPresent
  }
}