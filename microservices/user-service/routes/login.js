const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user'); // Assuming you have a Mongoose User model
require('dotenv').config();

router.route('/').post(async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the MongoDB using Mongoose's User model
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid password',
      });
    }

    user.hashedPassword = '';

    // Create a JSON Web Token (JWT) using Mongoose user data
    const token = jwt.sign(
      { userId: user.id, name: user.name, email: user.email },
      process.env.JWT_ACCESS_SECRET
    );

    res.json({ userId: user.id, name: user.name, email: user.email, token });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
