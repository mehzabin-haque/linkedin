const mongoose = require('mongoose');
const { Schema } = mongoose;

const notificationSchema = new Schema({
  body: String,
  userId: { type: Schema.Types.ObjectId }, // Assuming there is a User model
  postId: { type: Schema.Types.ObjectId }, // Assuming postId is an ObjectId
  createdAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;