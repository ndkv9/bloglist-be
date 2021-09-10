const Blog = require('../models/blog.js')
const express = require('express')
const blogsRouter = express.Router()

blogsRouter.get('/', async (_req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.post('/', (req, res, next) => {
  const body = req.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })

  blog
    .save()
    .then(savedBlog => {
      res.status(201).json(savedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter
