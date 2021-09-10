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

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'will be deleted',
    author: 'Me',
    url: 'www.mytest.me',
  })

  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = { initialBlogs, nonExistingId, blogsInDB }
