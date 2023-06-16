import { Router } from 'express'
import { UserController } from '../controllers/UsersController.js'

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
userRoutes.put('/:id', userController.update)

export { userRoutes }
