const router = require('express').Router();
const Notification = require('../model/notification'); // Replace with the correct path to your Mongoose model

router.route('/').get(async (req, res) => {
  try {
    console.log('finding all notifications...');
    const notifications = await Notification.find().sort({ createdAt: 'desc' });
    console.log('all notifications found');
    console.log(notifications);
    res.json(notifications);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.route('/').post(async (req, res) => {
  try {
    console.log('creating new notification...');
    const { userId, postId, notification } = req.body;
    console.log(notification);
    const newNotification = await Notification.create({ postId: postId, body: notification });
    res.json(notificationStatus);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
