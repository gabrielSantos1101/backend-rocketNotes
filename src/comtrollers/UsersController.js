import { AppError } from '../utils/AppError.js'

export class UserController {
  Create (req, res) {
    const { name, email, password, id } = req.body

    if (!name || !email || !password) {
      throw new AppError('All fields are required')
    }

    res.status(201).json({ name, email, password, id })
  }
}
