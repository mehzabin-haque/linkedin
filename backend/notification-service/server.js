const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const prisma = require('./db/prisma')
const createError = require('http-errors')

require('dotenv').config()

const app = express()
const port = 5003

app.use(cors())
app.use(express.json())

const notificationRouter = require('./routes/notification')

app.use('/nofication', notificationRouter)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})