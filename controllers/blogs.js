import Blog from '../models/blog.js'
import express from 'express'
const blogsRouter = express.Router()

blogsRouter.get('/', (_req, res) => {
  Blog.find({}).then(returnedNotes => {
    res.json(returnedNotes)
  })
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

export default blogsRouter
