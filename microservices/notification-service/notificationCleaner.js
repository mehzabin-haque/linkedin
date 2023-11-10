const cron = require('node-cron');
const Notification = require('./model/notification');

async function cleanNotifications() {
  try {
    console.log('Cleaning notifications...');
    await Notification.deleteMany();
    console.log('Notifications cleaned');
  } catch (error) {
    console.log(error);
  }
}

// Schedule the task to run every 10 minutes
cron.schedule('*/15 * * * *', cleanNotifications);
