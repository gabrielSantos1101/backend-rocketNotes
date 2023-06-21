import { Router } from 'express'
import { NotesController } from '../controllers/NotesController.js'

const Controller = new NotesController()

const notesRoutes = Router()

function myMiddleware (req, res, next) {
  next()
}

notesRoutes.post('/:user_id', myMiddleware, Controller.create)

export { notesRoutes }
