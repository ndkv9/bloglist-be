const Blog = require('../models/blog.js')
const express = require('express')
const blogsRouter = express.Router()

blogsRouter.get('/', async (_req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)
    res.json(blog)
  } catch (exeption) {
    next(exeption)
  }
})

blogsRouter.post('/', async (req, res, next) => {
  const body = req.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })

  try {
    const savedBlog = await blog.save()
    res.status(201).json(savedBlog)
  } catch (exeption) {
    next(exeption)
  }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch (exeption) {
    next(exeption)
  }
})

module.exports = blogsRouter
