import { Router } from 'express'
import { TagsController } from '../controllers/TagsController.js'

const Controller = new TagsController()

const tagsRoutes = Router()

tagsRoutes.get('/:user_id', Controller.index)

export { tagsRoutes }
