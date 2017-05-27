import expect from 'expect'

import ContentFetcher from '../../lib/content-fetcher'
import NewsParser from '../../lib/news-parser'
import SourceScreener from '../../lib/source-screener'

describe('ContentFetcher', () => {
  const rawArticles = [
        {
          'kind': 't3',
          'data': {
            'id': '5ma0g8',
            'domain': 'aheadoftheherd.com',
            'url': 'http://www.example.com/story1',
            'title': 'Story Title 1'
          }
        },
        {
          'kind': 't3',
          'data': {
            'id': '12as3e',
            'domain': '24newsflash.com',
            'url': 'http://www.example.com/story2',
            'title': 'Story Title 2',
            'created_utc': 200000
          }
        }
      ]

  let subject
  let getNewsSpy, initializeCounterSpy

  beforeEach(() => {
    let articlesPromise = Promise.resolve(NewsParser.parse(rawArticles))
    getNewsSpy = expect.createSpy().andReturn(articlesPromise)
    initializeCounterSpy = expect.createSpy()

    const client = {
      getNews: getNewsSpy,
      initializeCounter: initializeCounterSpy
    }
    subject = new ContentFetcher(client)
  })

  describe('#fetchArticles', () => {
    it('should request news from redditClient', () => {
      subject.fetchArticles()

      expect(getNewsSpy).toHaveBeenCalled()
    })

    it('returns parsed articles', async () => {
      let fetchedArticles = [];
      let fetchArticlesPromise = subject.fetchArticles()

      await fetchArticlesPromise.then(articles => fetchedArticles = articles)

      expect(fetchedArticles[0].data.title).toEqual('Story Title 1')
      expect(fetchedArticles[1].data.title).toEqual('Story Title 2')
    })

    it('returns add source validity to articles', async () => {
      let fetchedArticles = [];
      let fetchArticlesPromise = subject.fetchArticles()

      await fetchArticlesPromise.then(articles => fetchedArticles = articles)

      expect(fetchedArticles[0].sourceValidity).toEqual(SourceScreener.SUSPECT)
      expect(fetchedArticles[1].sourceValidity).toEqual(SourceScreener.FAKE)
    })
  })
})