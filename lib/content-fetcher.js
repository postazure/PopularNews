import SourceScreener from './source-screener'
import blackListFile from '../assets/sources/blacklist.json'
import NewsParser from './news-parser'

const sourceScreener = new SourceScreener(blackListFile)
export default class ContentFetcher {
  constructor ( client ) {
    this.client = client
  }

  resetContentTrackers () {
    this.client.initializeCounter()
  }

  fetchArticles () {
    return this.client.getNews()
      .then(posts => NewsParser.parse(posts))
      .then(posts => posts
        .map(post => {
          post.sourceValidity = sourceScreener.getValidityRating(post.data.domain)
          return post
        })
      )

  }

  fetchNewArticles ( alreadyLoadedUnread, previouslyReadArticles ) {
    return this.fetchArticles()
      .then(articles => this.removeItemsPresentInExistingList(articles, previouslyReadArticles))
      .then(articles => this.removeItemsPresentInExistingList(articles, alreadyLoadedUnread))
  }

  removeItemsPresentInExistingList ( newItems, existingList ) {
    return newItems.filter(item => !this.isItemInList(item, existingList))
  }

  isItemInList ( item, list ) {
    let isPresent = false

    list.forEach(e => {
      if (e.data.id === item.data.id) {
        isPresent = true
      }
    })

    return isPresent
  }
}