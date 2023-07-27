import bcryptjs from 'bcryptjs'
import knex from "../database/knex/index.js"
import auth from "../configs/auth.js"
import {AppError} from "../utils/AppError.js"
import pkg from 'jsonwebtoken';
const {sign} = pkg

export class SessionsController {
  async create(req, res) {
    const { email, password } = req.body
    const user = await knex("users").where({ email }).first()

    if (!user) {
      throw new AppError("User not found", 401)
    }

    const passwordMatch = await bcryptjs.compare(password, user.password)
    if (!passwordMatch) {
      throw new AppError("User not found", 401)
    }

    const {secret, expiresIn} = auth.jwt
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    return res.json({user, token})
  }
}
