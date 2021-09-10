const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Clean Code',
    author: 'Uncle Bob',
    url: 'www.unclebob.dev',
  },

  {
    title: 'Pragmatic Programmer',
    author: 'Uncle Stan',
    url: 'www.unclestan.dev',
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObj = new Blog(initialBlogs[0])
  await blogObj.save()
  blogObj = new Blog(initialBlogs[1])
  await blogObj.save()
})

describe('when return blogs from server', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two blogs at the beginning', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
    expect(titles).toContain('Pragmatic Programmer')
  })
})

describe('adds a new blog', () => {
  test('a valid blog can be added', async () => {
    const blog = {
      title: 'My Testing Blog',
      author: 'Me',
      url: 'www.myblog.me',
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain('My Testing Blog')
  })

  test('blog without title cannot be added', async () => {
    const blog = {
      author: 'Me',
      url: 'www.myblog.me',
    }

    await api.post('/api/blogs').send(blog).expect(400)
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
