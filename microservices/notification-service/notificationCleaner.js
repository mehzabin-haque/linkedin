const mongoose = require('mongoose');
const schedule = require('node-schedule');

// Replace with your Mongoose connection string
mongoose.connect('mongodb://localhost/your_database', { useNewUrlParser: true, useUnifiedTopology: true });

const Notification = mongoose.model('Notification', new mongoose.Schema({
  isOpened: Boolean,
}));

async function cleanNotifications() {
  try {
    await Notification.deleteMany();
  } catch (error) {
    console.log(error);
  }
}

// Schedule the task to run every 12 hours
const job = schedule.scheduleJob('0 */12 * * *', function () {
  cleanNotifications();
});
