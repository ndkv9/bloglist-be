import cors from 'cors'
import helmet from 'helmet'
import express from 'express'
import blogsRouter from './controllers/blogs.js'
import middleware from './utils/middleware.js'
const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
