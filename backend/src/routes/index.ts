import { Express } from 'express'
import roleRouters from './role.routes'
import specializationRouters from './specialization.routes'
import userRouters from './user.routes'

export const initRoutes = (baseUrl: string, app: Express) => {
  app.use(`${baseUrl}/roles`, roleRouters)
  app.use(`${baseUrl}/specializations`, specializationRouters)
  app.use(`${baseUrl}/users`, userRouters)
}
