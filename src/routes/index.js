import { Router } from 'express'

import { userRoutes } from './users.routes.js'
import { notesRoutes } from './notes.routes.js'
import { tagsRoutes } from './tags.routes.js'
// import { SessionRouter } from './sessions.routes.js'

const routes = Router()
routes.use('/users', userRoutes)
// routes.use('/sessions', SessionRouter)
routes.use('/notes', notesRoutes)
routes.use('/tags', tagsRoutes)

export { routes }
