import { Router } from 'express'
import { SessionsController } from '../controllers/sessionscontroller.js'

const Controller = new SessionsController()

const SessionsRouter = Router()
SessionsRouter.post('/', Controller.create)

export { SessionsRouter }
