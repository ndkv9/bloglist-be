const cors = require('cors')
const helmet = require('helmet')
const express = require('express')
require('express-async-errors')
const blogsRouter = require('./controllers/blogs.js')
const middleware = require('./utils/middleware.js')
const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
