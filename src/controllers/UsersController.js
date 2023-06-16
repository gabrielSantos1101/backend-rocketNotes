import bcryptjs from 'bcryptjs'
import { dbConnect } from '../database/sqlite/index.js'
import { AppError } from '../utils/AppError.js'

export class UserController {
  async create (req, res) {
    const { name, email, password } = req.body
    const database = await dbConnect()
    const checkUser = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email]
    )

    if (checkUser) {
      throw new AppError('This email is already registered', 409)
    }

    const hashedPassword = await bcryptjs.hash(password, 8)

    await database.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    )

    res.status(201).json()
  }

  async update (req, res) {
    const { name, email, password, avatar } = req.body
    const { id } = req.params

    const database = await dbConnect()
    const user = await database.get('SELECT * FROM users WHERE id = (?)', [id])
  }
}
