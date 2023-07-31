const express = require('express')
const cors = require('cors')
const prisma = require('./db/prisma')
const createError = require('http-errors')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')
// const postRouter = require('./routes/post')
// const notificationRouter = require('./routes/notification')

app.use('/register', registerRouter)
app.use('/login', loginRouter)
// app.use('/post', postRouter)
// app.use('/notification', notificationRouter)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})