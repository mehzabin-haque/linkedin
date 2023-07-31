const router = require('express').Router()
const bcrypt = require('bcrypt')

const prisma = require('../db/prisma')

router.route('/').post(async (req, res) => {
  const { username, email, password } = req.body

  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: await bcrypt.hash(password, 10),
      },
    })
    
    user.hashedPassword = ''
  
    const token = jwt.sign({ username: user.username, email: user.email }, process.env.JWT_SECRET)
    res.json({ userId: user.id, token })

  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router