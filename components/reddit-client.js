import superagent from 'superagent';

export default class RedditClient {
  getNews(count, lastPostId, cb) {
    superagent.get('https://www.reddit.com/r/news.json?count=' + count + '&after=' + lastPostId, (err, res) => {
      if (err) {
        console.error(err);
      }
      const body = JSON.parse(res.text);
      cb(body);
    });
  }
}
