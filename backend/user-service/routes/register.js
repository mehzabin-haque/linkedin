const router = require('express').Router()
const bcrypt = require('bcrypt')
const prisma = require('../db/prisma')

router.route('/').post(async (req, res) => {
  const { name, email, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)
  console.log('yay1')
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    if(existingUser) {
      return res.status(450).json({ message: 'User already exists' })
    }

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        hashedPassword: hashedPassword,
      },
    })

    user.hashedPassword = ''
  
    try {
      const token = jwt.sign({ username: user.name, email: user.email }, process.env.JWT_ACCESS_SECRET)
      console.log('yay2')
      res.json({ userId: user.id, name: user.name, email: user.email, token })
    } catch (error) {
      console.log(error)
      res.status(400).json(error)
    }
    // res.status(200).json(user)
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router