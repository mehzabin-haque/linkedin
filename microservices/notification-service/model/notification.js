const mongoose = require('mongoose');
const { Schema } = mongoose;

const notificationSchema = new Schema({
  body: String,
  postId: String,
  createdAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;