const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const prisma = require('./db/prisma')
const createError = require('http-errors')

require('dotenv').config()

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())
app.use(fileUpload())

const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')
const userRouter = require('./routes/users')
const postRouter = require('./routes/posts')
// const notificationRouter = require('./routes/notification')

app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/users', userRouter)
app.use('/posts', postRouter)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})