import { Express } from 'express'
import roleRouters from './role.routes'

export const initRoutes = (baseUrl: string, app: Express) => {
  app.use(`${baseUrl}/roles`, roleRouters)
}
