const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')

require('dotenv').config()

const app = express()
const port = 5002

app.use(cors())
app.use(express.json())
app.use(fileUpload())

const postRouter = require('./routes/posts')

app.use('/posts', postRouter)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})