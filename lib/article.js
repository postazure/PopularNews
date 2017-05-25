export default class Article {
  constructor ( post ) {
    let data = post.data
    this.title = data.title
    this.id = data.id
    this.domain = data.domain
    this.url = data.url
    this.doneAt = post.doneAt
  }

  equals ( other ) {
    return (
      other instanceof Article &&
      (this.url === other.url || this.id === other.id)
    )
  }
}

