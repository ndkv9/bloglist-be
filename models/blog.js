const mongoose = require('mongoose')
const config = require('../utils/config.js')
const logger = require('../utils/logger.js')

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

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  url: String,
  likes: Number,
})

blogSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  },
})

module.exports = mongoose.model('Blog', blogSchema)
