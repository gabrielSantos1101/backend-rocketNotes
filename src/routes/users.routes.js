import { Router } from 'express'
import { UserController } from '../comtrollers/UsersController.js'

const userController = new UserController()

const userRoutes = Router()

function myMiddleware (req, res, next) {
  // if (!req.body.isAdmin) {
  //   return res.status(401).json({
  //     messege: 'You are not authorized'
  //   })
  // }

  next()
}

userRoutes.post('/', myMiddleware, userController.create)

export { userRoutes }
