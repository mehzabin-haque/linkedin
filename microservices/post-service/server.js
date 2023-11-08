const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = 5002

app.use(cors())
app.use(express.json())

const uri = "mongodb://post_db:27017/postdb"
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
const connection = mongoose.connection
connection.once('open', () => {
  console.log('MongoDB database connection established successfully')
})

const postRouter = require('./routes/posts.js')

app.use('/posts', postRouter)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})