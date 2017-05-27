const fakeList = ['fake', 'fake news', 'clickbait', 'conspiracy', 'hate', 'junksci', 'political', 'rumor']
export default class SourceScreener {
  static FAKE = 'FAKE'
  static SUSPECT = 'SUSPECT'

  constructor ( blacklistJson ) {
    this.blackList = blacklistJson
  }

  getValidityRating ( sourceUrl ) {
    let record = this.blackList[ sourceUrl ]
    if (record) {
      return fakeList.includes(record.type) ? SourceScreener.FAKE : SourceScreener.SUSPECT
    }
  }
}