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

  fetchArticles () {
    return newRedditClient.getNews()
      .then(posts => NewsParser.parse(posts))
  }

  fetchNewArticles (alreadyLoadedUnread, previouslyReadArticles) {
    return this.fetchArticles()
      .then(articles => this.removeItemsPresentInExistingList(articles, previouslyReadArticles))
      .then(articles => this.removeItemsPresentInExistingList(articles, alreadyLoadedUnread))
  }

  removeItemsPresentInExistingList (newItems, existingList) {
    return newItems.filter(item => !this.isItemInList(item, existingList))
  }

  isItemInList(item, list){
    let isPresent = false;

    list.forEach(e => {
      if (e.data.id === item.data.id) {
        isPresent = true
      }
    })

    return isPresent
  }
}