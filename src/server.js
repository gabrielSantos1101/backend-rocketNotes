import {} from 'express-async-errors'
import express from 'express'
import { dbConnect } from './database/sqlite/index.js'

import { routes } from './routes/index.js'
import { AppError } from './utils/AppError.js'

const app = express()
app.use(express.json())

app.use(routes)

dbConnect()

app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }

  console.log(err)

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

const PORT = 3333
app.listen(PORT, () => console.log(`server is running on localhost:${PORT}`))
