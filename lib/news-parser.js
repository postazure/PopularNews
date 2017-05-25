export default class NewsParser {
  static parse ( dataToParse ) {
    return dataToParse.map(post => this.structureData(post))
  }

  static structureData ( post ) {
    return {
      data: {
        title: post.data.title,
        id: post.data.id,
        domain: post.data.domain,
        url: post.data.url,
        created: post.data.created_utc
      }
    }
  }

  //TODO: Delete Me
  parse ( dataToParse ) {
    const newsPosts = dataToParse.data.children
    return newsPosts.map(post => this.structureData(post))
  }

  //TODO: Delete Me
  structureData ( post ) {
    return {
      data: {
        title: post.data.title,
        id: post.data.id,
        domain: post.data.domain,
        url: post.data.url,
        created: post.data.created_utc
      }
    }
  }
}
