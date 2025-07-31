const { queueNotification } = require('../services/notificationService');


queueNotification({
  type: 'email',
  userId: '49cbbc1c-9b7a-424a-a52b-01c535465d14', 
  courseId: 101,
  message: 'This is a test notification!'
}).then(() => {
  console.log('Notification job added to queue.');
}).catch(console.error);