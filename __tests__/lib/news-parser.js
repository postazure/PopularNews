import NewsParser from '../../lib/news-parser'

const expectedData = [
  { data: { title: 'Story Title 1', id: '5ma0g8', domain: 'example.com', url: 'http://www.example.com/story1' } },
  { data: { title: 'Story Title 2', id: '12as3e', domain: 'example.com', url: 'http://www.example.com/story2' } }
]

const sampleData = [
  {
    'kind': 't3',
    'data': {
      'id': '5ma0g8',
      'domain': 'example.com',
      'url': 'http://www.example.com/story1',
      'title': 'Story Title 1'
    }
  },
  {
    'kind': 't3',
    'data': {
      'id': '12as3e',
      'domain': 'example.com',
      'url': 'http://www.example.com/story2',
      'title': 'Story Title 2'
    }
  }
]

it('transforms data from reddit into consumable data', () => {
  const actual = NewsParser.parse(sampleData)

  expect(actual).toEqual(expectedData)
})
