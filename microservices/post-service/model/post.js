const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // Using MongoDB's default ObjectId as the primary key
  body: String,
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Assuming a User model exists
  likedIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Assuming a User model exists
  image: String,
  isOpened: Boolean,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;