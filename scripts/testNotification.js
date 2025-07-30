const { queueNotification } = require('../services/notificationService');

queueNotification({
  type: 'email',
  userId: 1,
  courseId: 101,
  message: 'This is a test notification!'
}).then(() => {
  console.log('Notification job added to queue.');
}).catch(console.error);