import Article from '../../lib/article'

describe('Article', () => {
  describe('#initialize', () => {
    it('creates an article from a post', ()=> {
      let doneAt = new Date();

      const post = {
        data: {title: "Story Title 1", id: "5ma0g8", domain: "example.com", url: "http://www.example.com/story1"},
        doneAt: doneAt
      };

      let article = new Article(post);

      expect(article.title).toEqual("Story Title 1");
      expect(article.id).toEqual("5ma0g8");
      expect(article.domain).toEqual("example.com");
      expect(article.url).toEqual("http://www.example.com/story1");
      expect(article.doneAt).toEqual(doneAt);
    });
  });

  describe('#equals', () => {
    it('returns true if the url is the same', () => {
      const post1 = {
        data: {title: "Story Title 1", id: "5ma0g8", domain: "example.com", url: "http://www.example.com/story1"},
        doneAt: 1234
      };

      const post2 = {
        data: {title: "other title", id: "2", domain: "example.com/foo", url: "http://www.example.com/story1"},
        doneAt: 5678
      };

      let article1 = new Article(post1);
      let article2 = new Article(post2);

      expect(article1.equals(article2)).toBe(true);
    });

    it('returns true if the id is the same', () => {
      const post1 = {
        data: {title: "Story Title 1", id: "5ma0g8", domain: "example.com", url: "http://www.example.com/story1"},
        doneAt: 1234
      };

      const post2 = {
        data: {title: "other title", id: "5ma0g8", domain: "example.com/foo", url: "http://www.example.com/story8"},
        doneAt: 5678
      };

      let article1 = new Article(post1);
      let article2 = new Article(post2);

      expect(article1.equals(article2)).toBe(true);
    });

    it('returns false if the url and id are not the same', () => {
      const post1 = {
        data: {title: "Story Title 1", id: "5ma0g8", domain: "example.com", url: "http://www.example.com/story8"},
        doneAt: 1234
      };

      const post2 = {
        data: {title: "other title", id: "2", domain: "example.com/foo", url: "http://www.example.com/story1"},
        doneAt: 5678
      };

      let article1 = new Article(post1);
      let article2 = new Article(post2);

      expect(article1.equals(article2)).toBe(false);
    });

    it('returns false if "other" is not an article', () => {
      let article = new Article({data: {id: "123", url: "url"}});
      let other = {id: "123", url: "url"};

      expect(article.equals(other)).toBe(false);
    });
  });
});