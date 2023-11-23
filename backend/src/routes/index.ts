import { Express } from 'express'
import roleRouters from './role.routes'
import specializationRouters from './specialization.routes'
import userRouters from './user.routes'
import mediaRouters from './media.routes'
import categoryRouters from './caterogy.routes'
import newsRouters from './news.routes'

export const initRoutes = (baseUrl: string, app: Express) => {
  app.use(`${baseUrl}/roles`, roleRouters)
  app.use(`${baseUrl}/specializations`, specializationRouters)
  app.use(`${baseUrl}/users`, userRouters)
  app.use(`${baseUrl}/medias`, mediaRouters)
  app.use(`${baseUrl}/caterogies`, categoryRouters)
  app.use(`${baseUrl}/news`, newsRouters)
}

// https://private-clinnic-medical.s3.ap-southeast-1.amazonaws.com/images/hero-img1.jpg
