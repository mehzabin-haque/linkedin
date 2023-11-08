const router = require('express').Router()
const prisma = require('../db/prisma')
require('dotenv').config()

router.route('/:userId').get(async (req, res) => {
  try {
    const { userId } = req.params
    const notifications = await prisma.notification.findMany({
      where: {
        userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    res.json(notifications)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.route('/').post(async (req, res) => {
  try {
    const { userId, postId, notification } = req.body
    const notificationStatus = await prisma.notification.create({
      data: {
        userId,
        postId,
        post: notification,
      }
    })
    res.json(notificationStatus)
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router