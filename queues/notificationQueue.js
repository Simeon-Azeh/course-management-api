const Queue = require('bull');
const redis = require('../redisClient');

const notificationQueue = new Queue('notifications', {
  redis: { host: '127.0.0.1', port: 6379 },
});

module.exports = notificationQueue;
