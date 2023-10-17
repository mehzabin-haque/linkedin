const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const prisma = require('../db/prisma')
require('dotenv').config()

router.route('/').post(async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      })
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword)
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid password',
      })
    }
  
    user.hashedPassword = ''

    const token = jwt.sign({ username: user.username, email: user.email }, process.env.JWT_ACCESS_SECRET)
    res.json({ userId: user.id, name: user.name, email: user.email, token })
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router