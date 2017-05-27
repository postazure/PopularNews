import SourceScreener from '../../lib/source-screener'

describe('SourceScreener', () => {
  let subject, blacklist

  beforeEach(() => {
    blacklist = {
      '100percentfedup.com': {
        'type': 'bias',
        '2nd type': '',
        '3rd type': '',
        'Source Notes (things to know?)': ''
      },
      '365usanews.com': {
        'type': 'fake',
        '2nd type': 'conspiracy',
        '3rd type': '',
        'Source Notes (things to know?)': ''
      },
      '4threvolutionarywar.wordpress.com': {
        'type': 'clickbait',
        '2nd type': 'conspiracy',
        '3rd type': '',
        'Source Notes (things to know?)': ''
      }
    }

    subject = new SourceScreener(blacklist)
  })

  describe('getValidityRating', () => {
    describe('when the source is in the blacklist', () => {
      it('when the "type" is in the "non-creditable" list should return "fake"', () => {
        let rating = subject.getValidityRating('365usanews.com')

        expect(rating).toEqual(SourceScreener.FAKE)
      })

      it('when the "type" is NOT in the "non-creditable" list should return "suspect"', () => {
        let rating = subject.getValidityRating('100percentfedup.com')

        expect(rating).toEqual(SourceScreener.SUSPECT)
      })
    })
  })
})
