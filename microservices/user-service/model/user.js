const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  bio: String,
  email: { type: String, unique: true, required: true },
  image: String,
  coverImage: String,
  profileImage: String,
  hashedPassword: { type: String, required: true },
  hasNotification: Boolean,
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
