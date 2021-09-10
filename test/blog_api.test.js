const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObj = new Blog(helper.initialBlogs[0])
  await blogObj.save()
  blogObj = new Blog(helper.initialBlogs[1])
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

    expect(response.body).toHaveLength(helper.initialBlogs.length)
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

    const blogsAtEnd = await helper.blogsInDB()
    const titles = blogsAtEnd.map(r => r.title)
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('My Testing Blog')
  })

  test('blog without title cannot be added', async () => {
    const blog = {
      author: 'Me',
      url: 'www.myblog.me',
    }

    await api.post('/api/blogs').send(blog).expect(400)
    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDB()
  const blogToView = blogsAtStart[0]

  const returnedBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
  expect(returnedBlog.body).toEqual(processedBlogToView)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDB()
  const blogToDel = blogsAtStart[0]

  await api.delete(`/api/blogs/${blogToDel.id}`).expect(204)

  const blogsAtEnd = await helper.blogsInDB()
  const titles = blogsAtEnd.map(b => b.title)

  expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
  expect(titles).not.toContain(blogToDel.title)
})

afterAll(() => {
  mongoose.connection.close()
})
