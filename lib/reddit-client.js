const fetchThisManyMoreArticlesAtATime = 25

export default class NewRedditClient {
  constructor () {
    this.initializeCounter()
  }

  initializeCounter () {
    this.lastPostId = ''
    this.viewCount = 0
  }

  incrementViewCount = () => {
    this.viewCount += fetchThisManyMoreArticlesAtATime
  }

  setLastPostId = ( lastPostId ) => {
    this.lastPostId = lastPostId
  }

  getNews () {
    let url = 'https://www.reddit.com/r/news.json?count=' + this.viewCount + '&after=' + this.lastPostId
    return fetch(url)
      .catch(res => {
        console.error(res)
      })
      .then(res => res.json())
      .then(json => {
        this.setLastPostId(json.data.after)
        this.incrementViewCount()
        return json.data.children
      })
  }
}
