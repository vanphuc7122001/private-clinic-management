import express from 'express'
import { envConfig } from './constants/config'
import databaseService from './services/database.service'

const app = express()

const port = envConfig.port

// check connect database
databaseService.Connect()

app.listen(port, () => {
  console.log(`Serving running on ${port}`)
})
