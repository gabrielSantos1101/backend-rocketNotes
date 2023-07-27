import { Router } from 'express'
import { UserController } from '../controllers/UsersController.js'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated.js'
import { MULTER } from '../configs/upload.js'
import multer from 'multer'

const userController = new UserController()

const userRoutes = Router()
const upload = multer(MULTER)

userRoutes.post('/', userController.create)
userRoutes.put('/', ensureAuthenticated, userController.update)
userRoutes.patch('/avatar', ensureAuthenticated, upload.single('avatar'), (req, res) => {
  console.log(req.file.filename)
})

export { userRoutes }
