import expect from 'expect'

import ContentFetcher from '../../lib/content-fetcher'
import NewsParser from '../../lib/news-parser'

describe('ContentFetcher', () => {
  const rawArticles = [
        {
          'kind': 't3',
          'data': {
            'id': '5ma0g8',
            'domain': 'example.com',
            'url': 'http://www.example.com/story1',
            'title': 'Story Title 1'
          }
        },
        {
          'kind': 't3',
          'data': {
            'id': '12as3e',
            'domain': 'example.com',
            'url': 'http://www.example.com/story2',
            'title': 'Story Title 2'
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
      let fetchedArticles;
      let fetchArticlesPromise = subject.fetchArticles()

      await fetchArticlesPromise.then(articles => fetchedArticles = articles)

      //noinspection JSUnusedAssignment
      expect(fetchedArticles).toEqual(NewsParser.parse(rawArticles))
    })
  })
})