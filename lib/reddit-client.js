const fetchThisManyMoreArticlesAtATime = 25
export default class RedditClient {
  constructor () {
    this.initializeCounter()
    this.lastPostId = ''
  }

  initializeCounter () {
    console.log('Initializing Counters')
    this.viewCount = 0
  }

  incrementViewCount = () => {
    this.viewCount += fetchThisManyMoreArticlesAtATime
  }

  setLastPostId = ( lastPostId ) => {
    this.lastPostId = lastPostId
  }

  buildQueryParamString = ( viewCount, lastPostId) => {
    let params = []
    if (viewCount > 0) {
      params.push(`count=${viewCount}`)
    }

    if (lastPostId.length > 0) {
      params.push(`after=${lastPostId}`)
    }

    return params.length > 0 ? `?${params.join('&')}` : ''
  }

  getNews () {
    const host = 'https://www.reddit.com/r/news.json'
    let params = this.buildQueryParamString(this.viewCount, this.lastPostId)
    let url = host + params

    console.log('Fetching News From', url)
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
