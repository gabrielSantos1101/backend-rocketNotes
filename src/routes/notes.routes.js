import { Router } from 'express'
import { NotesController } from '../controllers/NotesController.js'

const Controller = new NotesController()

const notesRoutes = Router()

function myMiddleware (req, res, next) {
  next()
}

notesRoutes.get('/', myMiddleware, Controller.index)
notesRoutes.post('/:user_id', myMiddleware, Controller.create)
notesRoutes.get('/:id', myMiddleware, Controller.show)
notesRoutes.delete('/:id', myMiddleware, Controller.delete)

export { notesRoutes }
