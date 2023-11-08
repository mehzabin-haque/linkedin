const router = require('express').Router();
const User = require('../model/user'); // Assuming you have a Mongoose User model

router.route('/').get(async (req, res) => {
  try {
    // Retrieve all users from MongoDB using the Mongoose User model
    const users = await User.find();

    // Remove hashed passwords from the user objects
    users.forEach(user => {
      user.hashedPassword = '';
    });

    res.json(users);
  } catch (error) {
    res.status(400).json(error);
  }
});

//retreive a user by id
router.route('/:id').get(async (req, res) => {
  try {
    console.log(req.params['id'])
    const user = await User.findById(req.params['id']);

    // Remove hashed password from the user object
    user.hashedPassword = '';

    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;