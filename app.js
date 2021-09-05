import cors from 'cors'
import helmet from 'helmet'
import express from 'express'
const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())

app.get('/ping', (_req, res) => {
  res.send('pong')
})

export default app
