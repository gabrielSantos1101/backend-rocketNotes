import bcryptjs from 'bcryptjs'
import { dbConnect } from '../database/sqlite/index.js'
import { AppError } from '../utils/AppError.js'

export class UserController {
  //  Creates a new user in the database
  async create (req, res) {
    const { name, email, password } = req.body
    const database = await dbConnect()
    const checkUser = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email]
    )

    // Check if user already exists
    if (checkUser) {
      throw new AppError('This email is already registered', 409)
    }

    // Hash password before storing it in the database
    const hashedPassword = await bcryptjs.hash(password, 8)

    // Add new user to database
    await database.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    )

    res.status(201).json()
  }

  async update (req, res) {
  // eslint-disable-next-line camelcase
    const { name, email, password, old_password } = req.body
    const { id } = req.params

    // Connect to the database
    const database = await dbConnect()

    // Get the user per id from the database
    const user = await database.get('SELECT * FROM users WHERE id = (?)', [id])

    // If the user doesn't exist, throw an error
    if (!user) {
      throw new AppError('User not found', 404)
    }

    const userWithUpdateEmail = await database.get('SELECT * FROM users WHERE email = (?)', [email])

    // Check if email is already registered
    if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
      throw new AppError('This email is already registered', 409)
    }

    // Update the user's name and email, if not changed, keep the previous one
    user.name = name ?? user.name
    user.email = email ?? user.email

    // eslint-disable-next-line camelcase
    if (password && old_password) {
      const checkOldPassword = await bcryptjs.compare(old_password, user.password)

      if (!checkOldPassword) {
        throw new AppError('Old password is required', 400)
      }

      // Update password if provided
      user.password = await bcryptjs.hash(password, 8)
    }

    // Update user in the database
    await database.run(
    `UPDATE users SET 
    name = (?), 
    email = (?), 
    password = (?), 
    updated_at = DATETIME('now') 
    WHERE id = (?)`, [user.name, user.email, user.password, id]
    )

    res.json()
  }
}
