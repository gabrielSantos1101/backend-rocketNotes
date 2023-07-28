import {} from 'express-async-errors'
import express from 'express'

import { routes } from './routes/index.js'
import { AppError } from './utils/AppError.js'
import { migrationsRun } from './database/sqlite/migrations/index.js'
import { UPLOADS_FOLDER } from './configs/upload.js'

const app = express()
migrationsRun()

app.use(express.json())
app.use(routes)
app.use("/files", express.static(UPLOADS_FOLDER))

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
app.listen(PORT, () => console.log(`server is running on https://localhost:${PORT}`))
