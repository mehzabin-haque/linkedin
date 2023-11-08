const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user'); // Assuming you have a Mongoose User model
require('dotenv').config();

router.route('/').post(async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log(req.body);
  console.log('bachao amare keu');
  
  try {
    // Check if a user with the same email already exists in MongoDB
    console.log('try e dhukche')
    const existingUser = await User.findOne({ email });
    console.log("existing user nai");
    if (existingUser) {
      return res.status(450).json({ message: 'User already exists' });
    }

    // Create a new user in MongoDB using the Mongoose User model
    const user = await User.create({
      name,
      email,
      hashedPassword,
    });

    // Clear the hashed password from the user object
    user.hashedPassword = '';

    try {
      // Generate a JSON Web Token (JWT) for the user
      const token = jwt.sign(
        { userId: user._id, name: user.name, email: user.email },
        process.env.JWT_ACCESS_SECRET
      );

      res.json({ userId: user._id, name: user.name, email: user.email, token });
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
