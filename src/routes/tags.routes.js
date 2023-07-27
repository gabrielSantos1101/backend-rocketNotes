import { Router } from 'express'
import { TagsController } from '../controllers/TagsController.js'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated.js'

const Controller = new TagsController()

const tagsRoutes = Router()

tagsRoutes.get('/', ensureAuthenticated, Controller.index)

export { tagsRoutes }
