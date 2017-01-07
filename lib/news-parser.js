export default class NewsParser {
  parse(dataToParse) {
    const newsPosts = dataToParse.data.children;
    return newsPosts.map(post => this.structureData(post))
  }

  structureData(post) {
    return {
      data: {
        title: post.data.title,
        id: post.data.id,
        domain: post.data.domain,
        url: post.data.url
      }
    }
  }
}
