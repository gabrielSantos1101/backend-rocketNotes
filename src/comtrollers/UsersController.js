import { dbConnect } from '../database/sqlite/index.js'
import { AppError } from '../utils/AppError.js'

export class UserController {
  async create (req, res) {
    const { name, email, password } = req.body
    const database = await dbConnect()
    const checkUser = await database.get('SELECT * FROM users WHERE email = (?)', [email])

    if (checkUser) {
      throw new AppError('This email is already registered', 409)
    }

    await database.run(
      'INSERT INTO users (name, email, password, id) VALUES (?, ?, ?, ?)', [name, email, password]
    )

    res.status(201).json()
  }
}