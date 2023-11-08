const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  body: String,
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId }, // Assuming a User model exists
  image: String,
  isOpened: Boolean,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;