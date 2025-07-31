const notificationQueue = require('../queues/notificationQueue');

const queueNotification = async ({ type, userId, courseId, message }) => {
  return await notificationQueue.add({ type, userId, courseId, message }, { attempts: 3 });
};

module.exports = { queueNotification };