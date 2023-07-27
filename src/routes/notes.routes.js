import { Router } from 'express'
import { NotesController } from '../controllers/NotesController.js'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated.js'

const Controller = new NotesController()

const notesRoutes = Router()

notesRoutes.use(ensureAuthenticated)

notesRoutes.get('/', Controller.index)
notesRoutes.post('/', Controller.create)
notesRoutes.get('/:id', Controller.show)
notesRoutes.delete('/:id', Controller.delete)

export { notesRoutes }
