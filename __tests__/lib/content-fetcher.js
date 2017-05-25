import ContentFetcher from '../../lib/content-fetcher';
import NewsParser from '../../lib/news-parser'

describe('ContentFetcher', () => {
  let cb = jest.fn();
  let fakeRedditClient = {};
  const getNewsResponse = {
    "kind": "Listing",
    "data": {
      "modhash": "",
      "children": [
        {
          "kind": "t3",
          "data": {
            "id": "5ma0g8",
            "domain": "example.com",
            "url": "http://www.example.com/story1",
            "title": "Story Title 1"
          }
        },
        {
          "kind": "t3",
          "data": {
            "id": "12as3e",
            "domain": "example.com",
            "url": "http://www.example.com/story2",
            "title": "Story Title 2"
          }
        }
      ],
      "after": "t3_5m8f8w",
      "before": null
    }
  };
  let subject;

  beforeEach(()=> {
    subject = new ContentFetcher();

    fakeRedditClient.getNews = jest.fn();
    fakeRedditClient.getNews.mockImplementation((x, y, cb) => {
      cb(getNewsResponse)
    });

    subject.redditClient = fakeRedditClient;
  });

  describe('#getAndIncrementViewCount', () => {
    it('should return the current view count', () => {
      subject.viewCount = 3327;
      let actual = subject.getAndIncrementViewCount();

      expect(actual).toEqual(3327);

    });

    it('should increase the count by 25', ()=> {
      subject.viewCount = 0;
      subject.getAndIncrementViewCount();

      expect(subject.getAndIncrementViewCount()).toEqual(25);
    })
  });

  describe('#fetchNews', () => {

    it('should request news from redditClient', () => {
      subject.fetchNews(cb);

      expect(fakeRedditClient.getNews).toBeCalled();
    });

    it('call the cb with a parsed version of the news json string', () => {
      subject.fetchNews(cb);

      const expectedParsedPosts = NewsParser.parse(getNewsResponse);
      expect(cb).toBeCalledWith(expectedParsedPosts);
    });
  });

  describe('#refreshNews', () => {
    let actualFetchNewsMethod;
    beforeEach(()=> {
      actualFetchNewsMethod = subject.fetchNews
    });

    afterEach(() => {
      subject.fetchNews = actualFetchNewsMethod;
    })

    it('reset viewCount and lastPostId', () => {
      subject.viewCount = 24;
      subject.lastPostId = "foobar";
      expect(subject.viewCount).toEqual(24);
      expect(subject.lastPostId).toEqual("foobar");

      subject.fetchNews = jest.fn();
      subject.refreshNews();

      expect(subject.viewCount).toEqual(0);
      expect(subject.lastPostId).toEqual(null);
    });

    it('should get news from redditClient', () => {
      subject.refreshNews(cb);
      expect(fakeRedditClient.getNews).toBeCalled();
    });
  });

  describe('#fetchMoreNews', () => {
    it('should call cb with with a unique list of posts', () => {
      let allNewsPosts = NewsParser.parse(getNewsResponse);
      let existingPosts = [allNewsPosts[0]];

      let cb = jest.fn();
      subject.fetchNews(existingPosts, cb);

      expect(cb).toBeCalledWith(allNewsPosts);
    });
  });
});