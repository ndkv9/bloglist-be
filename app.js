import cors from 'cors'
import helmet from 'helmet'
import express from 'express'
import middleware from './utils/middleware.js'
const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())

app.get('/ping', (_req, res) => {
  res.send('pong')
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
