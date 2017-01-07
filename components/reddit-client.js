import superagent from 'superagent';

export default class RedditClient {
  getNews(cb) {
    superagent.get('https://www.reddit.com/r/news.json', (err, res) => {
      if (err) { console.error(err); }
      const body = JSON.parse(res.text);
      console.log(body);
      cb(body);
    });
  }
}
