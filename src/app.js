import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import { schedule } from 'node-cron'
import axios from 'axios'
import fs from 'fs'
require('dotenv').config()

const app = express()

// Express application configuration
app.use(bodyParser.json({limit: '5mb'}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())

if (process.env.ENABLE_CRON_JOBS !== 'true') {
  console.log('Cron jobs currently disabled')
}else {
  schedule(process.env.TIME_INTERVAL || "*/5 * * * *", () => {
    //log("logs every 5minutes")
    return axios
    .get('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => {
      //return response.data;
      console.log(response.data)
    })
    .catch(error => {
      console.log(error.message)
    })
  })
}

// auto load routes here
fs.readdirSync(`${__dirname}/routes/`)
  .filter(file => file.slice(-3) === '.js')
  .forEach(file => {
    const namespace = file.split('.')[0]
    const routes = require(`./routes/${file}`).default
    app.use(`/${namespace}`, routes)
  })

// Setup catch-all API catch-all route
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to ES6 Sequelize Deploy App'
}))

export default app

