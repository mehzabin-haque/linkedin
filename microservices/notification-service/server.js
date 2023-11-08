const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = 5003

app.use(cors())
app.use(express.json())
app.use(fileUpload())


const uri = "mongodb://notification_db:27017/notificationdb"
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
const connection = mongoose.connection
connection.once('open', () => {
  console.log('MongoDB database connection established successfully')
})

const notificationRouter = require('./routes/notification')
app.use('/notification', notificationRouter)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})