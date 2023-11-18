import { envConfig } from './constants/config'
import { initRoutes } from './routes'
import cors, { CorsOptions } from 'cors'
import databaseService from './services/database.service'
import express from 'express'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

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

//inital routes
initRoutes('/api/v1', app)

// check connect database
databaseService.Connect()

app.listen(port, () => {
  console.log(`Serving running on ${port}`)
})
