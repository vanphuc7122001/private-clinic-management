import express from 'express'
import { envConfig } from './constants/config'
import databaseService from './services/database.service'
import { initRoutes } from './routes'
import helmet from 'helmet'
import cors, { CorsOptions } from 'cors'

const app = express()

const port = envConfig.port
const corsOptions: CorsOptions = {
  origin: envConfig.clientUrl
}

//middlewares
app.use(helmet())
app.use(cors(corsOptions))

//inital routes
initRoutes('/api/v1', app)

// check connect database
databaseService.Connect()

app.listen(port, () => {
  console.log(`Serving running on ${port}`)
})
