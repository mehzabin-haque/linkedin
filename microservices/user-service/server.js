const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = 5001

app.use(cors())
app.use(express.json())

const uri = "mongodb://user_db:27017/userdb"
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
const connection = mongoose.connection
connection.once('open', () => {
  console.log('MongoDB database connection established successfully')
})

const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')
const userRouter = require('./routes/users')

app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/users', userRouter)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})