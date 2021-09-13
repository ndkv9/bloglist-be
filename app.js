const cors = require('cors')
const helmet = require('helmet')
const express = require('express')
require('express-async-errors')
const config = require('./utils/config.js')
const logger = require('./utils/logger.js')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs.js')
const middleware = require('./utils/middleware.js')

const url = config.MONGODB_URI

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  // eslint-disable-next-line no-unused-vars
  .then(result => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB:', error.message)
  })

const app = express()
app.use(cors())
app.use(helmet())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
