const cron = require('node-cron');
const { queueNotification } = require('../services/notificationService');
const { getPendingLogs } = require('../services/'); // your logic

cron.schedule('0 18 * * 5', async () => {
  // Every Friday at 6 PM
  const pending = await getPendingLogs();

  for (const log of pending) {
    await queueNotification({
      type: 'reminder',
      userId: log.facilitatorId,
      courseId: log.courseId,
      message: `Reminder: You haven't submitted your activity log for Week ${log.weekNumber}.`,
    });
  }
});
