import { envConfig } from './constants/config'
import { initRoutes } from './routes'
import { defaultErrorHandler } from './middlewares/error.middlewares'

import cors, { CorsOptions } from 'cors'
import databaseService from './services/database.service'
import express from 'express'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import { initFolder } from './utils/file'

const app = express()

const port = envConfig.port
const corsOptions: CorsOptions = {
  origin: envConfig.clientUrl
}
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false // Disable the `X-RateLimit-*` headers
  // store: ... , // Use an external store for more precise rate limiting
})

//middlewares
app.use(helmet())
app.use(cors(corsOptions))
app.use(limiter)
app.use(express.json())
app.use(morgan('dev'))

//inital routes
initRoutes('/api/v1', app)
// inital folders
initFolder()

// check connect database
databaseService.Connect()

// error handler
app.use(defaultErrorHandler)

// Running server
app.listen(port, () => {
  console.log(`Serving running on ${port}`)
})
