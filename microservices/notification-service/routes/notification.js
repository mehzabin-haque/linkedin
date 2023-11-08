const router = require('express').Router();
const Notification = require('../model/notification'); // Replace with the correct path to your Mongoose model

router.route('/').get(async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: 'desc' });
    res.json(notifications);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.route('/create').post(async (req, res) => {
  try {
    const { userId, postId, notification } = req.body;
    const newNotification = await Notification.create({ postId, body: notification });
    res.json(notificationStatus);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
