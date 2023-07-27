import { Router } from 'express'
import { UserController } from '../controllers/UsersController.js'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated.js'

const userController = new UserController()

const userRoutes = Router()

userRoutes.post('/', userController.create)
userRoutes.put('/', ensureAuthenticated, userController.update)

export { userRoutes }
