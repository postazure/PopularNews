let instance = null;

import RedditClient from '../components/reddit-client'
const redditClient = new RedditClient()

import NewsParser from './news-parser';
const newsParser = new NewsParser();
class ContentManager {
  constructor() {
    if (!instance) {
      instance = this;
    }

    this.lastPostId = null;
    this.viewCount = 0;

    return instance;
  }

  fetchNews(cb) {
    redditClient.getNews(this.getAndIncrementViewCount(), this.lastPostId, (res) => {
      this.lastPostId = res.data.after;

      let newItems = newsParser.parse(res);
      cb(newItems)
    })
  }

  refreshNews(cb) {
    this.viewCount = 0;
    this.lastPostId = null;
    this.fetchNews(cb)
  }

  fetchMoreNews(existingPosts, cb) {
    this.fetchNews((newPosts) => {
      let combinePosts = existingPosts.concat(newPosts);
      let uniqueListOfPosts = ContentManager.removeDuplicatePosts(combinePosts);

      cb(uniqueListOfPosts);
    })
  }

  getAndIncrementViewCount() {
    let currentViewCount = this.viewCount;
    this.viewCount += 25;
    return currentViewCount;
  }

  static removeDuplicatePosts(arrayWithDups) {
    return arrayWithDups.filter((post, pos, arr) => {
      return arr
          .map(post => post.data.url)
          .indexOf(post.data.url) === pos;
    });
  }

}

export default new ContentManager();