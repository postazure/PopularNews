import NewsPostManager from '../../lib/news-post-manager'
import moment from 'moment'

describe('NewsPostManager', () => {
  let subject, sampleArticles

  beforeEach(() => {
    subject = new NewsPostManager()
  })

  describe('#getDoneArticles', () => {
    beforeEach(() => {
      sampleArticles = [
        {
          doneAt: 2,
          data: { title: 'Read1' }
        },
        {
          data: { title: 'Unread1' }
        },
        {
          doneAt: 11,
          data: { title: 'Read2' }
        }
      ]
    })

    it('returns all the articles with doneAt values', () => {
      let actual = subject.getDoneArticles(sampleArticles)

      expect(actual).toHaveLength(2)
      expect(actual[0].doneAt).toBeTruthy()
      expect(actual[1].doneAt).toBeTruthy()
    })

    it('returns a sorted list (most recent first)', () => {
      let actual = subject.getDoneArticles(sampleArticles)

      expect(moment(actual[0].doneAt).isAfter(moment(actual[1].doneAt))).toBe(true)
    })
  })

  describe('#getUnreadArticles', () => {
    beforeEach(() => {
      sampleArticles = [
        {
          data: { title: 'Unread1', created: 3 }
        },
        {
          data: { title: 'Unread2', created: 22 }
        },
        {
          doneAt: 11,
          data: { title: 'Read1', created: 1 }
        }
      ]
    })

    it('returns all the articles without doneAt values', () => {
      let actual = subject.getUnreadArticles(sampleArticles)

      expect(actual).toHaveLength(2)
      expect(actual[0].doneAt).toBe(undefined)
      expect(actual[1].doneAt).toBe(undefined)
    })

    it('returns a sorted list (most recent first)', () => {
      let actual = subject.getUnreadArticles(sampleArticles)

      expect(actual[0].data.created).toBeGreaterThan(actual[1].data.created)
    })
  })
})