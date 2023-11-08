const cron = require('node-cron')

async function cleanNotifications() {
  try {
    await prisma.notification.deleteMany({
      where: {
        isOpened: true,
      }
    })
  }
  catch (error) {
    console.log(error)
  }
}

// “At every 720th minute.” (Every 12 hours.)
cron.schedule('*/720 * * * * *', () => {
  cleanNotifications()
})