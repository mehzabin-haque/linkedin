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

cron.schedule('*/300 * * * * *', () => {
  cleanNotifications()
})