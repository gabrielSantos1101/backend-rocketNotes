import pkg from 'jsonwebtoken';
const { verify } = pkg;
import auth from "../configs/auth.js"
import { AppError } from "../utils/AppError.js"

export function ensureAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401)
  }

  const [_, token] = authHeader.split(' ')

  try {
    const { sub: user_id} = verify(token, auth.jwt.secret)

    req.user = {
      id: Number(user_id),
    }
    return next()
  } catch {
    throw new AppError('Invalid JWT token', 401)
  }
}