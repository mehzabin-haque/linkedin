const router = require('express').Router()
const prisma = require('../db/prisma')

router.route('/').get(async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.json(users)
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router