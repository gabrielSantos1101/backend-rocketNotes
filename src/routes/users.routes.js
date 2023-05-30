import { Router } from 'express'

const userRoutes = Router()

userRoutes.post('/', (req, res) => {
  const { name, email, password, id } = req.body
  res.json({ name, email, password, id })
})

export default userRoutes
